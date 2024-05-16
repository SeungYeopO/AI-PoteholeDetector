package com.h2o.poppy.controller;

import com.h2o.poppy.model.pothole.PotholeDto;
import com.h2o.poppy.service.AddressService;
import com.h2o.poppy.service.PotholeService;
import com.h2o.poppy.service.S3Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/potholes")
public class PotholeController {

    private final PotholeService potholeService;
    private final AddressService addressService;
    private final S3Service s3Service;

    @Autowired
    public PotholeController(PotholeService potholeService, AddressService addressService, S3Service s3Service) {
        this.potholeService = potholeService;
        this.addressService = addressService;
        this.s3Service = s3Service;
    }

    @Getter
    @Setter
    static class GPSPotholeData{
        private double latitude;
        private double longitude;
        private MultipartFile file;
    }
    // 포트홀 등록
    @PostMapping
    public void saveData(@RequestParam("latitude") double latitude,
                         @RequestParam("longitude") double longitude,
                         @RequestParam("file") MultipartFile image) throws IOException {
        String lat = Double.toString(latitude);
        String lon = Double.toString(longitude);

        @Getter
        class getResponse {
            private final boolean success;
            private final long potholePk;

            getResponse(boolean success, long potholePk) {
                this.success = success;
                this.potholePk = potholePk;
            }
        }

        String road = potholeService.callTmapApi(lat, lon);

        int directoryResult = addressService.saveAddress(road);
        boolean checkGPS = true;

        if (directoryResult == 2) {
            checkGPS = potholeService.checkGPSdata(latitude, longitude);
        }

        long potholePk = 0;
        if(checkGPS){
            String[] words = road.split(" ");
            String stringPotholePk = potholeService.saveData(words[0], words[1], words[2], lat, lon);
            s3Service.createFolder(road);
            s3Service.uploadFile(road, image);
        }
    }


    @PostMapping("/by-user")
    public void saveDataByUser(@RequestParam("latitude") double latitude,
                         @RequestParam("longitude") double longitude,
                         @RequestParam("file") MultipartFile image) throws IOException {
        String lat = Double.toString(latitude);
        String lon = Double.toString(longitude);

        @Getter
        class getResponse {
            private final boolean success;
            private final long potholePk;

            getResponse(boolean success, long potholePk) {
                this.success = success;
                this.potholePk = potholePk;
            }
        }

        String road = potholeService.callTmapApi(lat, lon);

        int directoryResult = addressService.saveAddress(road);
        boolean checkGPS = true;

        if (directoryResult == 2) {
            checkGPS = potholeService.checkGPSdata(latitude, longitude);
        }

        long potholePk = 0;
        if(checkGPS){
            String[] words = road.split(" ");
            String stringPotholePk = potholeService.saveDataByUser(words[0], words[1], words[2], lat, lon);
            s3Service.createFolder(road);
            s3Service.uploadFile(road, image);
        }
    }

    @PatchMapping("/user-upload/{potholePk}")
    public Object changeStateByUserPothole(@PathVariable Long potholePk){
        String result = potholeService.changeStateByUserPothole(potholePk);
        boolean success = result != null;
        @Getter
        class getResponse {
            private final boolean success;
            private final String result;

            getResponse(boolean success, String result) {
                this.success = success;
                this.result = result;
            }
        }
        return new getResponse(success, result);
    }

    @GetMapping("user-upload")
    public Object getPotholesByUserUpload(){
        List<PotholeDto> result = potholeService.getPotholesByUserUpload();
        boolean success = result != null;
        @Getter
        class getResponse {
            private final boolean success;
            private final List<PotholeDto> result;

            getResponse(boolean success, List<PotholeDto> result) {
                this.success = success;
                this.result = result;
            }
        }
        return new getResponse(success, result);
    }

    @GetMapping("user-upload/{potholePk}")
    public Object getPotholeByUserUploadOne(@PathVariable Long potholePk){
        PotholeDto result = potholeService.getPotholeByUserUploadOne(potholePk);
        boolean success = result != null;
        @Getter
        class getResponse {
            private final boolean success;
            private final PotholeDto result;

            getResponse(boolean success, PotholeDto result) {
                this.success = success;
                this.result = result;
            }
        }
        return new getResponse(success, result);
    }

    @GetMapping
    public Object getAllPothole() {
        List<PotholeDto> getAllPotholes = potholeService.getAllPothole();
        boolean success = getAllPotholes != null;
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
        List<PotholeDto> filteredDate = potholeService.chooseGet(data);
        boolean success = filteredDate != null;
        @Getter
        class getResponse {
            private final boolean success;
            private final List<PotholeDto> filteredDate;

            getResponse(boolean success, List<PotholeDto> filteredDate) {
                this.success = success;
                this.filteredDate = filteredDate;
            }
        }
        return new getResponse(success, filteredDate);
    }

    @GetMapping("before-state")
    public Object getState1Potholes() {
        List<PotholeDto> State1Potholes = potholeService.getState1Pothole("미확인");
        boolean success = State1Potholes != null;
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
        boolean success = getState2Potholes != null;
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
        boolean success = getState3Potholes != null;
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

    @PatchMapping
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


    @Getter
    @Setter
    static class boundaryRequest {
        private double latitude;
        private double longitude;
        private double size;
    }
    @PostMapping("search-boundary")
    public Object getBoundary(@RequestBody boundaryRequest data){
        double targetLatitude = data.getLatitude();
        double targetLongitude = data.getLongitude();
        double size = data.getSize();
        List<PotholeDto> result = potholeService.getBoundary(targetLatitude,targetLongitude,size);

        boolean success = result != null;
        @Getter
        class getResponse {
            private final boolean success;
            private final List<PotholeDto> result;

            getResponse(boolean success, List<PotholeDto> result) {
                this.success = success;
                this.result = result;
            }
        }
        return new getResponse(success, result);
    }

    @Getter
    @Setter
    static class traceRequest {
        private String name;
        private int index;
        private double latitude;
        private double longitude;
    }
    @PostMapping("trace-search")
    public Object getBoundary(@RequestBody List<traceRequest> data){
        List<Long> visitedPk = new ArrayList<>();
        List<traceRequest> potholeList = new ArrayList<>();
        int breakFlag = 0;
        int i=-1;
        for (traceRequest data2 : data) {
            i++;
            String name = data2.getName();
            double targetLatitude = data2.getLatitude();
            double targetLongitude = data2.getLongitude();

            List<PotholeDto> result = potholeService.getTraceSearch(targetLatitude,targetLongitude);
            if(!result.isEmpty()){

                for (PotholeDto nowDir : result){
                    if(visitedPk.contains(nowDir.getPotholePk()))continue;
                    traceRequest nowData = new traceRequest();
                    nowData.setName(name);
                    nowData.setLatitude(nowDir.getLatitude());
                    nowData.setLongitude(nowDir.getLongitude());
                    nowData.setIndex(i);
                    potholeList.add(nowData);
                    visitedPk.add(nowDir.getPotholePk());
                }
            }
            if(result==null){
                breakFlag = 1;
                break;
            }
        }

        boolean success = breakFlag == 0;
        @Getter
        class getResponse {
            private final boolean success;
            private final List<traceRequest> potholeList;

            getResponse(boolean success, List<traceRequest> potholeList) {
                this.success = success;
                this.potholeList = potholeList;
            }
        }
        return new getResponse(success, potholeList);
    }

    @DeleteMapping("/{potholePk}")
    public Object deletePothoel(@PathVariable long potholePk){

        Long result = potholeService.deletePothole(potholePk);
        boolean success = result != 0L;
        @Getter
        class getResponse {
            private final boolean success;
            private final Long result;

            getResponse(boolean success, Long result) {
                this.success = success;
                this.result = result;
            }
        }
        return new getResponse(success, result);
    }
}
