package com.h2o.poppy.repository;

import com.h2o.poppy.entity.AccidentReport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AccidentReportRepository extends JpaRepository<AccidentReport, Long> {
    //List<AccidentReport> findByUserPk(User userPk);

}
