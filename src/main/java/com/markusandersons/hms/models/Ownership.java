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

import javax.persistence.*;
import java.util.UUID;

@Entity
public class Ownership {
    @Id
    @GeneratedValue
    private UUID id;
    @ManyToOne
    private SharedItem sharedItem;
    @ManyToOne
    private User user;
    private double percentage;

    public Ownership() {}

    public Ownership(SharedItem sharedItem, User user, double percentage) {
        this.sharedItem = sharedItem;
        this.user = user;
        this.percentage = percentage;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public SharedItem getSharedItem() {
        return sharedItem;
    }

    public void setSharedItem(SharedItem sharedItem) {
        this.sharedItem = sharedItem;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public double getPercentage() {
        return percentage;
    }

    public void setPercentage(float percentage) {
        this.percentage = percentage;
    }
}
