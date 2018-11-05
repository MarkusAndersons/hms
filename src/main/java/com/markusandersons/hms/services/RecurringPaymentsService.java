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

import com.markusandersons.hms.models.RecurringPayment;
import com.markusandersons.hms.models.RecurringPaymentJson;
import com.markusandersons.hms.models.SharedItem;
import com.markusandersons.hms.models.SharedItemJson;
import com.markusandersons.hms.repositories.RecurringPaymentRepository;
import com.markusandersons.hms.util.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class RecurringPaymentsService {

    private static final Logger LOGGER = LoggerFactory.getLogger(RecurringPaymentsService.class);

    private final RecurringPaymentRepository recurringPaymentRepository;

    @Autowired
    public RecurringPaymentsService(RecurringPaymentRepository recurringPaymentRepository) {
        this.recurringPaymentRepository = recurringPaymentRepository;
    }

    public Iterable<RecurringPaymentJson> listSharedItems() {
        return StreamSupport.stream(recurringPaymentRepository.findAll().spliterator(), false)
            .map(JsonUtils::getJson).collect(Collectors.toList());
    }

    public Optional<RecurringPaymentJson> getRecurringPayment(UUID id) {
        final Optional<RecurringPayment> itemOptional = recurringPaymentRepository.findById(id);
        return itemOptional.map(JsonUtils::getJson);
    }
}