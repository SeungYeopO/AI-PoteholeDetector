package com.h2o.poppy.entity;
//package com.example.demo.demo.enttiy;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Entity
@Table(name = "blackbox_video_metadatas")
@Getter
@Setter
public class BlackboxVideoMetadata {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "video_pk", nullable = false, updatable = false)
    private Long videoPk;

    @Column(name = "serial_pk", nullable = false)
    private Long serialPk;

    @Column(name = "detected_at", nullable = true)
    @Temporal(TemporalType.TIMESTAMP)
    private Date detectedAt;

    @Column(name = "latitude", nullable = true)
    private Double latitude;

    @Column(name = "longitude", nullable = true)
    private Double longitude;

    // 생성자
    public BlackboxVideoMetadata() {
    }

    public BlackboxVideoMetadata(Long serialPk, Date detectedAt, Double latitude, Double longitude) {
        this.serialPk = serialPk;
        this.detectedAt = detectedAt;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    // Getter와 Setter는 Lombok을 사용하여 자동 생성될 것입니다.
}
