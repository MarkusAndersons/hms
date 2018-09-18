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

import com.markusandersons.hms.models.SharedItemJson;
import com.markusandersons.hms.services.SharedItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/items")
public class SharedItemController {

    private final SharedItemService sharedItemService;

    @Autowired
    public SharedItemController(SharedItemService sharedItemService) {
        this.sharedItemService = sharedItemService;
    }

    @RequestMapping(method = RequestMethod.GET, path = "/list")
    public Iterable<SharedItemJson> items() {
        return sharedItemService.listSharedItems();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/create")
    public SharedItemJson create(@RequestBody SharedItemJson item) {
        return sharedItemService.createSharedItem(item);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/item/{id}")
    public Optional<SharedItemJson> show(@PathVariable UUID id) {
        return sharedItemService.getSharedItem(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/item/{id}")
    public Optional<SharedItemJson> update(@PathVariable UUID id, @RequestBody SharedItemJson item) {
        return sharedItemService.updateItem(id, item);
    }
}
