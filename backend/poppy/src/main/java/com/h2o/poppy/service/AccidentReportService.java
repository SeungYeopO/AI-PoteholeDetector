package com.h2o.poppy.service;

import com.h2o.poppy.entity.BlackboxVideoMetadata;
import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.entity.User;
import com.h2o.poppy.entity.AccidentReport;
import com.h2o.poppy.model.accidentreport.AccidentReportJoinMetaDataDto;
import com.h2o.poppy.model.pothole.PotholeDto;
import com.h2o.poppy.repository.UserRepository;
import com.h2o.poppy.repository.AccidentReportRepository;
import com.h2o.poppy.repository.PotholeRepository;
import com.h2o.poppy.repository.BlackboxVideoMetadataRepository;
import com.h2o.poppy.model.accidentreport.AccidentReportDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
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
                Date date = data.getReportDate();
                String state = "미확인";
                String rejectionReason = data.getRejectionReason();

                User user = userRepository.findById(userPk).orElse(null);
                Pothole pothole = potholeRepository.findById(potholePk).orElse(null);
                BlackboxVideoMetadata blackboxVideoMetadata = blackboxVideoMetadataRepository.findById(blackboxVideoMetadataPk).orElse(null);
                System.out.println(blackboxVideoMetadata);
                if (user != null && pothole != null && blackboxVideoMetadata != null) {
                    AccidentReport accidentReport = new AccidentReport(user, pothole, blackboxVideoMetadata, context, name, date,state,rejectionReason);
                    accidentReportRepository.save(accidentReport);
                    return new AccidentReportDto(accidentReport.getReportPk(), user.getUserPk(),pothole.getPotholePk(), blackboxVideoMetadata.getVideoPk(),context,name,date,state,rejectionReason);
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


    // 유저 번호로 get
    public List<AccidentReportJoinMetaDataDto> getAccident(Long userPk) {
        try {
            User user = userRepository.findById(userPk).orElse(null);
            if (user != null) {
                List<AccidentReportJoinMetaDataDto> reports = accidentReportRepository.getAccidentReportInfoByUserId(userPk);
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


    // report 번호로 get
    public AccidentReportJoinMetaDataDto getAccidentReportPk(Long reportPk) {
        try {
            AccidentReportJoinMetaDataDto reports = accidentReportRepository.getAccidentReportInfoByReportPk(reportPk);
            return reports;
        } catch (Exception e) {
            // handle any exception that occurs during data retrieval
            e.printStackTrace();
            return null;
        }
    }



    // 상태에 따른 get
    public List<AccidentReportJoinMetaDataDto> getState(String nowState){
        try{
            List<AccidentReportJoinMetaDataDto> accidentReportJoinMetaDataDto;
            if(nowState.equals("미확인")){
                accidentReportJoinMetaDataDto = accidentReportRepository.getAccidentReportInfoByNoCheck("미확인");
            }
            else{
                accidentReportJoinMetaDataDto =  accidentReportRepository.getAccidentReportInfoByCheck("미확인");
            }
            return accidentReportJoinMetaDataDto;
        }catch (Exception e){
            return null;
        }
    }

    // 날짜 필터링 조회
    public List<AccidentReportDto> getDate(Date targetDate){
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(targetDate); // Date 객체를 Calendar로 설정

        int year = calendar.get(Calendar.YEAR); // 년도 추출
        int month = calendar.get(Calendar.MONTH) + 1; // 월 추출 (월은 0부터 시작하므로 +1)
        int day = calendar.get(Calendar.DAY_OF_MONTH); // 일 추출

        try{
            List<AccidentReportDto> accidentReportDto = accidentReportRepository.getAccidentReportInfoByDate(year,month,day);
            return accidentReportDto;
        }catch (Exception e){
            return null;
        }
    }


    // 상태 변경
    public String changeState(AccidentReportDto data){
        long nowAccidentReportPk = data.getReportPk();
        String changeState = data.getState();
        try{
            if(changeState.equals("반려")){
                String rejectReason = data.getRejectionReason();
                accidentReportRepository.updateState(nowAccidentReportPk,changeState,rejectReason);
            }
            else{
                accidentReportRepository.updateState(nowAccidentReportPk,changeState,null);
            }
            return changeState;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    // 비디오 pk로 포트홀 조회
    public List<PotholeDto> getPotholeList(Long videoPk){
        try{
            //List<PotholeDto> potholeList = potholeRepository.findPothlesbyVideoPk(videoPk);
            List<PotholeDto> potholeList = potholeRepository.findPothlesbyVideoPk(videoPk);
            return potholeList;
        }catch (Exception e){
            return null;
        }
    }
}
