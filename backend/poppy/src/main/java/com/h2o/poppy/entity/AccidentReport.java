package com.h2o.poppy.entity;

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

    @ManyToOne
    @JoinColumn(name = "user_pk", nullable = false)
    private User userPk;

    @ManyToOne
    @JoinColumn(name = "pothole_pk", nullable = false)
    private Pothole potholePk;

    @OneToOne
    @JoinColumn(name = "video_pk", nullable = false)
    private BlackboxVideoMetadata videoPk;

    @Column(name = "report_content", length = 255)
    private String reportContent;

    @Column(name = "is_process")
    private Boolean isProcess;

    // 생성자
    public AccidentReport() {
    }

    public AccidentReport(User userPk, Pothole potholePk, BlackboxVideoMetadata videoPk, String reportContent, Boolean isProcess) {
        this.userPk = userPk;
        this.potholePk = potholePk;
        this.videoPk = videoPk;
        this.reportContent = reportContent;
        this.isProcess = isProcess;
    }

}
