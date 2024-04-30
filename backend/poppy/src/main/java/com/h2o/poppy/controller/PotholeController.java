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

    // 전체 포트홀 읽기
    @GetMapping
    public List<PotholeDto> getAllPothole() {
        return potholeService.getAllPothole();
    }

    // 포트홀 1명 정보 보기
    @GetMapping("/{potholePk}")
    public PotholeDto getIdPothole(@PathVariable Long potholePk) {
        return potholeService.getIdPothole(potholePk);
    }

    

    // 포트홀 등록
    @PostMapping
    public Object saveData(@RequestBody Pothole data) {
        long potholePk = potholeService.saveData(data);
        boolean success = potholePk > 0; // PK가 0보다 크다면 성공으로 간주

        @Getter
        class SaveResponse {
            private final boolean success;
            private final long potholePk;

            SaveResponse(boolean success, long potholePk) {
                this.success = success;
                this.potholePk = potholePk;
            }
        }
        return new SaveResponse(success, potholePk);
    }

    // 수정
    @PutMapping
    public Object updateData(@RequestBody PotholeDto data) {
        long potholePk = potholeService.updateData(data);
        @Getter
        class UpdateDataResponse {
            private final boolean result;

            UpdateDataResponse(long potholePk) {
                this.result = potholePk != 0;
            }
        }
        return new UpdateDataResponse(potholePk);
    }

    // 삭제
    @DeleteMapping("/{potholePk}")
    public Object deleteData(@PathVariable Long potholePk) {
        boolean result = potholeService.deleteData(potholePk);

        @Getter
        class DeleteDataResponse {
            private final boolean result;

            DeleteDataResponse(boolean result){
                this.result = result;
            }
        }
        return new DeleteDataResponse(result);
    }



//    private final PotholeRepository potholeRepository;
//
//    public PotholeController(PotholeRepository potholeRepository) {
//        this.potholeRepository = potholeRepository;
//    }
//
//    @GetMapping
//    public Iterable<Pothole> getAllPotholes() {
//        return potholeRepository.findAll();
//    }
//
//    @GetMapping("/{potholePk}")
//    public ResponseEntity<Pothole> getPotholeById(@PathVariable Long potholePk) {
//        return potholeRepository.findById(potholePk)
//                .map(ResponseEntity::ok)
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
//
//    @PostMapping
//    public Pothole createPothole(@RequestBody Pothole pothole) {
//        return potholeRepository.save(pothole);
//    }
//
//    @DeleteMapping("/{potholePk}")
//    public ResponseEntity<?> deletePothole(@PathVariable Long potholePk) {
//        return potholeRepository.findById(potholePk)
//                .map(pothole -> {
//                    potholeRepository.delete(pothole);
//                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
//                })
//                .orElseGet(() -> ResponseEntity.notFound().build());
//    }
}
