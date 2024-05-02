package com.h2o.poppy;

import com.h2o.poppy.entity.*;
import com.h2o.poppy.repository.*;
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
                new User("dlek567", "2", "유명렬", "01090123456")));

        managerRepository.saveAll(List.of(
                new Manager("samsung", "1", "황유경", "01012345678"),
                new Manager("dlek567", "2", "유명렬", "01090123456")));

        serialListRepository.saveAll(List.of(
                new SerialList("123456789"),
                new SerialList("987654321")));

        Date date1 = new Date(2022 - 1900, 3, 25, 14, 30, 0); // 2022년 4월 25일 오후 2시 30분
        Date date2 = new Date(2022 - 1900, 5, 46, 22, 30, 0); // 2022년 4월 25일 오후 2시 30분

        potholeRepository.saveAll(List.of(
                new Pothole(35.202370, 126.810139, true, "광주광역시", "광산구", "하남산단6번로", date1, "미확인"),
                new Pothole(37.501475, 127.039515, true, "서울특별시", "강남구", "테헤란로", date2, "공사 대기")));

        SerialList serialList1 = serialListRepository.findById(1L).orElse(null);
        SerialList serialList2 = serialListRepository.findById(2L).orElse(null);

        // Create instances of BlackboxVideoMetadata and save them
        if (serialList1 != null && serialList2 != null) {
            blackboxVideoMetadataRepository.saveAll(List.of(
                    new BlackboxVideoMetadata(serialList1, new Date(), 35.202370, 126.810139),
                    new BlackboxVideoMetadata(serialList2, new Date(), 37.501475, 127.039515)));
        }

        User user1 = userRepository.findById(1L).orElse(null);
        User user2 = userRepository.findById(2L).orElse(null);

        Pothole pothole1 = potholeRepository.findById(1L).orElse(null);
        Pothole pothole2 = potholeRepository.findById(2L).orElse(null);

        BlackboxVideoMetadata BlackboxVideoMetadata1 = blackboxVideoMetadataRepository.findById(1L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata2 = blackboxVideoMetadataRepository.findById(2L).orElse(null);

        accidentReportRepository.saveAll(List.of(
                new AccidentReport(user1, pothole1, BlackboxVideoMetadata1, "1번제목","광주신고함", date1, "미확인","포트홀아님"),
                new AccidentReport(user2, pothole2, BlackboxVideoMetadata2, "2번제목","서울신고함",date2,"접수중",null)));
    }
}
