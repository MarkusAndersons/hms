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

import com.markusandersons.hms.models.Ownership;
import com.markusandersons.hms.models.SharedItem;
import com.markusandersons.hms.models.SharedItemJson;
import com.markusandersons.hms.models.User;
import com.markusandersons.hms.repositories.OwnershipRepository;
import com.markusandersons.hms.repositories.SharedItemRepository;
import com.markusandersons.hms.repositories.UserRepository;
import com.markusandersons.hms.util.JsonUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.ws.WebServiceException;
import java.util.*;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class SharedItemService {

    private final SharedItemRepository sharedItemRepository;
    private final UserRepository userRepository;
    private final OwnershipRepository ownershipRepository;

    @Autowired
    public SharedItemService(
            SharedItemRepository sharedItemRepository,
            UserRepository userRepository,
            OwnershipRepository ownershipRepository
    ) {
        this.sharedItemRepository = sharedItemRepository;
        this.userRepository = userRepository;
        this.ownershipRepository = ownershipRepository;
    }

    public Iterable<SharedItemJson> listSharedItems() {
        return StreamSupport.stream(sharedItemRepository.findAll().spliterator(), false)
                .map(JsonUtils::getJson).collect(Collectors.toList());
    }

    public SharedItemJson createSharedItem(SharedItemJson sharedItemJson) {
        double totalPercentage = 0;
        List<Ownership> ownerships = new ArrayList<>();
        for (Map.Entry<UUID, Double> entry : sharedItemJson.getOwners().entrySet()) {
            final Optional<User> user = userRepository.findById(entry.getKey());
            if (!user.isPresent()) {
                throw new WebServiceException("Invalid User ID");
            }
            ownerships.add(new Ownership(null, user.get(), entry.getValue()));
            totalPercentage += entry.getValue();
        }
        if (totalPercentage < 99) { // TODO Update this check
            throw new WebServiceException("Ownership is not 100%");
        }

        final SharedItem newItem = new SharedItem(
                sharedItemJson.getName(),
                sharedItemJson.getNotes(),
                sharedItemJson.getPrice(),
                ownerships
        );
        sharedItemRepository.save(newItem);
        for (Ownership o : ownerships) {
            o.setSharedItem(newItem);
            ownershipRepository.save(o);
        }
        return JsonUtils.getJson(newItem);
    }

    public Optional<SharedItemJson> getSharedItem(UUID id) {
        final Optional<SharedItem> itemOptional = sharedItemRepository.findById(id);
        return itemOptional.map(JsonUtils::getJson);
    }
}
