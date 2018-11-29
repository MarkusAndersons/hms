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

import com.markusandersons.hms.models.EmailSendException;
import com.markusandersons.hms.models.PaymentArrangement;
import com.markusandersons.hms.models.RecurringPayment;
import com.markusandersons.hms.models.User;
import com.markusandersons.hms.util.ApplicationConstants;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ReminderEmailService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ReminderEmailService.class);

    private final SettingsService settingsService;

    @Autowired
    public ReminderEmailService(SettingsService settingsService) {
        this.settingsService = settingsService;
    }

    public void sendReminderEmail(RecurringPayment recurringPayment) throws EmailSendException {
        try {
            for (PaymentArrangement paymentArrangement : recurringPayment.getPaymentArrangements()) {
                if (paymentArrangement.isReminderSent()) continue;
                final User user = paymentArrangement.getUser();
                final JsonNode emailResponse = sendEmail(
                    "HMS <no-reply@markusandersons.com>",
                    user.getEmail(),
                    "HMS Payment Reminder",
                    formatTextReminder(recurringPayment, paymentArrangement),
                    formatHtmlReminder(recurringPayment, paymentArrangement)
                );
                paymentArrangement.setReminderSent(true);
            }
        } catch (UnirestException ex) {
            throw new EmailSendException("Failed to send email for payment: " + recurringPayment.getName(), ex);
        }
    }

    private JsonNode sendEmail(String fromEmail, String toEmail, String subject, String textMessage, String htmlMessage) throws UnirestException {
        final HttpResponse<JsonNode> request = Unirest.post("https://api.mailgun.net/v3/" + ApplicationConstants.MG_DOMAIN + "/messages")
            .basicAuth("api", ApplicationConstants.MG_API_KEY)
            .queryString("from", fromEmail)
            .queryString("to", toEmail)
            .queryString("subject", subject)
            .queryString("text", textMessage)
            .queryString("html", htmlMessage)
            .asJson();
        return request.getBody();
    }

    private String formatTextReminder(RecurringPayment recurringPayment, PaymentArrangement paymentArrangement) {
        return "The payment for "
            + recurringPayment.getName()
            + " is due on "
            + recurringPayment.getNextPaymentDate().toString()
            + ". You owe "
            + String.format("$%.2f", recurringPayment.getPaymentAmount() * 0.01 * paymentArrangement.getPercentage())
            + " (" + String.format("%.2f", paymentArrangement.getPercentage()) + "% of " + String.format("$%.2f", recurringPayment.getPaymentAmount()) + ")."
            + "\n\nIf you have already paid this, you can disregard this email."
            + "\n\nFor more information go to " + getPaymentUrl(recurringPayment);
    }

    private String formatHtmlReminder(RecurringPayment recurringPayment, PaymentArrangement paymentArrangement) {
        return "<p>The payment for "
            + recurringPayment.getName()
            + " is due on "
            + recurringPayment.getNextPaymentDate().toString()
            + ". You owe "
            + String.format("$%.2f", recurringPayment.getPaymentAmount() * 0.01 * paymentArrangement.getPercentage())
            + " (" + String.format("%.2f", paymentArrangement.getPercentage()) + "% of " + String.format("$%.2f", recurringPayment.getPaymentAmount()) + ")."
            + "<br/><br/>If you have already paid this, you can disregard this email."
            + "<br/><br/>For more information go to <a href=\"" + getPaymentUrl(recurringPayment) + "\">" + getPaymentUrl(recurringPayment) + "</a></p>";
    }

    private String getPaymentUrl(RecurringPayment recurringPayment) {
        return settingsService.getServerSettings().getHostname() + "/recurring_payments/show/" + recurringPayment.getId().toString();
    }
}
