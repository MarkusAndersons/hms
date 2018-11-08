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

package com.markusandersons.hms.controllers;

import com.markusandersons.hms.models.RecurringPaymentJson;
import com.markusandersons.hms.services.RecurringPaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/recurring_payments")
public class RecurringPaymentController {

    private final RecurringPaymentsService recurringPaymentsService;

    @Autowired
    public RecurringPaymentController(RecurringPaymentsService recurringPaymentsService) {
        this.recurringPaymentsService = recurringPaymentsService;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/list")
    public Iterable<RecurringPaymentJson> items() {
        return recurringPaymentsService.listSharedItems();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/create")
    public RecurringPaymentJson create(@RequestBody RecurringPaymentJson recurringPayment) {
        return recurringPaymentsService.createRecurringPayment(recurringPayment);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/payment/{id}")
    public Optional<RecurringPaymentJson> show(@PathVariable UUID id) {
        return recurringPaymentsService.getRecurringPayment(id);
    }
}
