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

import com.markusandersons.hms.auth.AuthorizationException;
import com.markusandersons.hms.models.ChangeAccountCredentials;
import com.markusandersons.hms.models.ServerSettings;
import com.markusandersons.hms.models.ServerSettingsJson;
import com.markusandersons.hms.models.User;
import com.markusandersons.hms.repositories.ServerSettingsRepository;
import com.markusandersons.hms.repositories.UserRepository;
import com.markusandersons.hms.util.JsonUtils;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class SettingsService {

    private final UserRepository userRepository;
    private final ServerSettingsRepository serverSettingsRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public SettingsService(UserRepository userRepository, ServerSettingsRepository serverSettingsRepository) {
        this.userRepository = userRepository;
        this.serverSettingsRepository = serverSettingsRepository;
    }

    // NOTE: will need to log out of web app to remove stored token
    public String updatePassword(ChangeAccountCredentials accountCredentials) {
        final Optional<User> optionalUser = userRepository.findByUsername(accountCredentials.getUsername());
        if (!optionalUser.isPresent()) throw new IllegalArgumentException("Cannot find given user");
        final User user = optionalUser.get();
        if (!bCryptPasswordEncoder.matches(accountCredentials.getPassword(), user.getPassword()))
            throw new AuthorizationException("Current password does not match");
        user.setPassword(bCryptPasswordEncoder.encode(accountCredentials.getNewPassword()));
        userRepository.save(user);
        return accountCredentials.getUsername() + " - password updated";
    }

    public ServerSettingsJson updateServerSettings(ServerSettingsJson serverSettings) {
        final Iterable<ServerSettings> allSettings = serverSettingsRepository.findAll();
        final ServerSettings settings = allSettings.iterator().next();
        if (serverSettings.getHostname() != null)
            settings.setHostname(serverSettings.getHostname());
        if (serverSettings.getServerTimezone() != null)
            settings.setServerTimezone(serverSettings.getServerTimezone());
        serverSettingsRepository.save(settings);
        return JsonUtils.getJson(settings);
    }

    public Iterable<String> getAllTimezones() {
        final List<String> timezones = new ArrayList<>(ZoneId.getAvailableZoneIds());
        Collections.sort(timezones);
        return timezones;
    }

    public ServerSettingsJson getServerSettings() {
        final Iterable<ServerSettings> allSettings = serverSettingsRepository.findAll();
        final ServerSettings settings = allSettings.iterator().next();
        return JsonUtils.getJson(settings);
    }

    public String getServerTimezone() {
        final ServerSettingsJson settings = getServerSettings();
        return settings.getServerTimezone();
    }
}
