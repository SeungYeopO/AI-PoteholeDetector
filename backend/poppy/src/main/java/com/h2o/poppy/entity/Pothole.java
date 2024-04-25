package com.h2o.poppy.entity;
//package com.example.demo.demo.enttiy;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "potholes")
@Getter
@Setter
public class Pothole {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "pothole_pk", nullable = false, updatable = false)
    private Long potholePk;

    @Column(name = "latitude", nullable = true)
    private Double latitude;

    @Column(name = "longitude", nullable = true)
    private Double longitude;

    @Column(name = "is_pothole", nullable = true)
    private Boolean isPothole;

    @Column(name = "is_repair", nullable = true)
    private Boolean isRepair;

    @Column(name = "province", nullable = true, length = 10)
    private String province;

    @Column(name = "city", nullable = true, length = 10)
    private String city;

    @Column(name = "street", nullable = true, length = 50)
    private String street;

    @Column(name = "detected_at", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date detectedAt;

    // 생성자
    public Pothole() {
    }

    // Getter와 Setter는 Lombok을 사용하여 자동 생성될 것입니다.

    public Pothole(Double latitude, Double longitude, Boolean isPothole, Boolean isRepair, String province, String city, String street, Date detectedAt) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.isPothole = isPothole;
        this.isRepair = isRepair;
        this.province = province;
        this.city = city;
        this.street = street;
        this.detectedAt = detectedAt;
    }
}
