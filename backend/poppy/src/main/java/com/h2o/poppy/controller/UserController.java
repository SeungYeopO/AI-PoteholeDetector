package com.h2o.poppy.controller;

import com.h2o.poppy.entity.*;
import com.h2o.poppy.model.user.UserDto;
import com.h2o.poppy.repository.*;
import com.h2o.poppy.service.AccidentReportService;
import com.h2o.poppy.service.SerialListService;
import com.h2o.poppy.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Date;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserSerivce userService;
    private final ManagerRepository managerRepository;
    private final SerialListService serialListService;
    private final SerialListRepository serialListRepository;
    private final AccidentReportRepository accidentReportRepository;
    private final AccidentReportService accidentReportService;
    private final UserRepository userRepository;
    private final PotholeRepository potholeRepository;
    private final BlackboxVideoMetadataRepository blackboxVideoMetadataRepository;

    @Autowired
    public UserController(UserSerivce userService, UserRepository userRepository,
            AccidentReportService accidentReportService, AccidentReportRepository accidentReportRepository,
            PotholeRepository potholeRepository, BlackboxVideoMetadataRepository blackboxVideoMetadataRepository,
            SerialListService serialListService, SerialListRepository serialListRepository,
            ManagerRepository managerRepository) {
        this.userService = userService;
        this.managerRepository = managerRepository;
        this.serialListService = serialListService;
        this.accidentReportService = accidentReportService;
        this.accidentReportRepository = accidentReportRepository;
        this.userRepository = userRepository;
        this.potholeRepository = potholeRepository;
        this.blackboxVideoMetadataRepository = blackboxVideoMetadataRepository;
        this.serialListRepository = serialListRepository;

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
                new Pothole(35.202370, 126.810139, true, true, "광주광역시", "광산구", "하남산단6번로", date1),
                new Pothole(37.501475, 127.039515, true, false, "서울특별시", "강남수", "테헤란로", date2)));

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
                new AccidentReport(user1, pothole1, BlackboxVideoMetadata1, "광주신고함", true),
                new AccidentReport(user2, pothole2, BlackboxVideoMetadata2, "서울신고함", false)));
    }

    // 전체 유저 읽기
    @GetMapping
    public List<User> getAllUser() {
        return userService.getAllUser();
    }

    // 유저 1명 정보 보기
    @GetMapping("/{userPk}")
    public User getIdUser(@PathVariable Long userPk) {
        return userService.getIdUser(userPk);
    }

    // 아이디 중복 검사
    @PostMapping("/duplicate-id")
    public Object DuplicateId(@RequestBody UserDto data) {
        boolean result = userService.duplicateId(data.getLoginId());
        @Getter
        class DuplicateIdResponse {
            private final boolean result;
            DuplicateIdResponse(boolean result) {
                this.result = result;
            }
        }
        return new DuplicateIdResponse(result);
    }

    // 쓰기
    @PostMapping
    public Object saveData(@RequestBody User data) {
        long userPk = userService.saveData(data);
        boolean success = userPk > 0; // PK가 0보다 크다면 성공으로 간주

        // 메서드 내 로컬 클래스 정의
        @Getter
        class SaveResponse {
            private final boolean success;
            private final long userPk;

            SaveResponse(boolean success, long userPk) {
                this.success = success;
                this.userPk = userPk;
            }
        }
        // 로컬 클래스 인스턴스 생성 및 반환
        return new SaveResponse(success, userPk);
    }

    // 수정
    @PutMapping
    public Object updateData(@RequestBody UserDto data) {
        int userPk = userService.updateData(data);
        // 1 이면 2개다 수정 2 이면 비번만 3이면 전번만 0이면 아무것도 안바꿈
        @Getter
        class UpdateDataResponse {
            private final boolean result;

            UpdateDataResponse(long userPk) {
                this.result = userPk != 0;
            }
        }
        return new UpdateDataResponse(userPk);
    }

    // 삭제
    @DeleteMapping("/{userPk}")
    public Object deleteData(@PathVariable Long userPk) {
        boolean result = userService.deleteData(userPk);
        @Getter
        class DeleteDataResponse{
            private final boolean result;

            DeleteDataResponse(boolean result){
                this.result = result;
            }
        }
        return new DeleteDataResponse(result);
    }

    @PostMapping("/login")
    public Object login(@RequestBody UserDto data) {
        long userPk = userService.login(data);
        @Getter
        class LoginResponse {
            private final boolean result;
            private final long userPk;
            LoginResponse(long userPk){
                this.userPk = userPk;
                this.result = userPk != 0;
            }
        }
        return new LoginResponse(userPk);
    }
}
