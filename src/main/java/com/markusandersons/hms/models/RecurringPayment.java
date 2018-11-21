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

import com.markusandersons.hms.util.ApplicationConstants;
import lombok.Data;
import org.springframework.lang.Nullable;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.ZoneId;
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
    private double paymentAmount;
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
        double paymentAmount,
        PaymentCycle paymentCycle,
        Collection<PaymentArrangement> paymentArrangements,
        Integer paymentDays
    ) {
        this(name, notes, paymentAmount, null, paymentCycle, paymentArrangements, paymentDays);
        calculateNextPaymentDate();
    }

    public RecurringPayment(
        String name,
        String notes,
        double paymentAmount,
        LocalDate nextPaymentDate,
        PaymentCycle paymentCycle,
        Collection<PaymentArrangement> paymentArrangements,
        Integer paymentDays
    ) {
        if (paymentCycle == PaymentCycle.FIXED_DAYS && paymentDays == null) {
            throw new IllegalArgumentException();
        }
        this.name = name;
        this.notes = notes;
        this.paymentAmount = paymentAmount;
        this.nextPaymentDate = nextPaymentDate;
        this.paymentCycle = paymentCycle;
        this.paymentArrangements = paymentArrangements;
        this.paymentDays = paymentDays;
    }

    public void calculateNextPaymentDate() {
        this.calculateNextPaymentDate(LocalDate.now(ZoneId.of(ApplicationConstants.LOCAL_TIME_ZONE)));
    }

    public void calculateNextPaymentDate(LocalDate lastPaymentDate) {
        switch (this.paymentCycle) {
            case YEARLY:
                this.nextPaymentDate = lastPaymentDate.plusYears(1);
                break;
            case MONTHLY:
                this.nextPaymentDate = lastPaymentDate.plusMonths(1);
                break;
            case FIXED_DAYS:
                this.nextPaymentDate = lastPaymentDate.plusDays(this.paymentDays == null ? this.paymentDays : 0);
                break;
        }
    }
}
