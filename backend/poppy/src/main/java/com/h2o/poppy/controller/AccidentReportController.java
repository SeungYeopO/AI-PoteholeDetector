package com.h2o.poppy.controller;

import com.h2o.poppy.entity.*;
import com.h2o.poppy.model.accidentreport.AccidentReportJoinMetaDataDto;
import com.h2o.poppy.model.pothole.PotholeDto;
import com.h2o.poppy.repository.AccidentReportRepository;
import com.h2o.poppy.model.accidentreport.AccidentReportDto;
import com.h2o.poppy.service.AccidentReportService;
import com.h2o.poppy.repository.BlackboxVideoMetadataRepository;
import com.h2o.poppy.repository.UserRepository;
import com.h2o.poppy.repository.PotholeRepository;
import com.h2o.poppy.service.AccidentReportService;

import com.h2o.poppy.service.S3Service;
import jakarta.persistence.*;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/accident-report")
public class AccidentReportController {

    private final AccidentReportRepository accidentReportRepository;
    private final AccidentReportService accidentReportService;
    private final S3Service s3Service;


    public AccidentReportController(AccidentReportRepository accidentReportRepository,
            AccidentReportService accidentReportService, S3Service s3Service) {
        this.accidentReportRepository = accidentReportRepository;
        this.accidentReportService = accidentReportService;
        this.s3Service = s3Service;
    }

    // 사고 신고 등록
    @PostMapping
    public Object saveData(@RequestParam("userPk") Long userPk,@RequestParam("videoPk") Long videoPk,@RequestParam("reportName") String reportName,@RequestParam("reportContent") String reportContent,@RequestParam("file") List<MultipartFile> image)throws IOException {
        AccidentReportJoinMetaDataDto result = accidentReportService.saveData(userPk,videoPk,reportName,reportContent);
        boolean success = result != null;

        if(success){
            List<MultipartFile> fileList = image;
            String reportPk = Long.toString(result.getReportPk());
            String serialNumber = result.getSerialNumber();
            s3Service.createFolder(serialNumber+"/"+reportPk);
            for(MultipartFile nowFile : fileList ){
                s3Service.uploadFile(serialNumber+"/"+reportPk, nowFile);
            }
        }
        // 메서드 내 로컬 클래스 정의
        @Getter
        class SaveResponse {
            private final boolean success;
            private final AccidentReportJoinMetaDataDto result;

            SaveResponse(boolean success, AccidentReportJoinMetaDataDto result) {
                this.success = success;
                this.result = result;
            }
        }
        // 로컬 클래스 인스턴스 생성 및 반환
        return new SaveResponse(success, result);
    }


    // 사용자가 확인하는거 ( 사용자 pk로 조회)
    @GetMapping("/user/{userPk}")
    public Object getIduser(@PathVariable Long userPk) {

        List<AccidentReportJoinMetaDataDto> result = accidentReportService.getAccident(userPk);
        boolean success;

        if (result != null)
            success = true;
        else
            success = false;
        // 메서드 내 로컬 클래스 정의
        @Getter
        class SaveResponse {
            private final boolean success;
            private final List<AccidentReportJoinMetaDataDto> result;

            SaveResponse(boolean success, List<AccidentReportJoinMetaDataDto> result) {
                this.success = success;
                this.result = result;
            }
        }
        // 로컬 클래스 인스턴스 생성 및 반환
        return new SaveResponse(success, result);
    }

    // 관리자가 확인하는거 ( 리포트 pk로 조회) 1개만
    @GetMapping("/{reportPk}")
    public Object getIdReport(@PathVariable Long reportPk) {

        AccidentReportJoinMetaDataDto result = accidentReportService.getAccidentReportPk(reportPk);
        boolean success = result != null;

        List<String> imageFileNameList = null;

        if(success){
            String folderPath = result.getSerialNumber()+"/"+Long.toString(result.getReportPk());
            imageFileNameList = s3Service.listObjectsInFolder(folderPath);
            if(!imageFileNameList.isEmpty()) imageFileNameList.remove(0);
        }

        // 메서드 내 로컬 클래스 정의
        @Getter
        class SaveResponse {
            private final boolean success;
            private final AccidentReportJoinMetaDataDto result;
            private final List<String> imageFileNameList;
            SaveResponse(boolean success, AccidentReportJoinMetaDataDto result, List<String> imageFileNameList) {
                this.success = success;
                this.result = result;
                this.imageFileNameList = imageFileNameList;
            }
        }
        // 로컬 클래스 인스턴스 생성 및 반환
        return new SaveResponse(success, result, imageFileNameList);
    }

    // 미확인 상태 get
    @GetMapping("/no-check")
    public Object getNoCheck() {
        List<AccidentReportJoinMetaDataDto> noCheckState = accidentReportService.getState("미확인");
        boolean success = noCheckState != null; // PK가 0보다 크다면 성공으로 간주
        @Getter
        class getResponse {
            private final boolean success;
            private final List<AccidentReportJoinMetaDataDto> noCheckState;

            getResponse(boolean success, List<AccidentReportJoinMetaDataDto> noCheckState) {
                this.success = success;
                this.noCheckState = noCheckState;
            }
        }
        return new getResponse(success, noCheckState);
    }

    // 반려,보상완료 상태 get
    @GetMapping("/yes-check")
    public Object getYesCheck() {
        List<AccidentReportJoinMetaDataDto> yesCheckState = accidentReportService.getState("y");
        boolean success = yesCheckState != null; // PK가 0보다 크다면 성공으로 간주
        @Getter
        class getResponse {
            private final boolean success;
            private final List<AccidentReportJoinMetaDataDto> yesCheckState;

            getResponse(boolean success, List<AccidentReportJoinMetaDataDto> yesCheckState) {
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



    // 선택 비디오에 대한 포트홀 리스트 조회
    @GetMapping("/pothole-list/{videoPk}")
    public Object getPotholeList(@PathVariable Long videoPk){
        List<PotholeDto> result = accidentReportService.getPotholeList(videoPk);
        boolean success = result != null;
        @Getter
        class SaveResponse {
            private final boolean success;
            private final List<PotholeDto> result;

            SaveResponse(boolean success, List<PotholeDto> result) {
                this.success = success;
                this.result = result;
            }
        }
        // 로컬 클래스 인스턴스 생성 및 반환
        return new SaveResponse(success, result);
    }

}
