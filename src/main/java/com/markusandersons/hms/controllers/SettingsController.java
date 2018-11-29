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

package com.markusandersons.hms.controllers;

import com.markusandersons.hms.auth.AuthConstants;
import com.markusandersons.hms.auth.AuthTools;
import com.markusandersons.hms.auth.AuthorizationException;
import com.markusandersons.hms.models.ChangeAccountCredentials;
import com.markusandersons.hms.models.ServerSettingsJson;
import com.markusandersons.hms.services.SettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
@RequestMapping(path = "/api/settings")
public class SettingsController {

    private final SettingsService settingsService;
    private final AuthTools authTools;

    @Autowired
    public SettingsController(SettingsService settingsService, AuthTools authTools) {
        this.settingsService = settingsService;
        this.authTools = authTools;
    }

    @RequestMapping(method = RequestMethod.POST, value = "/update_password")
    public String updatePassword(Principal principal, @RequestBody ChangeAccountCredentials accountCredentials) {
        if (principal != null && principal.getName().equals(accountCredentials.getUsername()))
            return settingsService.updatePassword(accountCredentials);
        throw new AuthorizationException("Cannot change password for a different account");
    }

    @RequestMapping(method = RequestMethod.GET, value = "/all_timezones")
    public Iterable<String> getAllTimezones() {
        return settingsService.getAllTimezones();
    }

    @RequestMapping(method = RequestMethod.GET, value = "/server")
    public ServerSettingsJson getServerSettings() {
        return settingsService.getServerSettings();
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/server")
    public ServerSettingsJson updateServerSettings(Principal principal, @RequestBody ServerSettingsJson serverSettingsJson) {
        if ((authTools.getAuthorizations(principal) & AuthConstants.SERVER_ADMIN) != 0)
            return settingsService.updateServerSettings(serverSettingsJson);
        throw new AuthorizationException("Not authorized to edit server config");
    }
}
