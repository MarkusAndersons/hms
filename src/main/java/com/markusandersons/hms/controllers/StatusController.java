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
import com.markusandersons.hms.models.ImmutableStatusJson;
import com.markusandersons.hms.models.StatusJson;
import com.markusandersons.hms.util.ApplicationConstants;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
public class StatusController {

    private static final Logger LOGGER = LoggerFactory.getLogger(StatusController.class);

    @RequestMapping(path = "/status")
    public StatusJson getStatus(@RequestHeader HttpHeaders headers) {
        LOGGER.debug("Status Requested");
        final List<String> authHeaders = headers.get("Authorization");
        final Optional<String> authHeader = authHeaders == null ? Optional.empty() : Optional.of(authHeaders.get(0));
        final String auth;
        boolean authenticated;
        String status = "OK";
        if (authHeader.isPresent()) {
            // parse the token.
            String user = null;
            try {
                user = Jwts.parser()
                    .setSigningKey(AuthConstants.SECRET)
                    .parseClaimsJws(authHeader.get().replace(AuthConstants.TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject();
                authenticated = true;
            } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException | IllegalArgumentException ex) {
                authenticated = false;
                status = "Auth Error: " + ex.toString();
            }
            auth = user != null ?
                new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList()).getPrincipal().toString() :
                null;
        } else {
            auth = null;
            authenticated = false;
            status = "Unauthorized";
        }

        return ImmutableStatusJson.builder()
            .authenticated(authenticated)
            .authHeader(authHeader)
            .serverTime(LocalDateTime.now(ZoneId.of("UTC")))
            .username(Optional.ofNullable(auth))
            .version(ApplicationConstants.VERSION)
            .status(status)
            .build();
    }
}
