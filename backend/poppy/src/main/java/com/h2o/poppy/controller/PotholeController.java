package com.h2o.poppy.controller;

import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.model.pothole.PotholeDto;
import com.h2o.poppy.repository.PotholeRepository;
import com.h2o.poppy.service.PotholeService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/potholes")
public class PotholeController {

    private final PotholeService potholeService;

    @Autowired
    public PotholeController(PotholeService potholeService) {
        this.potholeService = potholeService;
    }

    // 포트홀 등록
    @PostMapping
    public Object saveData(@RequestBody PotholeDto data) {
        double d_lat = data.getLatitude();
        double d_lon = data.getLongitude();
        String lat = Double.toString(d_lat);
        String lon = Double.toString(d_lon);

        @Getter
        class getResponse {
            private final boolean success;
            private final long potholePk;

            getResponse(boolean success, long potholePk) {
                this.success = success;
                this.potholePk = potholePk;
            }
        }

        boolean checkGPS = potholeService.checkGPSdata(d_lat, d_lon);

        if (!checkGPS)
            return new getResponse(false, 0);
        long potholePk = 0;
        String road = potholeService.callTmapApi(lat, lon);

        boolean success = road != null; // PK가 0보다 크다면 성공으로 간주
        try {
            potholePk = Long.parseLong(road);
        } catch (Exception e) {
            potholePk = 0;
        }

        return new getResponse(success, potholePk);
    }

    // 전체 포트홀 읽기
    @GetMapping
    public Object getAllPothole() {
        List<PotholeDto> getAllPotholes = potholeService.getAllPothole();
        boolean success = getAllPotholes != null; // PK가 0보다 크다면 성공으로 간주
        @Getter
        class getResponse {
            private final boolean success;
            private final List<PotholeDto> getAllPotholes;

            getResponse(boolean success, List<PotholeDto> getAllPotholes) {
                this.success = success;
                this.getAllPotholes = getAllPotholes;
            }
        }
        return new getResponse(success, getAllPotholes);
    }

    @PostMapping("/choose")
    public Object chooseGet(@RequestBody PotholeDto data) {
        List<PotholeDto> filterdDate = potholeService.chooseGet(data);
        boolean success = filterdDate != null; // PK가 0보다 크다면 성공으로 간주
        @Getter
        class getResponse {
            private final boolean success;
            private final List<PotholeDto> filterdDate;

            getResponse(boolean success, List<PotholeDto> filterdDate) {
                this.success = success;
                this.filterdDate = filterdDate;
            }
        }
        return new getResponse(success, filterdDate);
    }

    @GetMapping("before-state")
    public Object getState1Potholes() {
        List<PotholeDto> State1Potholes = potholeService.getState1Pothole("미확인");
        boolean success = State1Potholes != null; // PK가 0보다 크다면 성공으로 간주
        @Getter
        class getResponse {
            private final boolean success;
            private final List<PotholeDto> State1Potholes;

            getResponse(boolean success, List<PotholeDto> State1Potholes) {
                this.success = success;
                this.State1Potholes = State1Potholes;
            }
        }
        return new getResponse(success, State1Potholes);
    }

    @GetMapping("ing-state")
    public Object getState2Potholes() {
        List<PotholeDto> getState2Potholes = potholeService.getState1Pothole("공사중");
        boolean success = getState2Potholes != null; // PK가 0보다 크다면 성공으로 간주
        @Getter
        class getResponse {
            private final boolean success;
            private final List<PotholeDto> State1Potholes;

            getResponse(boolean success, List<PotholeDto> getState2Potholes) {
                this.success = success;
                this.State1Potholes = getState2Potholes;
            }
        }
        return new getResponse(success, getState2Potholes);
    }

    @GetMapping("after-state")
    public Object getState3Potholes() {
        List<PotholeDto> getState3Potholes = potholeService.getState1Pothole("공사완료");
        boolean success = getState3Potholes != null; // PK가 0보다 크다면 성공으로 간주
        @Getter
        class getResponse {
            private final boolean success;
            private final List<PotholeDto> State1Potholes;

            getResponse(boolean success, List<PotholeDto> getState3Potholes) {
                this.success = success;
                this.State1Potholes = getState3Potholes;
            }
        }
        return new getResponse(success, getState3Potholes);
    }

    // 공사대기 - 공사중 - 공사완료 변경
    @PatchMapping()
    public Object changeState(@RequestBody PotholeDto data) {
        String changeState = potholeService.changeState(data);
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

    // 포트홀 1개 정보 보기
    @GetMapping("/{potholePk}")
    public Object getIdPothole(@PathVariable Long potholePk) {

        PotholeDto getPothole = potholeService.getIdPothole(potholePk);
        boolean success = getPothole != null;
        @Getter
        class getResponse {
            private final boolean success;
            private final PotholeDto getPothole;

            getResponse(boolean success, PotholeDto getPothole) {
                this.success = success;
                this.getPothole = getPothole;
            }
        }
        return new getResponse(success, getPothole);

    }

    // 삭제 -> 반려
    @PutMapping("/{potholePk}")
    public Object deleteData(@PathVariable Long potholePk) {
        boolean result = potholeService.rejectData(potholePk);

        @Getter
        class DeleteDataResponse {
            private final boolean result;

            DeleteDataResponse(boolean result) {
                this.result = result;
            }
        }
        return new DeleteDataResponse(result);
    }

}
