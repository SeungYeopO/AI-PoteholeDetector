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
                new User("ssafy", "1", "싸피", "01095253456"),
                new User("gkfla", "1", "유하림", "01095253456"),
                new User("tmdduq", "1","오승엽", "01095253456"),
                new User("tjdgh", "1", "양성호", "01095253456"),
                new User("tkdqja", "1", "선상범", "01095253456"),
                new User("dbrud", "1", "황유경", "01095253456"),
                new User("dlek567", "1", "유명렬", "01016334582")));
        managerRepository.saveAll(List.of(
                new Manager("ssafy", "1", "싸피", "01095253456")));

        serialListRepository.saveAll(List.of(
                new SerialList("BB47125156"),
                new SerialList("BB45426522"),
                new SerialList("BB70823935"),
                new SerialList("BB74869659"),
                new SerialList("BB82285968"),
                new SerialList("BB22882585"),
                new SerialList("BB15925501")));

        User user1 = userRepository.findById(1L).orElse(null);
        User user2 = userRepository.findById(2L).orElse(null);
        User user3 = userRepository.findById(3L).orElse(null);
        User user4 = userRepository.findById(4L).orElse(null);
        User user5 = userRepository.findById(5L).orElse(null);
        User user6 = userRepository.findById(6L).orElse(null);
        User user7 = userRepository.findById(7L).orElse(null);
        SerialList serial1 = serialListRepository.findById(1L).orElse(null);
        SerialList serial2 = serialListRepository.findById(2L).orElse(null);
        SerialList serial3 = serialListRepository.findById(3L).orElse(null);
        SerialList serial4 = serialListRepository.findById(4L).orElse(null);
        SerialList serial5 = serialListRepository.findById(5L).orElse(null);
        SerialList serial6 = serialListRepository.findById(6L).orElse(null);
        SerialList serial7 = serialListRepository.findById(7L).orElse(null);

        usersSerialsRepository.saveAll(List.of(
                new UsersSerials(user1, serial1),
                new UsersSerials(user2, serial2),
                new UsersSerials(user3, serial3),
                new UsersSerials(user4, serial4),
                new UsersSerials(user5, serial5),
                new UsersSerials(user6, serial6),
                new UsersSerials(user7, serial7)));


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
        SerialList serialList2 = serialListRepository.findById(2L).orElse(null);
        SerialList serialList3= serialListRepository.findById(3L).orElse(null);
        SerialList serialList4 = serialListRepository.findById(4L).orElse(null);
        SerialList serialList5 = serialListRepository.findById(5L).orElse(null);
        SerialList serialList6 = serialListRepository.findById(6L).orElse(null);
        SerialList serialList7 = serialListRepository.findById(7L).orElse(null);


        if (serialList1 != null && serialList2 != null ) {
            blackboxVideoMetadataRepository.saveAll(List.of(
                    new BlackboxVideoMetadata(serialList2, currentDate, 35.202370, 126.810139, null),
                    new BlackboxVideoMetadata(serialList3, currentDate, 37.501475, 127.039515, null),
                    new BlackboxVideoMetadata(serialList4, currentDate, 33.555664, 126.796320, null),
                    new BlackboxVideoMetadata(serialList5, currentDate, 35.199083,  129.206633, null),
                    new BlackboxVideoMetadata(serialList6, detectedDate, 35.897045,  128.851677, null),
                    new BlackboxVideoMetadata(serialList7, detectedDate, 37.467655,  126.946325, null),
                    new BlackboxVideoMetadata(serialList2, detectedDate, 36.102575,  127.499691, null),
                    new BlackboxVideoMetadata(serialList3, detectedDate, 37.880579,  127.729987, null),
                    new BlackboxVideoMetadata(serialList4, detectedDate, 37.456733, 126.705120, null)));
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
                new AccidentReport(user2, pothole1, BlackboxVideoMetadata1, "포트홀 때문에 타이어 터졌어요","타이어 보상 문의", new Date(124, 5, 17, 12, 22, 0), "미확인",null),
                new AccidentReport(user3, pothole2, BlackboxVideoMetadata2, "포트홀 피하려다가 다른차랑 충돌했어요. 보상해주세요.","사고 신고 합니다.", new Date(124, 4, 15, 8, 31, 0), "미확인",null),
                new AccidentReport(user4, pothole3, BlackboxVideoMetadata3, "이런것도 보상받을수 있나요?","포트홀 사고 문의", new Date(124, 4, 27, 6, 45, 43), "미확인",null),
                new AccidentReport(user5, pothole4, BlackboxVideoMetadata4, "안녕하세요. 포트홀에 의한 사고보상 요청드립니다. 포트홀로 인해 범퍼가 깨졌습니다. 보상 가능할까요?","범퍼 보상", new Date(124, 4, 6, 18, 14, 3), "미확인",null),
                new AccidentReport(user6, pothole5, BlackboxVideoMetadata5, "포트홀 밟아서 차에 기스났어요. 차량 사진 첨부합니다.","포트홀", new Date(124, 3, 7, 23, 31, 40), "보상완료",null),
                new AccidentReport(user7, pothole6, BlackboxVideoMetadata6, "포트홀 때문에 타이어 펑크났어요","포트홀 사고", new Date(124, 2, 28, 16, 15, 10), "보상완료",null),
                new AccidentReport(user2, pothole7, BlackboxVideoMetadata7, "포트홀에 지나간 이후부터 차에 에어컨이 안 나와요.","에어컨 고쳐주세요", new Date(124, 2, 2, 9, 4, 5), "반려","포트홀과 관련이 없습니다."),
                new AccidentReport(user3, pothole8, BlackboxVideoMetadata8, "앞차가 갑자기 뒤로옴","접촉사고", new Date(124, 2, 2, 17, 39, 34), "반려","포트홀 확인이 어렵습니다."),
                new AccidentReport(user4, pothole9, BlackboxVideoMetadata9, "사고 났으니까 물어줘","보상보상보상", new Date(124, 1, 13, 11, 37, 23), "반려","영상이 인정되지 않았습니다.")));
    }
}
