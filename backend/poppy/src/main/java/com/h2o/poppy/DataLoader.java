package com.h2o.poppy;

import com.h2o.poppy.entity.*;
import com.h2o.poppy.model.user.UserDto;
import com.h2o.poppy.repository.*;
import org.checkerframework.checker.units.qual.A;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.ZoneId;
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
                new User("ssafy", "1", "싸피", "01095253456")));

        managerRepository.saveAll(List.of(
                new Manager("ssafy", "1", "싸피", "01095253456")));

        serialListRepository.saveAll(List.of(
                new SerialList("BB47125156")));

        User user1 = userRepository.findById(1L).orElse(null);
        SerialList serial1 = serialListRepository.findById(1L).orElse(null);

        usersSerialsRepository.saveAll(List.of(
                new UsersSerials(user1, serial1)));


        LocalDateTime now = LocalDateTime.now();

        LocalDateTime detectedDateTime = now.plusDays(-3);
        LocalDateTime expectDateTime = now.plusDays(4);
        LocalDateTime completeStartDateTime = now.plusDays(-7);
        LocalDateTime completeDateTime = now.plusDays(-10);

        Date currentDate = Date.from(now.atZone(ZoneId.systemDefault()).toInstant());
        Date detectedDate = Date.from(detectedDateTime.atZone(ZoneId.systemDefault()).toInstant());
        Date expectDate = Date.from(expectDateTime.atZone(ZoneId.systemDefault()).toInstant());
        Date completeStartDate = Date.from(completeStartDateTime.atZone(ZoneId.systemDefault()).toInstant());
        Date completeDate = Date.from(completeDateTime.atZone(ZoneId.systemDefault()).toInstant());


        potholeRepository.saveAll(List.of(
                new Pothole(35.202370, 126.810139, true, "광주", "광산구", "하남산단6번로", detectedDate, "미확인",null,null,null,null),
                new Pothole(37.501475, 127.039515, true, "서울", "강남구", "테헤란로", currentDate, "미확인",null,null,null,null),
                new Pothole(33.555664, 126.796320, true, "제주", "제주시", "해맞이해안로", currentDate, "미확인",null,null,null,null),
                new Pothole(35.199083,  129.206633, true, "부산", "기장군", "기장대로", completeDate, "공사완료",completeStartDate,detectedDate,currentDate,null),
                new Pothole(35.897045,  128.851677, true, "경북", "경산시", "대구대로", completeDate, "공사완료",completeStartDate,detectedDate,currentDate,null),
                new Pothole(37.467655,  126.946325, true, "서울", "관악구", "강남순환도시", completeDate, "공사완료",completeStartDate,detectedDate,currentDate,null),
                new Pothole(36.102575,  127.499691, true, "충남", "금산군", "인삼로", completeDate, "공사완료",completeStartDate,detectedDate,currentDate,null),
                new Pothole(37.880579, 127.729987, true, "강원", "춘천시", "시청길", currentDate, "미확인",null,null,null,null),
                new Pothole(37.456733, 126.705120, false, "인천", "남동구", "구월로", currentDate, "확인전",null,null,null,"여기 포트홀 있는거 같은데 확인해주세요."),
                new Pothole(35.216768, 128.142013, true, "경남", "진주시", "중천로", detectedDate, "공사중",currentDate,expectDate,null,null),
                new Pothole(36.098999 ,127.490736 , true, "충남", "금산군", "비단로", detectedDate, "공사중",currentDate,expectDate,null,null),
                new Pothole(36.099268 ,127.483175 , false, "충남", "금산군", "비단로", detectedDate, "확인전",null,null,null,"확인해주세요"),
                new Pothole(36.642488, 127.489675, false, "충북", "청주시", "상당구", currentDate, "확인전",null,null,null,"포트홀있어요")));

        SerialList serialList1 = serialListRepository.findById(1L).orElse(null);


        if (serialList1 != null ) {
            blackboxVideoMetadataRepository.saveAll(List.of(
                    new BlackboxVideoMetadata(serialList1, currentDate, 35.202370, 126.810139, null),
                    new BlackboxVideoMetadata(serialList1, currentDate, 37.501475, 127.039515, null),
                    new BlackboxVideoMetadata(serialList1, currentDate, 33.555664, 126.796320, null),
                    new BlackboxVideoMetadata(serialList1, currentDate, 35.199083,  129.206633, null),
                    new BlackboxVideoMetadata(serialList1, detectedDate, 35.897045,  128.851677, null),
                    new BlackboxVideoMetadata(serialList1, detectedDate, 37.467655,  126.946325, null),
                    new BlackboxVideoMetadata(serialList1, detectedDate, 36.102575,  127.499691, null),
                    new BlackboxVideoMetadata(serialList1, detectedDate, 37.880579,  127.729987, null),
                    new BlackboxVideoMetadata(serialList1, detectedDate, 37.456733, 126.705120, null)));
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

        BlackboxVideoMetadata BlackboxVideoMetadata1 = blackboxVideoMetadataRepository.findById(1L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata2 = blackboxVideoMetadataRepository.findById(2L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata3 = blackboxVideoMetadataRepository.findById(3L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata4 = blackboxVideoMetadataRepository.findById(4L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata5 = blackboxVideoMetadataRepository.findById(5L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata6 = blackboxVideoMetadataRepository.findById(6L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata7 = blackboxVideoMetadataRepository.findById(7L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata8 = blackboxVideoMetadataRepository.findById(8L).orElse(null);
        BlackboxVideoMetadata BlackboxVideoMetadata9 = blackboxVideoMetadataRepository.findById(9L).orElse(null);

        accidentReportRepository.saveAll(List.of(
                new AccidentReport(user1, pothole1, BlackboxVideoMetadata1, "포트홀사고","포트홀 때문에 타이어 터졌어요", currentDate, "미확인",null),
                new AccidentReport(user1, pothole2, BlackboxVideoMetadata2, "사고신고","포트홀 피하려다가 다른차랑 충돌했어요, 보상해주세요.", currentDate, "미확인",null),
                new AccidentReport(user1, pothole3, BlackboxVideoMetadata3, "사고","이런것도 보상받을수 있나요?", currentDate, "미확인",null),
                new AccidentReport(user1, pothole4, BlackboxVideoMetadata4, "신고","안녕하세요. 포트홀에 의한 사고보상 요청드립니다.", currentDate, "미확인",null),
                new AccidentReport(user1, pothole5, BlackboxVideoMetadata5, "포트홀","포트홀좀 공사해라", detectedDate, "보상완료",null),
                new AccidentReport(user1, pothole6, BlackboxVideoMetadata6, "충돌사고","포트홀 때문에 타이어 펑크났어요", detectedDate, "보상완료",null),
                new AccidentReport(user1, pothole7, BlackboxVideoMetadata7, "포트홀","포트홀에 지나간 이후부터 차에 에어컨이 안나와요.", detectedDate, "반려","포트홀이 없습니다."),
                new AccidentReport(user1, pothole8, BlackboxVideoMetadata8, "사고남","앞차가 갑자기 뒤로옴", detectedDate, "반려","포트홀이 없습니다."),
                new AccidentReport(user1, pothole9, BlackboxVideoMetadata9, "보상해줘","보상해줘", detectedDate, "반려","영상이 인정되지 않았습니다.")));
    }
}
