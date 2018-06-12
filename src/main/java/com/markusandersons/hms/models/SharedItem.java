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
import java.util.Collection;
import java.util.UUID;

@Entity
public class SharedItem {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String notes;
    private double price;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "sharedItem")
    private Collection<Ownership> ownership;

    public SharedItem() {}

    public SharedItem(String name, String notes, double price, Collection<Ownership> ownership) {
        this.name = name;
        this.notes = notes;
        this.price = price;
        this.ownership = ownership;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public Collection<Ownership> getOwnership() {
        return ownership;
    }

    public void setOwnership(Collection<Ownership> ownership) {
        this.ownership = ownership;
    }
}
