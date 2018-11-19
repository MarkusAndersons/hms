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

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class PaymentDateUpdateTask {

    private static final Logger LOGGER = LoggerFactory.getLogger(PaymentDateUpdateTask.class);

    private final RecurringPaymentsService recurringPaymentsService;

    @Autowired
    public PaymentDateUpdateTask(RecurringPaymentsService recurringPaymentsService) {
        this.recurringPaymentsService = recurringPaymentsService;
    }

    @Scheduled(fixedRate = 3_600_000)
    public void updateNextPaymentDate() {
        LOGGER.info("Updating stored payment dates");
        this.recurringPaymentsService.updateAllPaymentDates();
    }
}
