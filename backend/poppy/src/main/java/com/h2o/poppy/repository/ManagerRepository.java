package com.h2o.poppy.repository;

import com.h2o.poppy.entity.Manager;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerRepository extends CrudRepository<Manager, Long> {
}
