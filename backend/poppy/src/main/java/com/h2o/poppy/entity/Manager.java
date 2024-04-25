package com.h2o.poppy.entity;
//package com.example.demo.demo.enttiy;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
@Entity
@Table(name = "managers")
@Getter
@Setter
public class Manager {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "manager_pk", nullable = false, updatable = false)
    private Long managerPk;

    @Column(name = "login_id", nullable = true, length = 50)
    private String loginId;

    @Column(name = "password", nullable = true, length = 64)
    private String password;

    @Column(name = "manager_name", nullable = true, length = 255)
    private String managerName;

    @Column(name = "phone_number", nullable = true, length = 20)
    private String phoneNumber;

    // 생성자
    public Manager() {
    }

    public Manager(String loginId, String password, String managerName, String phoneNumber) {
        this.loginId = loginId;
        this.password = password;
        this.managerName = managerName;
        this.phoneNumber = phoneNumber;
    }

    // Getter와 Setter는 Lombok을 사용하여 자동 생성될 것입니다.
}
