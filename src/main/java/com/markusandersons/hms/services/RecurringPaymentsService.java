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

import com.markusandersons.hms.models.PaymentArrangement;
import com.markusandersons.hms.models.RecurringPayment;
import com.markusandersons.hms.models.RecurringPaymentJson;
import com.markusandersons.hms.models.User;
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
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class RecurringPaymentsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(RecurringPaymentsService.class);

    private final RecurringPaymentRepository recurringPaymentRepository;
    private final UserRepository userRepository;
    private final PaymentArrangementRepository paymentArrangementRepository;

    @Autowired
    public RecurringPaymentsService(
        RecurringPaymentRepository recurringPaymentRepository,
        UserRepository userRepository,
        PaymentArrangementRepository paymentArrangementRepository
    ) {
        this.recurringPaymentRepository = recurringPaymentRepository;
        this.userRepository = userRepository;
        this.paymentArrangementRepository = paymentArrangementRepository;
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
            paymentArrangements.add(new PaymentArrangement(null, user.get(), entry.getValue()));
            totalPercentage += entry.getValue();
        }
        if (Math.abs(totalPercentage - 100) > ApplicationConstants.EPSILON) {
            throw new WebServiceException("Ownership is not 100%");
        }

        final RecurringPayment newItem = new RecurringPayment(
            recurringPaymentJson.getName(),
            recurringPaymentJson.getNotes(),
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
}
