package com.markusandersons.hms.repositories;

import java.util.UUID;

import com.markusandersons.hms.models.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, UUID> {
    @Override
    void delete(User deleted);
}
