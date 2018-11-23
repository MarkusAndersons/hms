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

import com.markusandersons.hms.models.User;
import com.markusandersons.hms.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.security.Principal;
import java.util.Optional;

@Component
public class AuthTools {

    private final UserRepository userRepository;

    @Autowired
    public AuthTools(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public int getAuthorizations(Principal principal) {
        final Optional<User> optionalUser = userRepository.findByUsername(principal.getName());
        return optionalUser.map(User::getAuthorizationScope).orElse(0);
    }
}
