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

import lombok.Data;

import javax.persistence.*;
import java.util.Collection;
import java.util.UUID;

@Entity
@Table(name = "users")
@Data
public class User {
    @Id
    @GeneratedValue
    private UUID id;
    @Column(unique = true)
    private String username;
    private String password;
    private int authorizationScope;
    private String firstName;
    private String surname;
    private String phone;
    private String email;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Collection<Ownership> ownership;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "user")
    private Collection<PaymentArrangement> paymentArrangements;

    public User() {
    }

    public User(
        String username,
        String password,
        String firstName,
        String surname,
        String phone,
        String email,
        int authorizationScope,
        Collection<Ownership> ownership,
        Collection<PaymentArrangement> paymentArrangements
    ) {
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.surname = surname;
        this.phone = phone;
        this.email = email;
        this.authorizationScope = authorizationScope;
        this.ownership = ownership;
        this.paymentArrangements = paymentArrangements;
    }

    public String getName() {
        return this.firstName + " " + this.surname;
    }

    @Override
    public String toString() {
        return "User{" +
            "id=" + id +
            ", username='" + username + '\'' +
            ", firstName='" + firstName + '\'' +
            ", surname='" + surname + '\'' +
            ", phone='" + phone + '\'' +
            ", email='" + email + '\'' +
            '}';
    }
}
