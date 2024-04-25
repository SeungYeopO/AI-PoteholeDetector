package com.h2o.poppy.entity;
//ackage com.example.demo.demo.enttiy;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "serial_lists")
@Getter
@Setter
public class SerialList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "serial_pk", nullable = false, updatable = false)
    private Long serialPk;

    @Column(name = "serial_number", length = 20)
    private String serialNumber;

    // 생성자
    public SerialList() {
    }

    public SerialList(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    // Getter와 Setter는 Lombok을 사용하여 자동 생성될 것입니다.
}
