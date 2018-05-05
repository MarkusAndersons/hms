package com.markusandersons.hms.controllers;

import com.markusandersons.hms.models.User;
import com.markusandersons.hms.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @RequestMapping(method = RequestMethod.GET, path = "/api/list_users")
    public Iterable<User> people() {
        return userRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/create_user")
    public User save(@RequestBody User person) {
        userRepository.save(person);
        return person;
    }
}
