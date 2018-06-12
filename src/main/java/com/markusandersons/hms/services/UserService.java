package com.markusandersons.hms.services;

import com.markusandersons.hms.models.User;
import com.markusandersons.hms.repositories.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private UserRepository userRepository;

    public Iterable<User> listUsers() {
        return userRepository.findAll();
    }

    // TODO Use immutables/POJO as body, create user object from this?????
    public User createUser(User user) {
        userRepository.save(user);
        return user;
    }

    public Optional<User> findUser(UUID id) {
        return userRepository.findById(id);
    }

    public Optional<User> updateUser(UUID id, User user) {
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
        if (user.getOwnership() != null)
            u.setOwnership(user.getOwnership());
        userRepository.save(u);
        return Optional.of(u);
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
