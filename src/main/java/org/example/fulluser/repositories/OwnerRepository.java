package org.example.fulluser.repositories;

import org.example.fulluser.models.Owner;
import org.springframework.data.repository.CrudRepository;

public interface OwnerRepository extends CrudRepository<Owner,Integer> {
}
