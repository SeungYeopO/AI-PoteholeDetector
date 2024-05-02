package com.h2o.poppy.repository;

import com.h2o.poppy.entity.AccidentReport;
import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.entity.User;
import com.h2o.poppy.model.accidentreport.AccidentReportDto;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface AccidentReportRepository extends JpaRepository<AccidentReport, Long> {

    @Query("SELECT new com.h2o.poppy.model.accidentreport.AccidentReportDto(ar.reportPk, ar.userPk.userPk, ar.potholePk.potholePk, ar.videoPk.videoPk, ar.reportName, ar.reportContent,  ar.isProcess) FROM AccidentReport ar WHERE ar.userPk.userPk = :userId")
    List<AccidentReportDto> getAccidentReportInfoByUserId(@Param("userId") Long userId);


    @Transactional
    @Modifying
    @Query("DELETE FROM AccidentReport ar WHERE ar.userPk.userPk = :userId")
    void deleteByUserPk(@Param("userId") Long userId);
}
