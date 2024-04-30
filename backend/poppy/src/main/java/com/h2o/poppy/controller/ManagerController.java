package com.h2o.poppy.controller;

import com.h2o.poppy.entity.Manager;
import com.h2o.poppy.model.manager.ManagerDto;
import com.h2o.poppy.service.ManagerService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/managers")
public class ManagerController {

    private final ManagerService managerService;

    @Autowired
    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    //전체 매니저 읽기
    @GetMapping
    public List<ManagerDto> getAllManager() {
        return managerService.getAllManager();
    }

    // 매니저 1명 정보 보기
    @GetMapping("/{managerPk}")
    public Manager getIdManager(@PathVariable Long managerPk) {
        return managerService.getIdManager(managerPk);
    }

    // 아이디 중복 검사
    @PostMapping("/duplicate-id")
    public Object duplicateId(@RequestBody ManagerDto data) {
        boolean result = managerService.duplicateId(data.getLoginId());
        @Getter
        class duplicateIdResponse {
            private final boolean result;

            duplicateIdResponse(boolean result) {
                this.result = result;
            }
        }
        return new duplicateIdResponse(result);
    }

    // 관리자 회원가입
    @PostMapping
    public Object saveData(@RequestBody Manager data) {
        long managerPk = managerService.saveData(data);
        boolean success = managerPk > 0; // PK가 0보다 크다면 성공으로 간주

        @Getter
        class SaveResponse {
            private final boolean success;
            private final long managerPk;

            SaveResponse(boolean success, long managerPk) {
                this.success = success;
                this.managerPk = managerPk;
            }
        }
        return new SaveResponse(success, managerPk);
    }

    //수정
    @PutMapping
    public Object updateData(@RequestBody ManagerDto data) {
        long managerPk = managerService.updateData(data);
        @Getter
        class UpdateDataResponse {
            private final boolean result;

            UpdateDataResponse(long managerPk) {
                this.result = managerPk != 0;
            }
        }
        return new UpdateDataResponse(managerPk);
    }

    //삭제
    @DeleteMapping("/{managerPk}")
    public Object deleteData(@PathVariable Long userPk) {
        boolean result = managerService.deleteData(userPk);

        @Getter
        class DeleteDataResponse {
            private final boolean result;

            DeleteDataResponse(boolean result){
                this.result = result;
            }
        }
        return new DeleteDataResponse(result);
    }

    // 로그인
    @PostMapping("/login")
    public Object login(@RequestBody ManagerDto data) {
        long managerPk = managerService.login(data);
        @Getter
        class LoginResponse {
            private final boolean result;
            private final long managerPk;

            LoginResponse(long managerPk) {
                this.managerPk = managerPk;
                this.result = managerPk != 0;
            }
        }
        return new LoginResponse(managerPk);
    }
}
