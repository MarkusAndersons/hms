package com.markusandersons.hms.repositories;

import com.markusandersons.hms.models.Ownership;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface OwnershipRepository extends CrudRepository<Ownership, UUID> {
}
