package com.h2o.poppy.repository;

import com.h2o.poppy.entity.BlackboxVideoMetadata;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlackboxVideoMetadataRepository extends JpaRepository<BlackboxVideoMetadata, Long> {
}
