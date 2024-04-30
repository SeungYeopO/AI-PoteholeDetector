package com.h2o.poppy.model.accidentreport;


import com.h2o.poppy.entity.BlackboxVideoMetadata;
import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.entity.User;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AccidentReportDto {

    private Long reportPk;
    private Long userPk;
    private Long potholePk;
    private Long videoPk;
    private String reportName;
    private String reportContent;
    private Boolean isProcess;

    // Constructors

    public AccidentReportDto(Long reportPk, Long userPk, Long potholePk, Long videoPk, String reportContent, String reportName, Boolean isProcess) {
        this.reportPk = reportPk;
        this.userPk = userPk;
        this.potholePk = potholePk;
        this.videoPk = videoPk;
        this.reportName = reportName;
        this.reportContent = reportContent;
        this.isProcess = isProcess;
    }

}
