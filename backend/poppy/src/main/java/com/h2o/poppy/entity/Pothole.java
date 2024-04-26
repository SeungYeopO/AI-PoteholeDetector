package com.h2o.poppy.entity;

import java.io.Serial;
import java.io.Serializable;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "potholes")
@Getter
@Setter
public class Pothole implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

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

    @OneToMany(mappedBy = "potholePk", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<AccidentReport> accidentReports;

    // 생성자
    public Pothole() {
    }

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
