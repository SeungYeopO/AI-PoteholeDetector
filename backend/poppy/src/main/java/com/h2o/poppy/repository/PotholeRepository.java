package com.h2o.poppy.repository;

import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.model.pothole.PotholeDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface PotholeRepository extends JpaRepository<Pothole, Long> {
    @Query("SELECT new com.h2o.poppy.model.pothole.PotholeDto(pt.potholePk, pt.latitude, pt.longitude, pt.isPothole, pt.province,  pt.city, pt.street, pt.detectedAt, pt.state, pt.startAt, pt.expectAt, pt.endAt) FROM Pothole pt WHERE pt.potholePk = :potholePk")
    PotholeDto getPotholeByPotholeId(@Param("potholePk") Long potholeId);


    @Query("SELECT new com.h2o.poppy.model.pothole.PotholeDto(pt.potholePk, pt.latitude, pt.longitude, pt.isPothole, pt.province,  pt.city, pt.street, pt.detectedAt, pt.state, pt.startAt, pt.expectAt, pt.endAt) FROM Pothole pt WHERE pt.state = :nowState and pt.isPothole = true")
    List<PotholeDto> getPotholeByNowState(@Param("nowState") String nowState);

//    @Transactional
//    @Modifying
//    @Query("UPDATE Pothole e SET e.isPothole = :newData WHERE e.potholePk = :potholePk")
//    int updateIsPothole(@Param("potholePk") long Pk, @Param("newData") boolean newValue);
//
//    @Transactional
//    @Modifying
//    @Query("UPDATE Pothole e SET e.isRepair = :newData WHERE e.potholePk = :potholePk")
//    int updateIsRepair(@Param("potholePk") long Pk, @Param("newData") boolean newValue);

    @Transactional
    @Modifying
    @Query("UPDATE Pothole e SET e.state = :newData WHERE e.potholePk = :potholePk")
    int updateState(@Param("potholePk") long Pk, @Param("newData") String newValue);

    @Transactional
    @Modifying
    @Query("UPDATE Pothole e SET e.isPothole = false WHERE e.potholePk = :potholePk")
    int updateIsPothole(@Param("potholePk") long Pk);

}
