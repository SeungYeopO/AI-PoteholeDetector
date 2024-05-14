package com.h2o.poppy.repository;

import com.h2o.poppy.entity.AccidentReport;
import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.entity.User;
import com.h2o.poppy.model.accidentreport.AccidentReportDto;
import com.h2o.poppy.model.accidentreport.AccidentReportJoinMetaDataDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface AccidentReportRepository extends JpaRepository<AccidentReport, Long> {

    //유저기반 get list
    @Query("SELECT new com.h2o.poppy.model.accidentreport.AccidentReportJoinMetaDataDto(ar.reportPk, ar.userPk.userName, ar.potholePk.potholePk, ar.videoPk.videoPk, ar.videoPk.serialPk.serialNumber, ar.videoPk.latitude, ar.videoPk.longitude, ar.reportContent, ar.reportName,  ar.reportDate, ar.state, ar.rejectionReason) FROM AccidentReport ar WHERE ar.userPk.userPk = :userId")
    List<AccidentReportJoinMetaDataDto> getAccidentReportInfoByUserId(@Param("userId") Long userId);

    // 1개 report번호로 조회
    @Query("SELECT new com.h2o.poppy.model.accidentreport.AccidentReportJoinMetaDataDto(ar.reportPk, ar.userPk.userName, ar.potholePk.potholePk, ar.videoPk.videoPk, ar.videoPk.serialPk.serialNumber, ar.videoPk.latitude, ar.videoPk.longitude, ar.reportContent, ar.reportName,  ar.reportDate, ar.state, ar.rejectionReason) FROM AccidentReport ar WHERE ar.reportPk = :reportPk")
    AccidentReportJoinMetaDataDto getAccidentReportInfoByReportPk(@Param("reportPk") Long reportPk);

    // 미확인 get
    @Query("SELECT new com.h2o.poppy.model.accidentreport.AccidentReportJoinMetaDataDto(ar.reportPk, ar.userPk.userName, ar.potholePk.potholePk, ar.videoPk.videoPk, ar.videoPk.serialPk.serialNumber, ar.videoPk.latitude, ar.videoPk.longitude, ar.reportContent, ar.reportName,  ar.reportDate, ar.state, ar.rejectionReason) FROM AccidentReport ar WHERE ar.state = :nowState")
    List<AccidentReportJoinMetaDataDto> getAccidentReportInfoByNoCheck(@Param("nowState") String nowState);

    // 반려,보상성공 get
    @Query("SELECT new com.h2o.poppy.model.accidentreport.AccidentReportJoinMetaDataDto(ar.reportPk, ar.userPk.userName, ar.potholePk.potholePk, ar.videoPk.videoPk, ar.videoPk.serialPk.serialNumber, ar.videoPk.latitude, ar.videoPk.longitude, ar.reportContent, ar.reportName,  ar.reportDate, ar.state, ar.rejectionReason) FROM AccidentReport ar WHERE ar.state != :nowState")
    List<AccidentReportJoinMetaDataDto> getAccidentReportInfoByCheck(@Param("nowState") String nowState);

    // 날짜 필터링 조회
    @Query("SELECT new com.h2o.poppy.model.accidentreport.AccidentReportJoinMetaDataDto(ar.reportPk, ar.userPk.userName, ar.potholePk.potholePk, ar.videoPk.videoPk, ar.videoPk.serialPk.serialNumber, ar.videoPk.latitude, ar.videoPk.longitude, ar.reportContent, ar.reportName,  ar.reportDate, ar.state, ar.rejectionReason) FROM AccidentReport ar WHERE (:year is null or (YEAR(ar.reportDate) = :year AND MONTH(ar.reportDate) = :month AND DAY(ar.reportDate) = :day)) and ar.state = :state")
    List<AccidentReportJoinMetaDataDto> getAccidentReportInfoByDate(@Param("state") String state, @Param("year") int year, @Param("month") int month, @Param("day") int day);
 
    //상태 변경
    @Transactional
    @Modifying
    @Query("UPDATE AccidentReport e SET e.state = :newData, e.rejectionReason = :reason WHERE e.reportPk = :reportPk")
    int updateState(@Param("reportPk") long Pk, @Param("newData") String newValue, @Param("reason") String reason);

    @Transactional
    @Modifying
    @Query("DELETE FROM AccidentReport ar WHERE ar.userPk.userPk = :userId")
    void deleteByUserPk(@Param("userId") Long userId);
}
