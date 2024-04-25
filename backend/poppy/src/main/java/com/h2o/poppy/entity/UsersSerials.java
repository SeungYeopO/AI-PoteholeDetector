package com.h2o.poppy.entity;
//package com.example.demo.demo.enttiy;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "users_serials")
@Getter
@Setter
public class UsersSerials {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_serial_pk", nullable = false, updatable = false)
    private Long userSerialPk;

    @Column(name = "user_pk", nullable = false)
    private Long userPk;

    @Column(name = "serial_pk", nullable = false)
    private Long serialPk;

    // 생성자
    public UsersSerials() {
    }

    public UsersSerials(Long userPk, Long serialPk) {
        this.userPk = userPk;
        this.serialPk = serialPk;
    }

    // Getter와 Setter는 Lombok을 사용하여 자동 생성될 것입니다.
}
