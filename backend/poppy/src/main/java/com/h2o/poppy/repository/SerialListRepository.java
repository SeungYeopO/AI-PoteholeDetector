package com.h2o.poppy.repository;

import com.h2o.poppy.entity.SerialList;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SerialListRepository extends JpaRepository<SerialList, Long> {
    // 시리얼 번호 입력으로 pk값 찾기
    SerialList findBySerialNumber(String serialNumber);
}
