package com.h2o.poppy.controller;

import com.h2o.poppy.entity.User;
import com.h2o.poppy.repository.UserRepository;
import com.h2o.poppy.service.RedisService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository userRepository;

    private final RedisService redisService;

    public UserController(UserRepository userRepository, RedisService redisService){
        this.userRepository = userRepository;
        this.redisService = redisService;
        userRepository.saveAll(List.of(
                new User("ssafy", "1", "오승엽", "01012345678"),
                new User("dlek567", "2", "유명렬", "01090123456")
        ));
    }

    @GetMapping
    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{userPk}")
    public ResponseEntity<User> getUserById(@PathVariable Long userPk){
        Optional<User> userFromRedis = redisService.getUserById(userPk);
        return userFromRedis.map(ResponseEntity::ok).orElseGet(()->userRepository.findById(userPk)
                .map(user -> {
                    redisService.saveUser(user);
                    return ResponseEntity.ok(user);
                })
                .orElseGet(()-> ResponseEntity.notFound().build()));
    }

    @PatchMapping("/{userPk}")
    public ResponseEntity<User> updateUserPartially(@PathVariable Long userPk, @RequestBody Map<String, Object> updates) {
        return userRepository.findById(userPk)
                .map(user -> {
                    if (updates.containsKey("password")) {
                        user.setPassword((String) updates.get("password"));
                    }
                    if (updates.containsKey("phoneNumber")) {
                        user.setPhoneNumber((String) updates.get("phoneNumber"));
                    }
                    // 추가적으로 업데이트할 필드를 여기에 넣습니다.

                    User updatedUser = userRepository.save(user);
                    redisService.saveUser(updatedUser);
                    return ResponseEntity.ok(updatedUser);
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public User postUser(@RequestBody User user){
        return userRepository.save(user);
    }

    @DeleteMapping("/{userPk}")
    public ResponseEntity<?> deleteCoffee(@PathVariable Long userPk) {
        return userRepository.findById(userPk)
                .map(user -> {
                    userRepository.delete(user);
                    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
                })
                .orElseGet(()->ResponseEntity.notFound().build());
    }

}
