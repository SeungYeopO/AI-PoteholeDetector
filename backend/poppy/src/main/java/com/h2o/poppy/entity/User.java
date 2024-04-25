package com.h2o.poppy.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Users")
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_pk", nullable = false, updatable = false)
    private Long userPk;

    @Column(name = "login_id", nullable = false, length = 50)
    private String loginId;

    @Column(name = "password", nullable = false, length = 64)
    private String password;

    @Column(name = "user_name", nullable = false, length = 255)
    private String userName;

    @Column(name = "phone_number", nullable = true, length = 20)
    private String phoneNumber;

    // 기본 생성자
    public User() {
    }

    public User(String loginId, String password, String userName, String phoneNumber) {
        this.loginId = loginId;
        this.password = password;
        this.userName = userName;
        this.phoneNumber = phoneNumber;
    }
}
