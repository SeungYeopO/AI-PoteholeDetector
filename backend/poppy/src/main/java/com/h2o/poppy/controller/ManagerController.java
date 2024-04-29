package com.h2o.poppy.controller;

import com.h2o.poppy.entity.Manager;
import com.h2o.poppy.model.manager.ManagerDto;
import com.h2o.poppy.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manager")
public class ManagerController {

    private final ManagerService managerService;

    @Autowired
    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    //전체 유저 읽기
    @GetMapping
    public List<ManagerDto> getAllManager() {
        return managerService.getAllManager();
    }

    // 유저 1명 정보 보기
    @GetMapping("/{managerPk}")
    public ResponseEntity<Manager> getIdManager(@PathVariable Long managerPk) {
        Manager manager = managerService.getIdManager(managerPk);
        return ResponseEntity.ok(manager);
    }

    // 아이디 중복 검사
    @PostMapping("/duplicate-id")
    public boolean DuplicateId(@RequestBody ManagerDto data) {
        boolean result = managerService.duplicateId(data.getLoginId());
        return result;
    }

    // 쓰기
    @PostMapping()
    public long saveData(@RequestBody Manager data) {
        long result = managerService.saveData(data);
        return result;
    }


    //수정
    @PutMapping()
    public int updateData(@RequestBody ManagerDto data) {
        int result = managerService.updateData(data);
        return result;
        // 1 이면 2개다 수정 2 이면 비번만 3이면 전번만 0이면 아무것도 안바꿈
    }

    //삭제
    @DeleteMapping("/{managerPk}")
    public boolean deleteData(@PathVariable Long managerPk) {
        boolean result = managerService.deleteData(managerPk);
        return result;
    }

    @PostMapping("/login")
    public long login(@RequestBody ManagerDto data) {
        long result = managerService.login(data);
        return result;
    }

}

