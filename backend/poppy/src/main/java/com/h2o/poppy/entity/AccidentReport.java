package com.h2o.poppy.entity;
//package com.example.demo.demo.enttiy;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "accident_report")
@Getter
@Setter
public class AccidentReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "report_pk", nullable = false, updatable = false)
    private Long reportPk;

    @Column(name = "user_pk", nullable = false)
    private Long userPk;

    @Column(name = "pothole_pk", nullable = false)
    private Long potholePk;

    @Column(name = "video_pk", nullable = false)
    private Long videoPk;

    @Column(name = "report_content", length = 255)
    private String reportContent;

    @Column(name = "is_process")
    private Boolean isProcess;

    // 생성자
    public AccidentReport() {
    }

    public AccidentReport(Long userPk, Long potholePk, Long videoPk, String reportContent, Boolean isProcess) {
        this.userPk = userPk;
        this.potholePk = potholePk;
        this.videoPk = videoPk;
        this.reportContent = reportContent;
        this.isProcess = isProcess;
    }

    // Getter와 Setter는 Lombok을 사용하여 자동 생성될 것입니다.
}
