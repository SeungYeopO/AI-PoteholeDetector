package com.h2o.poppy.controller;

import com.h2o.poppy.entity.User;
import com.h2o.poppy.model.user.UserDto;
import com.h2o.poppy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import lombok.Getter;
import java.util.List;
import java.util.Objects;

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
    public List<UserDto> getAllUser() {
        return userService.getAllUser();
    }

    // 유저 1명 정보 보기
    @GetMapping("/{userPk}")
    public UserDto getIdUser(@PathVariable Long userPk) {
        return userService.getIdUser(userPk);
    }

    // 아이디 중복 검사
    @PostMapping("/duplicate-id")
    public Object duplicateId(@RequestBody UserDto data) {
        @Getter
        class duplicateIdResponse {
            private final boolean result;

            duplicateIdResponse(boolean result) {
                this.result = result;
            }
        }
        boolean result = userService.duplicateId(data.getLoginId());

        return new duplicateIdResponse(result);
    }

    // 유저 회원가입
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
    @PutMapping("/{userPk}")
    public Object updateData(@PathVariable long userPk, @RequestBody UserDto data) {
        data.setUserPk(userPk);
        UserDto userDto = userService.getIdUser(userPk);
        if(!Objects.equals(userDto.getUserName(), data.getUserName())) {
            return "invalid value";
        }
        int state = userService.updateData(data);
        @Getter
        class UpdateDataResponse {
            private final boolean result;

            UpdateDataResponse(int state) {
                this.result = state != 0;
            }
        }
        return new UpdateDataResponse(state);
    }

    // 삭제
    @DeleteMapping("/{userPk}")
    public Object deleteData(@PathVariable Long userPk) {
        boolean result = userService.deleteData(userPk);

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
