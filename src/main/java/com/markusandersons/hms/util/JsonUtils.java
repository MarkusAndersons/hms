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

package com.markusandersons.hms.util;

import com.markusandersons.hms.models.*;

import java.util.Collections;
import java.util.UUID;
import java.util.stream.Collectors;

public class JsonUtils {
    private JsonUtils() {
    }

    public static UserJson getJson(User user) {
        return ImmutableUserJson.builder()
            .id(user.getId() != null ? user.getId() : UUID.randomUUID())
            .firstName(user.getFirstName())
            .surname(user.getSurname())
            .name(user.getName())
            .email(user.getEmail())
            .phone(user.getPhone())
            .putAllItems(user.getOwnership().stream().collect(
                Collectors.toMap(i -> i.getSharedItem().getId(), Ownership::getPercentage)))
            .putAllRecurringPayments(user.getPaymentArrangements().stream().collect(
                Collectors.toMap(p -> p.getRecurringPayment().getId(), PaymentArrangement::getPercentage)))
            .build();
    }

    public static SharedItemJson getJson(SharedItem item) {
        return ImmutableSharedItemJson.builder()
            .id(item.getId() != null ? item.getId() : UUID.randomUUID())
            .name(item.getName())
            .notes(item.getNotes())
            .price(item.getPrice())
            .putAllOwners(item.getOwnership().stream().collect(
                Collectors.toMap(i -> i.getUser().getId(), Ownership::getPercentage)))
            .putAllOwnership(item.getOwnership().stream().collect(
                Collectors.toMap(i -> i.getUser().getId(), i -> new OwnershipStringDoubleTuple(i.getUser().getName(), i.getPercentage()))))
            .build();

    }

    public static RecurringPaymentJson getJson(RecurringPayment recurringPayment) {
        return ImmutableRecurringPaymentJson.builder()
            .id(recurringPayment.getId() != null ? recurringPayment.getId() : UUID.randomUUID())
            .name(recurringPayment.getName())
            .notes(recurringPayment.getNotes())
            .nextPaymentDate(recurringPayment.getNextPaymentDate())
            .paymentCycle(recurringPayment.getPaymentCycle())
            .putAllUsers(recurringPayment.getPaymentArrangements().stream().collect(
                Collectors.toMap(p -> p.getRecurringPayment().getId(), PaymentArrangement::getPercentage)))
            .putAllOwnership(recurringPayment.getPaymentArrangements().stream().collect(
                Collectors.toMap(
                    p -> p.getRecurringPayment().getId(),
                    p -> new OwnershipStringDoubleTuple(p.getRecurringPayment().getName(), p.getPercentage())))
            )
            .build();
    }

    public static User getUser(UserJson userJson) {
        return new User(
            null,
            null,
            userJson.getFirstName(),
            userJson.getSurname(),
            userJson.getPhone(),
            userJson.getEmail(),
            Collections.emptyList(),
            Collections.emptyList()
        );
    }

    public static SharedItem getSharedItem() {
        return null;
        // TODO
    }
}
