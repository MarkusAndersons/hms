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

import com.markusandersons.hms.auth.AuthConstants;
import com.markusandersons.hms.auth.AuthTools;
import com.markusandersons.hms.auth.AuthorizationException;
import com.markusandersons.hms.models.RecurringPaymentJson;
import com.markusandersons.hms.services.ArchivingService;
import com.markusandersons.hms.services.RecurringPaymentsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/recurring_payments")
public class RecurringPaymentController {

    private final RecurringPaymentsService recurringPaymentsService;
    private final ArchivingService archivingService;
    private final AuthTools authTools;

    @Autowired
    public RecurringPaymentController(RecurringPaymentsService recurringPaymentsService, ArchivingService archivingService, AuthTools authTools) {
        this.recurringPaymentsService = recurringPaymentsService;
        this.archivingService = archivingService;
        this.authTools = authTools;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/list")
    public Iterable<RecurringPaymentJson> items() {
        return recurringPaymentsService.listSharedItems();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/create")
    public RecurringPaymentJson create(Principal principal, @RequestBody RecurringPaymentJson recurringPayment) {
        archivingService.archiveEvent(RecurringPaymentController.class.getName() + "/create", RequestMethod.POST.name(), recurringPayment.toString(), principal);
        return recurringPaymentsService.createRecurringPayment(recurringPayment);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/payment/{id}")
    public Optional<RecurringPaymentJson> show(@PathVariable UUID id) {
        return recurringPaymentsService.getRecurringPayment(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/payment/{id}")
    public Optional<RecurringPaymentJson> update(Principal principal, @PathVariable UUID id, @RequestBody RecurringPaymentJson payment) {
        archivingService.archiveEvent(SharedItemController.class.getName() + "/payment/" + id.toString(), RequestMethod.PUT.name(), payment.toString(), principal);
        return recurringPaymentsService.updatePayment(id, payment);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/payment/{id}")
    public String delete(Principal principal, @PathVariable UUID id) {
        if ((authTools.getAuthorizations(principal) & AuthConstants.DELETE_DATA) != 0) {
            archivingService.archiveEvent(RecurringPaymentController.class.getName() + "/payment/" + id.toString(), RequestMethod.DELETE.name(), null, principal);
            return recurringPaymentsService.deletePayment(id);
        }
        throw new AuthorizationException("Cannot delete payment!");
    }
}
