package com.h2o.poppy.repository;

import com.h2o.poppy.entity.Pothole;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PotholeRepository extends CrudRepository<Pothole, Long> {
}
