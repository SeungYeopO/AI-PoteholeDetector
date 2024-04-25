package com.h2o.poppy.service;

import com.h2o.poppy.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RedisService {

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    private static final String USER_CACHE = "user";

    public Optional<User> getUserById(Long id) {
        User user = (User) redisTemplate.opsForHash().get(USER_CACHE, id);
        return Optional.ofNullable(user);
    }

    public void saveUser(User user) {
        redisTemplate.opsForHash().put(USER_CACHE, user.getUserPk(), user);
    }
}
