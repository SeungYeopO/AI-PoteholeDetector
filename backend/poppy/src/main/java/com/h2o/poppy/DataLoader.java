package com.h2o.poppy;

import com.h2o.poppy.entity.*;
import com.h2o.poppy.model.user.UserDto;
import com.h2o.poppy.repository.*;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ManagerRepository managerRepository;
    @Autowired
    private SerialListRepository serialListRepository;
    @Autowired
    private UsersSerialsRepository usersSerialsRepository;
    @Autowired
    private PotholeRepository potholeRepository;
    @Autowired
    private BlackboxVideoMetadataRepository blackboxVideoMetadataRepository;
    @Autowired
    private AccidentReportRepository accidentReportRepository;

    @Override
    public void run(String... args) throws Exception {
        loadDummyData();
    }

    private void loadDummyData() {
        userRepository.saveAll(List.of(
                new User("ssafy", "1", "오승엽", "01012345678"),
                new User("dlek567", "2", "유명렬", "01090123456"),
                new User("gggg", "2", "김정은", "01095253456")));

        managerRepository.saveAll(List.of(
                new Manager("samsung", "1", "황유경", "01012345678"),
                new Manager("dlek567", "2", "유명렬", "01090123456")));

        serialListRepository.saveAll(List.of(
                new SerialList("BB12345678"),
                new SerialList("BB47125156"),
                new SerialList("BB98765432")));

        User user1 = userRepository.findById(1L).orElse(null);
        User user2 = userRepository.findById(2L).orElse(null);
        User user3 = userRepository.findById(3L).orElse(null);
        SerialList serial1 = serialListRepository.findById(1L).orElse(null);
        SerialList serial2 = serialListRepository.findById(2L).orElse(null);
        SerialList serial3 = serialListRepository.findById(3L).orElse(null);

        usersSerialsRepository.saveAll(List.of(
                new UsersSerials(user1, serial1),
                new UsersSerials(user3, serial3),
                new UsersSerials(user2, serial2)));

        Date now = new Date();
        Date date1 = new Date(2022 - 1900, 3, 25, 14, 30, 0);
        Date date2 = new Date(2022 - 1900, 5, 46, 22, 30, 0); 
        Date date3 = new Date(2024 - 1900, 3, 10, 22, 30, 0); 
        Date date4 = new Date(2024 - 1900, 4, 16, 22, 30, 0); 

        potholeRepository.saveAll(List.of(
                new Pothole(35.202370, 126.810139, true, "광주", "광산구", "하남산단6번로", date1, "미확인",null,null,null,null),
                new Pothole(37.501475, 127.039515, true, "서울", "강남구", "테헤란로", date2, "미확인",null,null,null,null),
                new Pothole(33.555664, 126.796320, true, "제주", "제주시", "해맞이해안로", date2, "미확인",null,null,null,null),
                new Pothole(38.181005, 128.549175, true, "강원도", "속초시", "동해 고속도로", date2, "미확인",null,null,null,null),
                new Pothole(35.1990838,  129.2066338, true, "부산", "기장군", "읍내로", date2, "공사완료",date3,null,now,null),
                new Pothole(35.897045,  128.851677, true, "경상북도", "경산시", "대구대로", date2, "공사완료",date3,null,now,null),
                new Pothole(37.467655,  126.946325, true, "서울", "관악구", "관악로", date2, "공사완료",date3,null,now,null),
                new Pothole(36.334859, 126.620023 , true, "충청남도", "보령시", "옥마로", date2, "공사완료",date3,null,now,null),
                new Pothole(36.102575,  127.499691, true, "충청남도", "금산군", "인삼광장로", date2, "공사완료",date3,null,now,null),
                new Pothole(37.880579, 127.729987, true, "강원도", "춘천시", "금강로", date2, "미확인",null,null,null,null),
                new Pothole(37.456733, 126.705120, false, "인천", "남동구", "정각로", date2, "확인전",now,date4,null,null),
                new Pothole(36.327580, 126.427247, false, "대전", "중구", "대종로", date2, "확인전",now,date4,null,null),
                new Pothole(35.216768, 128.142013, true, "경상남도", "진주시", "금산로", date2, "공사중",now,date4,null,null),
                new Pothole(37.130705,128.537282 , true, "강원도", "영월군", "영월동로", date2, "공사중",now,date4,null,null),
                new Pothole(36.098999 ,127.490736 , true, "충청남도", "금산군", "비단로", date2, "공사중",now,date4,null,null),
                new Pothole(36.099268 ,127.483175 , false, "충청남도", "금산군", "비단로", date2, "확인전",now,date4,null,"얀녕하세요얀녕하세요얀녕하세요얀녕하세요얀녕하세요얀녕하세요"),
                new Pothole(36.642488, 127.489675, false, "충청북도", "청주시", "상당로", date2, "확인전",now,date4,null,"ssfaegsserhaseaeuhgasehgoerhgorhgerhthjrshdthtjtjtjr")));

        SerialList serialList1 = serialListRepository.findById(1L).orElse(null);
        SerialList serialList2 = serialListRepository.findById(2L).orElse(null);
        SerialList serialList3 = serialListRepository.findById(3L).orElse(null);

        if (serialList1 != null && serialList2 != null && serialList3 != null) {
            blackboxVideoMetadataRepository.saveAll(List.of(
                    new BlackboxVideoMetadata(serialList1, now, 35.202370, 126.810139, null),
                    new BlackboxVideoMetadata(serialList1, now, 33.555664, 126.796320, null),
                    new BlackboxVideoMetadata(serialList1, now, 38.181005, 128.549175, null),
                    new BlackboxVideoMetadata(serialList1, now, 35.1990838,  129.2066338, null),
                    new BlackboxVideoMetadata(serialList1, now, 35.897045,  128.851677, null),
                    new BlackboxVideoMetadata(serialList1, now, 37.467655,  126.946325, null),
                    new BlackboxVideoMetadata(serialList1, now, 36.334859, 126.620023, null),
                    new BlackboxVideoMetadata(serialList2, now, 36.102575,  127.499691, null),
                    new BlackboxVideoMetadata(serialList2, now, 37.456733, 126.705120, null),
                    new BlackboxVideoMetadata(serialList2, now, 36.327580, 126.427247, null),
                    new BlackboxVideoMetadata(serialList2, now, 35.216768, 128.142013, null),
                    new BlackboxVideoMetadata(serialList3, now, 37.130705,128.537282, null),
                    new BlackboxVideoMetadata(serialList3, now, 36.642488, 127.489675, null),
                    new BlackboxVideoMetadata(serialList2, now, 37.880579, 127.729987, null),
                    new BlackboxVideoMetadata(serialList1, now, 36.098999, 127.490736, null),
                    new BlackboxVideoMetadata(serialList2, now, 36.099268, 127.483175, null),
                    new BlackboxVideoMetadata(serialList2, now, 36.092268, 127.483175, null),
                    new BlackboxVideoMetadata(serialList2, now, 37.501475, 127.039515, null)));
        }

        Pothole pothole1 = potholeRepository.findById(1L).orElse(null);
        Pothole pothole2 = potholeRepository.findById(2L).orElse(null);
        Pothole pothole3 = potholeRepository.findById(3L).orElse(null);
        Pothole pothole4 = potholeRepository.findById(4L).orElse(null);
        Pothole pothole5 = potholeRepository.findById(5L).orElse(null);
        Pothole pothole6 = potholeRepository.findById(6L).orElse(null);
        Pothole pothole7 = potholeRepository.findById(7L).orElse(null);
        Pothole pothole8 = potholeRepository.findById(8L).orElse(null);
        Pothole pothole9 = potholeRepository.findById(9L).orElse(null);
        Pothole pothole10 = potholeRepository.findById(10L).orElse(null);
        Pothole pothole11 = potholeRepository.findById(11L).orElse(null);
        Pothole pothole12 = potholeRepository.findById(12L).orElse(null);
        Pothole pothole13 = potholeRepository.findById(13L).orElse(null);
        Pothole pothole14 = potholeRepository.findById(14L).orElse(null);
        Pothole pothole15 = potholeRepository.findById(15L).orElse(null);

        BlackboxVideoMetadata BlackboxVideoMetadata1 = blackboxVideoMetadataRepository.findById(1L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata2 = blackboxVideoMetadataRepository.findById(2L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata3 = blackboxVideoMetadataRepository.findById(3L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata4 = blackboxVideoMetadataRepository.findById(4L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata5 = blackboxVideoMetadataRepository.findById(5L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata6 = blackboxVideoMetadataRepository.findById(6L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata7 = blackboxVideoMetadataRepository.findById(7L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata8 = blackboxVideoMetadataRepository.findById(8L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata9 = blackboxVideoMetadataRepository.findById(9L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata10 = blackboxVideoMetadataRepository.findById(10L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata11 = blackboxVideoMetadataRepository.findById(11L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata12 = blackboxVideoMetadataRepository.findById(12L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata13 = blackboxVideoMetadataRepository.findById(13L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata14 = blackboxVideoMetadataRepository.findById(14L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata15 = blackboxVideoMetadataRepository.findById(15L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata16 = blackboxVideoMetadataRepository.findById(16L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata17 = blackboxVideoMetadataRepository.findById(17L).orElse(null);

        accidentReportRepository.saveAll(List.of(
                new AccidentReport(user1, pothole1, BlackboxVideoMetadata1, "1번제목","1번내용", date1, "미확인",null),
                new AccidentReport(user1, pothole2, BlackboxVideoMetadata2, "2번제목","2번내용", date1, "미확인",null),
                new AccidentReport(user1, pothole3, BlackboxVideoMetadata3, "3번제목","3번내용", date1, "미확인",null),
                new AccidentReport(user1, pothole4, BlackboxVideoMetadata4, "4번제목","4번내용", date1, "미확인",null),
                new AccidentReport(user1, pothole5, BlackboxVideoMetadata5, "5번제목","5번내용", date1, "미확인",null),
                new AccidentReport(user1, pothole6, BlackboxVideoMetadata6, "6번제목","6번내용", date1, "미확인",null),
                new AccidentReport(user1, pothole7, BlackboxVideoMetadata7, "7번제목","7번내용", date2, "반려","그냥"),
                new AccidentReport(user2, pothole8, BlackboxVideoMetadata8, "8번제목","8번내용", date2, "반려","그냥"),
                new AccidentReport(user2, pothole9, BlackboxVideoMetadata9, "9번제목","9번내용", date2, "반려","그냥"),
                new AccidentReport(user2, pothole10, BlackboxVideoMetadata10, "10번제목","10번내용", date2, "반려","그냥"),
                new AccidentReport(user2, pothole11, BlackboxVideoMetadata11, "11번제목","11번내용", date2, "미확인",null),
                new AccidentReport(user2, pothole12, BlackboxVideoMetadata12, "12번제목","12번내용", date2, "보상완료",null),
                new AccidentReport(user2, pothole13, BlackboxVideoMetadata13, "13번제목","13번내용", date2, "보상완료",null),
                new AccidentReport(user2, pothole14, BlackboxVideoMetadata14, "14번제목","14번내용", date2, "보상완료",null),
                new AccidentReport(user2, pothole14, BlackboxVideoMetadata15, "15번제목","15번내용", date2, "보상완료",null),
                new AccidentReport(user2, pothole14, BlackboxVideoMetadata16, "16번제목","16번내용", date2, "미확인",null),
                new AccidentReport(user2, pothole15, BlackboxVideoMetadata17, "17번제목","17번내용",date2,"반려","그냥")));
    }
}
