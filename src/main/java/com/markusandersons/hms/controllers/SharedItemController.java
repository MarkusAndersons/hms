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
import com.markusandersons.hms.models.SharedItemJson;
import com.markusandersons.hms.services.ArchivingService;
import com.markusandersons.hms.services.SharedItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/items")
public class SharedItemController {

    private final SharedItemService sharedItemService;
    private final ArchivingService archivingService;
    private final AuthTools authTools;

    @Autowired
    public SharedItemController(SharedItemService sharedItemService, ArchivingService archivingService, AuthTools authTools) {
        this.sharedItemService = sharedItemService;
        this.archivingService = archivingService;
        this.authTools = authTools;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/list")
    public Iterable<SharedItemJson> items() {
        return sharedItemService.listSharedItems();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/create")
    public SharedItemJson create(Principal principal, @RequestBody SharedItemJson item) {
        archivingService.archiveEvent(SharedItemController.class.getName() + "/create", RequestMethod.POST.name(), item.toString(), principal);
        return sharedItemService.createSharedItem(item);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/item/{id}")
    public Optional<SharedItemJson> show(@PathVariable UUID id) {
        return sharedItemService.getSharedItem(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/item/{id}")
    public Optional<SharedItemJson> update(Principal principal, @PathVariable UUID id, @RequestBody SharedItemJson item) {
        archivingService.archiveEvent(SharedItemController.class.getName() + "/item/" + id.toString(), RequestMethod.PUT.name(), item.toString(), principal);
        return sharedItemService.updateItem(id, item);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/item/{id}")
    public String delete(Principal principal, @PathVariable UUID id) {
        if ((authTools.getAuthorizations(principal) & AuthConstants.DELETE_DATA) != 0) {
            archivingService.archiveEvent(SharedItemController.class.getName() + "/item/" + id.toString(), RequestMethod.DELETE.name(), null, principal);
            return sharedItemService.deleteItem(id);
        }
        throw new AuthorizationException("Cannot delete item!");
    }
}
