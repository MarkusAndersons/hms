package com.markusandersons.hms.controllers;

import com.markusandersons.hms.models.Person;
import com.markusandersons.hms.repositories.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PersonController {
    @Autowired
    private PersonRepository personRepository;

    @RequestMapping(method = RequestMethod.GET, path = "/api/list_people")
    public Iterable<Person> people() {
        return personRepository.findAll();
    }

    @RequestMapping(method = RequestMethod.POST, value = "/api/create_person")
    public Person save(@RequestBody Person person) {
        personRepository.save(person);
        return person;
    }
}
