package com.markusandersons.hms.repositories;

import com.markusandersons.hms.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {
    @Override
    void delete(User deleted);
}
