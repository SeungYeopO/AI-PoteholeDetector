package com.h2o.poppy.model.pothole;

import com.h2o.poppy.entity.AccidentReport;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter
public class PotholeDto {

    private Long potholePk;
    private Double latitude;
    private Double longitude;
    private Boolean isPothole;
    private Boolean isRepair;
    private String province;
    private String city;
    private String street;
    private Date detectedAt;

    public PotholeDto() {
        // 매개변수 없는 생성자 내용
    }

    public PotholeDto(Long potholePk, Double latitude, Double longitude, Boolean isPothole, Boolean isRepair,String province, String city,String street,Date detectedAt) {
        this.potholePk = potholePk;
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
