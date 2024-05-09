package com.h2o.poppy.controller;

import com.h2o.poppy.entity.BlackboxVideoMetadata;
import com.h2o.poppy.model.blackboxvideometadata.BlackboxVideoMetadataDto;
import com.h2o.poppy.model.blackboxvideometadata.BlackboxVideoMetadataJoinUserDto;
import com.h2o.poppy.service.BlackboxVideoMetadataService;
import lombok.Getter;
import lombok.Setter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/video-data")
public class BlackboxVideoMetadataController {


    private final BlackboxVideoMetadataService blockboxVideoMetadataService;

    @Autowired
    public BlackboxVideoMetadataController(BlackboxVideoMetadataService blockboxVideoMetadataService) {
        this.blockboxVideoMetadataService = blockboxVideoMetadataService;
    }

    // 전체 포트홀 읽기
    @GetMapping
    public List<BlackboxVideoMetadataDto> getAllVideo() {
        return blockboxVideoMetadataService.getAllBlackboxVideoMetadata();
    }

    // 포트홀 1명 정보 보기
    @GetMapping("/{videoPk}")
    public BlackboxVideoMetadataDto getIdVideo(@PathVariable Long videoPk) {
        return blockboxVideoMetadataService.getIdBlackboxVideoMetadata(videoPk);
    }


    // 비디오 등록 (블랙박스에서 위경도, 시리얼 넘버 보내면 자동 등록)
    @Getter
    @Setter
    static class blackBoxRequest {
        private double latitude;
        private double longitude;
        private String serialNumber;
    }
    @PostMapping
    public Object saveData(@RequestBody blackBoxRequest data) {
        double latitude = data.getLatitude();
        double longitude = data.getLongitude();
        String serialNumber = data.getSerialNumber();

        long videoPk = blockboxVideoMetadataService.saveData(latitude,longitude,serialNumber);
        boolean success = videoPk > 0; // PK가 0보다 크다면 성공으로 간주

        @Getter
        class SaveResponse {
            private final boolean success;
            private final long videoPk;

            SaveResponse(boolean success, long videoPk) {
                this.success = success;
                this.videoPk = videoPk;
            }
        }
        return new SaveResponse(success, videoPk);
    }

    // 수정
    @PutMapping
    public Object updateData(@RequestBody BlackboxVideoMetadataDto data) {
        long videoPk = blockboxVideoMetadataService.updateData(data);
        @Getter
        class UpdateDataResponse {
            private final boolean result;

            UpdateDataResponse(long videoPk) {
                this.result = videoPk != 0;
            }
        }
        return new UpdateDataResponse(videoPk);
    }

    // 삭제
    @DeleteMapping("/{videoPk}")
    public Object deleteData(@PathVariable Long videoPk) {
        boolean result = blockboxVideoMetadataService.deleteData(videoPk);

        @Getter
        class DeleteDataResponse {
            private final boolean result;

            DeleteDataResponse(boolean result) {
                this.result = result;
            }
        }
        return new DeleteDataResponse(result);
    }

    // 사용자의 비디오 조회 userPk입력
    @GetMapping("/user/{userPk}")
    public Object getByUserPk(@PathVariable Long userPk){
        List<BlackboxVideoMetadataJoinUserDto> result = blockboxVideoMetadataService.getByUserPk(userPk);
        boolean success = result !=null; // PK가 0보다 크다면 성공으로 간주

        @Getter
        class SaveResponse {
            private final boolean success;
            private final List<BlackboxVideoMetadataJoinUserDto> result;

            SaveResponse(boolean success, List<BlackboxVideoMetadataJoinUserDto> result) {
                this.success = success;
                this.result = result;
            }
        }
        return new SaveResponse(success, result);

    }
}