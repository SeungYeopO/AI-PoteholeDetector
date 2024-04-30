package com.h2o.poppy.controller;

import com.h2o.poppy.entity.User;
import com.h2o.poppy.model.user.UserDto;
import com.h2o.poppy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import lombok.Getter;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 전체 유저 읽기
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
    public Object duplicateId(@RequestBody UserDto data) {
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

        @Getter
        class SaveResponse {
            private final boolean success;
            private final long userPk;

            SaveResponse(boolean success, long userPk) {
                this.success = success;
                this.userPk = userPk;
            }
        }
        return new SaveResponse(success, userPk);
    }

    // 수정
    @PutMapping
    public Object updateData(@RequestBody UserDto data) {
        long userPk = userService.updateData(data);
        @Getter
        class UpdateDataResponse {
            private final boolean result;

            UpdateDataResponse(long userPk) {
                this.result = userPk != 0;
            }
        }
        return new UpdateDataResponse(userPk);
    }

    // 삭제
    @DeleteMapping("/{userPk}")
    public boolean deleteData(@PathVariable Long userPk) {
        return userService.deleteData(userPk);
    }

    // 로그인
    @PostMapping("/login")
    public Object login(@RequestBody UserDto data) {
        long userPk = userService.login(data);
        @Getter
        class LoginResponse {
            private final boolean result;
            private final long userPk;

            LoginResponse(long userPk) {
                this.userPk = userPk;
                this.result = userPk != 0;
            }
        }
        return new LoginResponse(userPk);
    }
}
