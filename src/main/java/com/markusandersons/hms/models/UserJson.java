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

package com.markusandersons.hms.models;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import org.immutables.value.Value;

import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Value.Immutable
@JsonSerialize(as = com.markusandersons.hms.models.ImmutableUserJson.class)
@JsonDeserialize(as = com.markusandersons.hms.models.ImmutableUserJson.class)
@Value.Style(jdkOnly = true)
public interface UserJson {
    Optional<UUID> getId();

    String getFirstName();

    String getSurname();

    Optional<String> getName();

    String getPhone();

    String getEmail();

    Map<UUID, Double> getItems();

    Map<UUID, Double> getRecurringPayments();

    Optional<String> getUsername();

    Optional<String> getPassword();

    // User permissions
    boolean isServerAdmin();

    boolean canModifyUsers();

    boolean canDeleteData();
}
