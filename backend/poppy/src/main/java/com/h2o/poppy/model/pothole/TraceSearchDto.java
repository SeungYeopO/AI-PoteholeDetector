package com.h2o.poppy.model.pothole;

import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class TraceSearchDto {

    private Double latitude;
    private Double longitude;

    public TraceSearchDto() {
        // 매개변수 없는 생성자 내용
    }

    public TraceSearchDto(Double latitude, Double longitude) {
        this.latitude = latitude;
        this.longitude = longitude;
    }

}
