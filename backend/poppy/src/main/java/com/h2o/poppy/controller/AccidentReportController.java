package com.h2o.poppy.controller;

import com.h2o.poppy.entity.*;
import com.h2o.poppy.model.pothole.PotholeDto;
import com.h2o.poppy.repository.AccidentReportRepository;
import com.h2o.poppy.model.accidentreport.AccidentReportDto;
import com.h2o.poppy.service.AccidentReportService;
import com.h2o.poppy.repository.BlackboxVideoMetadataRepository;
import com.h2o.poppy.repository.UserRepository;
import com.h2o.poppy.repository.PotholeRepository;
import com.h2o.poppy.service.AccidentReportService;

import org.checkerframework.checker.units.qual.A;
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

    public AccidentReportController(AccidentReportRepository accidentReportRepository,
            AccidentReportService accidentReportService) {
        this.accidentReportRepository = accidentReportRepository;
        this.accidentReportService = accidentReportService;
    }

    @PostMapping()
    public Object saveData(@RequestBody AccidentReportDto data) {

        AccidentReportDto result = accidentReportService.saveData(data);
        boolean success;

        if (result != null)
            success = true;
        else
            success = false;

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

        if (result != null)
            success = true;
        else
            success = false;
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

    // 미확인 상태 get
    @GetMapping("/no-check")
    public Object getNoCheck() {
        List<AccidentReportDto> noCheckState = accidentReportService.getState("미확인");
        boolean success = noCheckState != null; // PK가 0보다 크다면 성공으로 간주
        @Getter
        class getResponse {
            private final boolean success;
            private final List<AccidentReportDto> noCheckState;

            getResponse(boolean success, List<AccidentReportDto> noCheckState) {
                this.success = success;
                this.noCheckState = noCheckState;
            }
        }
        return new getResponse(success, noCheckState);
    }

    // 반려,보상완료 상태 get
    @GetMapping("/yes-check")
    public Object getYesCheck() {
        List<AccidentReportDto> yesCheckState = accidentReportService.getState("y");
        boolean success = yesCheckState != null; // PK가 0보다 크다면 성공으로 간주
        @Getter
        class getResponse {
            private final boolean success;
            private final List<AccidentReportDto> yesCheckState;

            getResponse(boolean success, List<AccidentReportDto> yesCheckState) {
                this.success = success;
                this.yesCheckState = yesCheckState;
            }
        }
        return new getResponse(success, yesCheckState);
    }

    // 날짜 필터링 post
    @Getter
    @Setter
    static class DateRequest {
        private Date reportDate;
    }

    @PostMapping("/date")
    public Object dateGet(@RequestBody DateRequest request) {
        Date targetDate = request.getReportDate();
        List<AccidentReportDto> dateList = accidentReportService.getDate(targetDate);
        boolean success = dateList != null; // PK가 0보다 크다면 성공으로 간주
        @Getter
        class getResponse {
            private final boolean success;
            private final List<AccidentReportDto> dateList;

            getResponse(boolean success, List<AccidentReportDto> dateList) {
                this.success = success;
                this.dateList = dateList;
            }
        }
        return new getResponse(success, dateList);
    }

    // 반려 - 신청완료 상태 변경

    @PatchMapping()
    public Object changeState(@RequestBody AccidentReportDto data) {
        String changeState = accidentReportService.changeState(data);
        boolean success = changeState != null;
        @Getter
        class stateResponse {
            private final boolean success;
            private final String changeState;

            stateResponse(boolean success, String changeState) {
                this.changeState = changeState;
                this.success = success;
            }
        }
        return new stateResponse(success, changeState);
    }

}
