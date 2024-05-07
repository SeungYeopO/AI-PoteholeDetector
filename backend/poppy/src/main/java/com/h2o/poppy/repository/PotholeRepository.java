package com.h2o.poppy.repository;

import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.model.pothole.PotholeDto;
import jakarta.persistence.Column;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import jakarta.transaction.Transactional;
import org.locationtech.jts.geom.Geometry;
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

    //포트홀 번호에 따른 1개 조회
    @Query("SELECT new com.h2o.poppy.model.pothole.PotholeDto(pt.potholePk, CAST(ST_X(pt.location) AS double), CAST(ST_Y(pt.location) AS double), pt.isPothole, pt.province,  pt.city, pt.street, pt.detectedAt, pt.state, pt.startAt, pt.expectAt, pt.endAt) FROM Pothole pt WHERE pt.potholePk = :pothole_pk and pt.isPothole = true")
    PotholeDto getPotholeByPotholeId(@Param("pothole_pk") Long potholeId);

    // 공사 상태에 따른 조회
    @Query("SELECT new com.h2o.poppy.model.pothole.PotholeDto(pt.potholePk, CAST(ST_X(pt.location) AS double), CAST(ST_Y(pt.location) AS double), pt.isPothole, pt.province,  pt.city, pt.street, pt.detectedAt, pt.state, pt.startAt, pt.expectAt, pt.endAt) FROM Pothole pt WHERE pt.state = :nowState and pt.isPothole = true")
    List<PotholeDto> getPotholeByNowState(@Param("nowState") String nowState);


    // 필터 조회
    @Query("SELECT new com.h2o.poppy.model.pothole.PotholeDto(pt.potholePk, CAST(ST_X(pt.location) AS double), CAST(ST_Y(pt.location) AS double), pt.isPothole, pt.province,  pt.city, pt.street, pt.detectedAt, pt.state, pt.startAt, pt.expectAt, pt.endAt) FROM Pothole pt WHERE (:nowState is null or pt.state = :nowState) and (:nowProvince is null or pt.province = :nowProvince) and  (:nowCity is null or pt.city = :nowCity) and (:nowDate is null or pt.detectedAt = :nowDate) and pt.isPothole = true")
    List<PotholeDto> getPotholeByFilter(@Param("nowState") String nowState, @Param("nowProvince") String nowProvince, @Param("nowCity") String nowCity, @Param("nowDate") Date nowDate);

    @Transactional
    @Modifying
    @Query("UPDATE Pothole e SET e.state = :newData, e.startAt = :startDate, e.expectAt = :exDate WHERE e.potholePk = :potholePk")
    int updateIngState(@Param("potholePk") long Pk, @Param("newData") String newValue, @Param("startDate") Date startDate);

    @Transactional
    @Modifying
    @Query("UPDATE Pothole e SET e.state = :newData, e.startAt = :endDate WHERE e.potholePk = :potholePk")
    int updateFnishState(@Param("potholePk") long Pk, @Param("newData") String newValue, @Param("endDate") Date endDate);

    @Transactional
    @Modifying
    @Query("UPDATE Pothole e SET e.isPothole = false WHERE e.potholePk = :potholePk")
    int updateIsPothole(@Param("potholePk") long Pk);


    @Query(value="SELECT * FROM potholes WHERE ST_DISTANCE(POINT(:longitude,:latitude ), location) <= 3/100",nativeQuery = true)
    List<Pothole> findNearbyPotholes(@Param("latitude") Double latitude, @Param("longitude") Double longitude);
}
