package com.markusandersons.hms.repositories;

import com.markusandersons.hms.models.SharedItem;
import org.springframework.data.repository.CrudRepository;

import java.util.UUID;

public interface SharedItemRepository extends CrudRepository<SharedItem, UUID> {
}
