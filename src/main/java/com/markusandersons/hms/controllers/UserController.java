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

import com.markusandersons.hms.models.User;
import com.markusandersons.hms.models.UserJson;
import com.markusandersons.hms.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping(path = "/api/users/")
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    private final UserService userService = new UserService();

    @RequestMapping(method = RequestMethod.GET, path = "/list")
    public Iterable<UserJson> users() {
        return userService.listUsers();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/create")
    public UserJson create(@RequestBody User user) {
        return userService.createUser(user);
    }

    @RequestMapping(method = RequestMethod.GET, value = "/user/{id}")
    public Optional<UserJson> show(@PathVariable UUID id) {
        return userService.findUser(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/user/{id}")
    public Optional<UserJson> update(@PathVariable UUID id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @RequestMapping(method = RequestMethod.DELETE, value = "/user/{id}")
    public String delete(@PathVariable UUID id) {
        return userService.deleteUser(id);
    }
}
