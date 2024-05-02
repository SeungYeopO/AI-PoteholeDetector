package com.h2o.poppy.service;

import com.h2o.poppy.entity.BlackboxVideoMetadata;
import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.entity.User;
import com.h2o.poppy.entity.AccidentReport;
import com.h2o.poppy.repository.UserRepository;
import com.h2o.poppy.repository.AccidentReportRepository;
import com.h2o.poppy.repository.PotholeRepository;
import com.h2o.poppy.repository.BlackboxVideoMetadataRepository;
import com.h2o.poppy.model.accidentreport.AccidentReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccidentReportService {

    private final AccidentReportRepository accidentReportRepository;
    private final UserRepository userRepository;
    private final PotholeRepository potholeRepository;
    private final BlackboxVideoMetadataRepository blackboxVideoMetadataRepository;

    @Autowired
    public AccidentReportService(AccidentReportRepository accidentReportRepository,UserRepository userRepository,PotholeRepository potholeRepository,BlackboxVideoMetadataRepository blackboxVideoMetadataRepository) {
        this.accidentReportRepository = accidentReportRepository;
        this.userRepository = userRepository;
        this.potholeRepository = potholeRepository;
        this.blackboxVideoMetadataRepository = blackboxVideoMetadataRepository;
    }


    public AccidentReportDto saveData(AccidentReportDto data) {
        try{
            long reportPk = data.getReportPk();
            return null;
        }catch (Exception e){
            try {
                long userPk = data.getUserPk();
                long potholePk = data.getPotholePk();
                long blackboxVideoMetadataPk = data.getVideoPk();
                String context = data.getReportContent();
                String name = data.getReportName();
                boolean is_process = data.getIsProcess();

                User user = userRepository.findById(userPk).orElse(null);
                Pothole pothole = potholeRepository.findById(potholePk).orElse(null);
                BlackboxVideoMetadata blackboxVideoMetadata = blackboxVideoMetadataRepository.findById(blackboxVideoMetadataPk).orElse(null);
                System.out.println(blackboxVideoMetadata);
                if (user != null && pothole != null && blackboxVideoMetadata != null) {
                    AccidentReport accidentReport = new AccidentReport(user, pothole, blackboxVideoMetadata, context, name, is_process);
                    accidentReportRepository.save(accidentReport);
                    return new AccidentReportDto(accidentReport.getReportPk(), user.getUserPk(),pothole.getPotholePk(), blackboxVideoMetadata.getVideoPk(),context,name,is_process);
                } else {
                    // handle case where user, pothole, or blackboxVideoMetadata is not found
                    return null;
                }
            } catch (Exception e1) {
                // handle any exception that occurs during data processing
                //e.printStackTrace();
                return null;
            }
        }
    }


    public List<AccidentReportDto> getAccident(Long userPk) {
        try {
            User user = userRepository.findById(userPk).orElse(null);
            if (user != null) {
                List<AccidentReportDto> reports = accidentReportRepository.getAccidentReportInfoByUserId(userPk);
                return reports;
            } else {
                // handle case where user is not found
                return null;
            }
        } catch (Exception e) {
            // handle any exception that occurs during data retrieval
            e.printStackTrace();
            return null;
        }
    }

}
