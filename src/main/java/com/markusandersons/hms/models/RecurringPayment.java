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
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Collection;
import java.util.UUID;

@Entity
@Data
public class RecurringPayment {
    @Id
    @GeneratedValue
    private UUID id;
    private String name;
    private String notes;
    private LocalDate nextPaymentDate;
    private PaymentCycle paymentCycle;
    @Nullable
    private Integer paymentDays;
    @OneToMany(cascade = CascadeType.ALL, mappedBy = "recurringPayment")
    private Collection<PaymentArrangement> paymentArrangements;

    public RecurringPayment() {
    }

    public RecurringPayment(
        String name,
        String notes,
        LocalDate nextPaymentDate,
        PaymentCycle paymentCycle,
        Collection<PaymentArrangement> paymentArrangements,
        Integer paymentDays
    ) {
        this.name = name;
        this.notes = notes;
        this.nextPaymentDate = nextPaymentDate;
        this.paymentCycle = paymentCycle;
        this.paymentArrangements = paymentArrangements;
        this.paymentDays = paymentDays;
    }
}
