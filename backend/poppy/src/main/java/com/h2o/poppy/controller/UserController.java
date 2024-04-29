package com.h2o.poppy.controller;

import com.h2o.poppy.entity.User;
import com.h2o.poppy.model.user.UserDto;
import com.h2o.poppy.repository.UserRepository;
import com.h2o.poppy.service.UserService;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        userRepository.saveAll(List.of(
                new User("ssafy", "1", "오승엽", "01012345678"),
                new User("dlek567", "2", "유명렬", "01090123456")
        ));
    }

    //전체 유저 읽기
    @GetMapping
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

    // 유저 1명 정보 보기
    @GetMapping("/{userPk}")
    public User getIdUser(@PathVariable Long userPk) {
        return userService.getIdUser(userPk);
    }

    // 아이디 중복 검사
    @PostMapping("/duplicate-id")
    public Object DuplicateId(@RequestBody UserDto data) {
        boolean result = userService.duplicateId(data.getLoginId());
        @Getter
        class duplicateIdResponse {
            private final boolean result;
            duplicateIdResponse(boolean result) {
                this.result = result;
            }
        }
        return new duplicateIdResponse(result);
    }

    // 쓰기
    @PostMapping
    public Object saveData(@RequestBody User data) {
        long userPk = userService.saveData(data);
        boolean success = userPk > 0; // PK가 0보다 크다면 성공으로 간주

        // 메서드 내 로컬 클래스 정의
        @Getter
        class SaveResponse {
            private final boolean success;
            private final long userPk;
            SaveResponse(boolean success, long userPk) {
                this.success = success;
                this.userPk = userPk;
            }
        }
        // 로컬 클래스 인스턴스 생성 및 반환
        return new SaveResponse(success, userPk);
    }


    //수정
    @PutMapping
    public Object updateData(@RequestBody UserDto data) {
        int userPk = userService.updateData(data);
        // 1 이면 2개다 수정 2 이면 비번만 3이면 전번만 0이면 아무것도 안바꿈
        @Getter
        class UpdateDataResponse {
            private final boolean result;
            UpdateDataResponse(long userPk){
                this.result = userPk != 0;
            }
        }
        return new UpdateDataResponse(userPk);
    }

    //삭제
    @DeleteMapping("/{userPk}")
    public Object deleteData(@PathVariable Long userPk) {
        boolean result = userService.deleteData(userPk);
        @Getter
        class deleteDataResponse{
            private final boolean result;

            deleteDataResponse(boolean result){
                this.result = result;
            }
        }
        return new deleteDataResponse(result);
    }

    @PostMapping("/login")
    public Object login(@RequestBody UserDto data) {
        long userPk = userService.login(data);
        @Getter
        class loginResponse {
            private final boolean result;
            private final long userPk;
            loginResponse(long userPk){
                this.userPk = userPk;
                this.result = userPk != 0;
            }
        }
        return new loginResponse(userPk);
    }
}

