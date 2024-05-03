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
    @Query("SELECT new com.h2o.poppy.model.pothole.PotholeDto(pt.potholePk, pt.location, pt.isPothole, pt.province,  pt.city, pt.street, pt.detectedAt, pt.state, pt.startAt, pt.expectAt, pt.endAt) FROM Pothole pt WHERE pt.potholePk = :potholePk")
    PotholeDto getPotholeByPotholeId(@Param("potholePk") Long potholeId);


    @Query("SELECT new com.h2o.poppy.model.pothole.PotholeDto(pt.potholePk, pt.location, pt.isPothole, pt.province,  pt.city, pt.street, pt.detectedAt, pt.state, pt.startAt, pt.expectAt, pt.endAt) FROM Pothole pt WHERE pt.state = :nowState and pt.isPothole = true")
    List<PotholeDto> getPotholeByNowState(@Param("nowState") String nowState);

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


    //gps 탐색
//    @Query(value = "SELECT ST_DISTANCE_SPHERE(p1.location, p2.location) AS distance " +
//            "FROM potholes p1, potholes p2 " + "WHERE p1.pothole_pk = :potholePk1 AND p2.pothole_pk = :potholePk2",
//            nativeQuery = true)
//    Double calculateDistance(@Param("potholePk1") Long potholePk1, @Param("potholePk2") Long potholePk2);
//

    @Query(value="SELECT * FROM potholes WHERE ST_DISTANCE(POINT(:longitude,:latitude ), location) <= 3/100",nativeQuery = true)
    List<Pothole> findNearbyPotholes(@Param("latitude") Double latitude, @Param("longitude") Double longitude);
}
