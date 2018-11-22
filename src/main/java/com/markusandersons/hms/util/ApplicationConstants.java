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

public final class ApplicationConstants {
    private ApplicationConstants() {
    }

    public static final String VERSION = "1.0";
    public static final String LOCAL_TIME_ZONE = "Australia/Sydney";
    public static final String HOSTNAME = "http://localhost:8080";
    public static final double EPSILON = 1e-5;
    public static final long PAYMENT_REMINDER_DAYS = 2;

    /* Mailgun Settings */
    public static final String MG_DOMAIN = System.getenv("MG_DOMAIN");
    public static final String MG_API_KEY = System.getenv("MG_API_KEY");
}
