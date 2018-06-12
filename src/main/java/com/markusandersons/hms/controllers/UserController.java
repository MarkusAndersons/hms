package com.markusandersons.hms.controllers;

import com.markusandersons.hms.models.User;
import com.markusandersons.hms.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.UUID;

@RestController
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);

    @Autowired
    private UserService userService;

    @RequestMapping(method = RequestMethod.GET, path = "/api/list_users")
    public Iterable<User> users() {
        return userService.listUsers();
    }

    // TODO Use immutables/POJO as body, create user object from this?????
    @RequestMapping(method = RequestMethod.POST, value = "/api/create_user")
    public User create(@RequestBody User user) {
        return userService.createUser(user);
    }

    @RequestMapping(method=RequestMethod.GET, value="/api/user/{id}")
    public Optional<User> show(@PathVariable UUID id) {
        return userService.findUser(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/api/user/{id}")
    public Optional<User> update(@PathVariable UUID id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/api/user/{id}")
    public String delete(@PathVariable UUID id) {
        return userService.deleteUser(id);
    }
}
