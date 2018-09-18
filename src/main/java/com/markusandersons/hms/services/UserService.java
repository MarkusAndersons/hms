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

import com.markusandersons.hms.models.User;
import com.markusandersons.hms.models.UserJson;
import com.markusandersons.hms.repositories.UserRepository;
import com.markusandersons.hms.util.JsonUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
public class UserService {  // TODO Replace this with interface and UserServiceImpl

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<UserJson> listUsers() {
        return StreamSupport.stream(userRepository.findAll().spliterator(), false)
                .map(JsonUtils::getJson).collect(Collectors.toList());
    }

    public UserJson createUser(UserJson userJson) {
        final User user = JsonUtils.getUser(userJson);
        userRepository.save(user);
        return JsonUtils.getJson(user);
    }

    public Optional<UserJson> findUser(UUID id) {
        final Optional<User> userOptional = userRepository.findById(id);
        return userOptional.map(JsonUtils::getJson);
    }

    public Optional<UserJson> updateUser(UUID id, UserJson user) {
        final Optional<User> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return Optional.empty();
        }
        final User u = optionalUser.get();
        if (user.getFirstName() != null)
            u.setFirstName(user.getFirstName());
        if (user.getSurname() != null)
            u.setSurname(user.getSurname());
        if (user.getPhone() != null)
            u.setPhone(user.getPhone());
        if (user.getEmail() != null)
            u.setEmail(user.getEmail());
        userRepository.save(u);
        return Optional.of(JsonUtils.getJson(u));
    }

    public String deleteUser(UUID id) {
        final Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            final User user = optionalUser.get();
            userRepository.delete(user);
        }

        return "User:" + id.toString() + " deleted";
    }
}
