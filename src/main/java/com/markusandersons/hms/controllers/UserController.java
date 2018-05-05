package com.markusandersons.hms.controllers;

import com.markusandersons.hms.models.User;
import com.markusandersons.hms.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @RequestMapping(method=RequestMethod.GET, value="/api/user/{id}")
    public Optional<User> show(@PathVariable String id) {
        return userRepository.findById(id);
    }

    @RequestMapping(method=RequestMethod.PUT, value="/api/user/{id}")
    public Optional<User> update(@PathVariable String id, @RequestBody User user) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (!optionalUser.isPresent()) {
            return Optional.empty();
        }
        User u = optionalUser.get();
        if(user.getFirstName() != null)
            u.setFirstName(user.getFirstName());
        if(user.getSurname() != null)
            u.setSurname(user.getSurname());
        if(user.getPhone() != null)
            u.setPhone(user.getPhone());
        if(user.getEmail() != null)
            u.setEmail(user.getEmail());
        userRepository.save(user);
        return Optional.of(user);
    }

    @RequestMapping(method=RequestMethod.DELETE, value="/contacts/{id}")
    public String delete(@PathVariable String id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            userRepository.delete(user);
        }

        return "";
    }
}
