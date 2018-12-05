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

package com.markusandersons.hms.auth;

import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Collections;

public class JWTAuthenticationFilter extends GenericFilterBean {

    private static final Logger LOGGER = LoggerFactory.getLogger(JWTAuthenticationFilter.class);

    @Override
    public void doFilter(
        ServletRequest req,
        ServletResponse res,
        FilterChain chain
    ) throws IOException, ServletException {
        final String token = ((HttpServletRequest) req).getHeader(AuthConstants.HEADER_STRING);
        final Authentication auth;
        if (token != null) {
            // parse the token.
            String user;
            try {
                user = Jwts.parser()
                    .setSigningKey(AuthConstants.SECRET)
                    .parseClaimsJws(token.replace(AuthConstants.TOKEN_PREFIX, ""))
                    .getBody()
                    .getSubject();
            } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException | SignatureException e) {
                LOGGER.info("Authentication failed!", e);
                user = null;
            }
            auth = user != null ?
                new UsernamePasswordAuthenticationToken(user, null, Collections.emptyList()) :
                null;
        } else {
            auth = null;
        }
        SecurityContextHolder.getContext()
            .setAuthentication(auth);
        chain.doFilter(req, res);
    }
}
