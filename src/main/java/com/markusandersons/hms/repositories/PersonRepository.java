package com.markusandersons.hms.repositories;

import com.markusandersons.hms.models.Person;
import org.springframework.data.repository.CrudRepository;

public interface PersonRepository extends CrudRepository<Person, String> {
    @Override
    void delete(Person deleted);
}
