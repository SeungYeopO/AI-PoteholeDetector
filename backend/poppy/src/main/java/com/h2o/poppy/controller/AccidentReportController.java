package com.h2o.poppy.controller;

import com.h2o.poppy.entity.*;
import com.h2o.poppy.repository.AccidentReportRepository;
import com.h2o.poppy.model.accidentreport.AccidentReportDto;
import com.h2o.poppy.service.AccidentReportService;
import com.h2o.poppy.repository.BlackboxVideoMetadataRepository;
import com.h2o.poppy.repository.UserRepository;
import com.h2o.poppy.repository.PotholeRepository;
import com.h2o.poppy.service.AccidentReportService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.Getter;
import lombok.Setter;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/accident-report")
public class AccidentReportController {

    private final AccidentReportRepository accidentReportRepository;
    private final AccidentReportService accidentReportService;

    public AccidentReportController(AccidentReportRepository accidentReportRepository,AccidentReportService accidentReportService) {
        this.accidentReportRepository = accidentReportRepository;
        this.accidentReportService = accidentReportService;
    }

    @PostMapping()
    public Object saveData(@RequestBody AccidentReportDto data) {

        AccidentReportDto result = accidentReportService.saveData(data);
        boolean success;

        if(result!=null)success=true;
        else success = false;

        // 메서드 내 로컬 클래스 정의
        @Getter
        class SaveResponse {
            private final boolean success;
            private final AccidentReportDto result;
            SaveResponse(boolean success, AccidentReportDto result) {
                this.success = success;
                this.result = result;
            }
        }
        // 로컬 클래스 인스턴스 생성 및 반환
        return new SaveResponse(success, result);
    }

    @GetMapping("/{userPk}")
    public Object getIduser(@PathVariable Long userPk) {

        List<AccidentReportDto> result = accidentReportService.getAccident(userPk);
        boolean success;

        if(result!=null)success=true;
        else success = false;
        // 메서드 내 로컬 클래스 정의
        @Getter
        class SaveResponse {
            private final boolean success;
            private final List<AccidentReportDto> result;
            SaveResponse(boolean success, List<AccidentReportDto> result) {
                this.success = success;
                this.result = result;
            }
        }
        // 로컬 클래스 인스턴스 생성 및 반환
        return new SaveResponse(success, result);
    }

}
