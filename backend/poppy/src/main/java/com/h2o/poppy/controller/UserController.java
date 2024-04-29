package com.h2o.poppy.controller;

import com.h2o.poppy.entity.User;
import com.h2o.poppy.model.user.UserDto;
import com.h2o.poppy.repository.UserRepository;
import com.h2o.poppy.service.UserSerivce;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserSerivce userService;

    @Autowired
    public UserController(UserSerivce userService, UserRepository userRepository) {
        this.userService = userService;
        userRepository.saveAll(List.of(
                new User("ssafy", "1", "오승엽", "01012345678"),
                new User("dlek567", "2", "유명렬", "01090123456")
        ));
    }

    //전체 유저 읽기
    @GetMapping
    public List<UserDto> getAllUser() {
        return userService.getAllUser();
    }

    // 유저 1명 정보 보기
    @GetMapping("/{userPk}")
    public ResponseEntity<User> getIduser(@PathVariable Long userPk) {
        User user = userService.getIdUser(userPk);
        return ResponseEntity.ok(user);
    }

    // 아이디 중복 검사
    @PostMapping("/duplicate-id")
    public boolean DuplicateId(@RequestBody UserDto data) {
        boolean result = userService.duplicateId(data.getLoginId());
        return result;
    }

    // 쓰기
    @PostMapping()
    public long saveData(@RequestBody User data) {
        long result = userService.saveData(data);
        return result;
    }


    //수정
    @PutMapping()
    public int updateData(@RequestBody UserDto data) {
        int result = userService.updateData(data);
        return result;
        // 1 이면 2개다 수정 2 이면 비번만 3이면 전번만 0이면 아무것도 안바꿈
    }

    //삭제
    @DeleteMapping("/{userPk}")
    public boolean deleteData(@PathVariable Long userPk) {
        boolean result = userService.deleteData(userPk);
        return result;
    }

    @PostMapping("/login")
    public long login(@RequestBody UserDto data) {
        long result = userService.login(data);
        return result;
    }

}

