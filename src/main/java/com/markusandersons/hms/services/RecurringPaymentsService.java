/*
 * Copyright 2018 Markus Andersons
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.markusandersons.hms.services;

import com.markusandersons.hms.models.*;
import com.markusandersons.hms.repositories.PaymentArrangementRepository;
import com.markusandersons.hms.repositories.RecurringPaymentRepository;
import com.markusandersons.hms.repositories.UserRepository;
import com.markusandersons.hms.util.ApplicationConstants;
import com.markusandersons.hms.util.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.ws.WebServiceException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class RecurringPaymentsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(RecurringPaymentsService.class);

    private final RecurringPaymentRepository recurringPaymentRepository;
    private final UserRepository userRepository;
    private final PaymentArrangementRepository paymentArrangementRepository;
    private final ReminderEmailService reminderEmailService;
    private final SettingsService settingsService;

    @Autowired
    public RecurringPaymentsService(
        RecurringPaymentRepository recurringPaymentRepository,
        UserRepository userRepository,
        PaymentArrangementRepository paymentArrangementRepository,
        ReminderEmailService reminderEmailService,
        SettingsService settingsService
    ) {
        this.recurringPaymentRepository = recurringPaymentRepository;
        this.userRepository = userRepository;
        this.paymentArrangementRepository = paymentArrangementRepository;
        this.reminderEmailService = reminderEmailService;
        this.settingsService = settingsService;
    }

    public Iterable<RecurringPaymentJson> listSharedItems() {
        return StreamSupport.stream(recurringPaymentRepository.findAll().spliterator(), false)
            .map(JsonUtils::getJson).collect(Collectors.toList());
    }

    public Optional<RecurringPaymentJson> getRecurringPayment(UUID id) {
        final Optional<RecurringPayment> itemOptional = recurringPaymentRepository.findById(id);
        return itemOptional.map(JsonUtils::getJson);
    }

    public RecurringPaymentJson createRecurringPayment(RecurringPaymentJson recurringPaymentJson) {
        double totalPercentage = 0;
        List<PaymentArrangement> paymentArrangements = new ArrayList<>();
        for (Map.Entry<UUID, Double> entry : recurringPaymentJson.getUsers().entrySet()) {
            final Optional<User> user = userRepository.findById(entry.getKey());
            if (!user.isPresent()) {
                throw new WebServiceException("Invalid User ID");
            }
            paymentArrangements.add(new PaymentArrangement(null, user.get(), entry.getValue(), false));
            totalPercentage += entry.getValue();
        }
        if (Math.abs(totalPercentage - 100) > ApplicationConstants.EPSILON) {
            throw new WebServiceException("Ownership is not 100%");
        }

        final RecurringPayment newItem = new RecurringPayment(
            recurringPaymentJson.getName(),
            recurringPaymentJson.getNotes(),
            recurringPaymentJson.getPaymentAmount(),
            recurringPaymentJson.getNextPaymentDate(),
            recurringPaymentJson.getPaymentCycle(),
            paymentArrangements,
            recurringPaymentJson.getPaymentDays().orElse(null)
        );
        recurringPaymentRepository.save(newItem);
        for (PaymentArrangement p : paymentArrangements) {
            p.setRecurringPayment(newItem);
            paymentArrangementRepository.save(p);
        }
        return JsonUtils.getJson(newItem);
    }

    public Optional<RecurringPaymentJson> updatePayment(UUID id, RecurringPaymentJson payment) {
        final Optional<RecurringPayment> optionalRecurringPayment = recurringPaymentRepository.findById(id);
        if (!optionalRecurringPayment.isPresent()) {
            return Optional.empty();
        }
        final RecurringPayment p = optionalRecurringPayment.get();
        if (payment.getName() != null)
            p.setName(payment.getName());
        if (payment.getNotes() != null)
            p.setNotes(payment.getNotes());
        if (payment.getNextPaymentDate() != null)
            p.setNextPaymentDate(payment.getNextPaymentDate());
        if (payment.getPaymentCycle() != null)
            p.setPaymentCycle(payment.getPaymentCycle());
        if (payment.getPaymentDays().isPresent())
            p.setPaymentDays(payment.getPaymentDays().get());
        p.setPaymentAmount(payment.getPaymentAmount());

        if (p.getNextPaymentDate().isBefore(LocalDate.now(ZoneId.of(settingsService.getServerTimezone())))) {
            p.calculateNextPaymentDate(LocalDate.now(ZoneId.of(settingsService.getServerTimezone())));
        }

        // update payment arrangement
        final Collection<PaymentArrangement> oldOwnership = p.getPaymentArrangements();
        final Collection<PaymentArrangement> newOwnership = payment.getUsers().entrySet().stream()
            .map(entry -> new PaymentArrangement(p, userRepository.findById(entry.getKey()).get(), entry.getValue(), false))
            .collect(Collectors.toList());
        p.setPaymentArrangements(newOwnership);
        for (PaymentArrangement paymentArrangement : oldOwnership) {
            paymentArrangementRepository.delete(paymentArrangement);
        }
        recurringPaymentRepository.save(p);
        return Optional.of(JsonUtils.getJson(p));
    }

    // Method to be called by worker to update next payment dates
    public void updateAllPaymentDates() {
        final Iterable<RecurringPayment> payments = recurringPaymentRepository.findAll();
        for (RecurringPayment payment : payments) {
            if (payment.getNextPaymentDate().isBefore(LocalDate.now(ZoneId.of(settingsService.getServerTimezone())))) {
                payment.calculateNextPaymentDate(LocalDate.now(ZoneId.of(settingsService.getServerTimezone())));
                for (PaymentArrangement paymentArrangement : payment.getPaymentArrangements()) {
                    paymentArrangement.setReminderSent(false);
                }
                recurringPaymentRepository.save(payment);
            } else if (payment.getNextPaymentDate().isAfter(LocalDate.now(ZoneId.of(settingsService.getServerTimezone())).minusDays(ApplicationConstants.PAYMENT_REMINDER_DAYS))) {
                try {
                    reminderEmailService.sendReminderEmail(payment);
                } catch (EmailSendException e) {
                    LOGGER.warn("Failed to send reminder email", e);
                }
            }
        }
    }

    public String deletePayment(UUID id) {
        LOGGER.info("Deleting payment with id: " + id.toString());
        final Optional<RecurringPayment> optionalRecurringPayment = recurringPaymentRepository.findById(id);
        if (optionalRecurringPayment.isPresent()) {
            final RecurringPayment recurringPayment = optionalRecurringPayment.get();
            for (PaymentArrangement arrangement: recurringPayment.getPaymentArrangements()) {
                paymentArrangementRepository.delete(arrangement);
            }
            recurringPaymentRepository.delete(recurringPayment);
        }
        return "Payment:" + id.toString() + " deleted";
    }
}
