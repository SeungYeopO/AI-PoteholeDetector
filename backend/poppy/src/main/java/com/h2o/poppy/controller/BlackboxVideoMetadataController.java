package com.h2o.poppy.controller;

import com.h2o.poppy.model.blackboxvideometadata.BlackboxVideoMetadataDto;
import com.h2o.poppy.model.blackboxvideometadata.BlackboxVideoMetadataJoinUserDto;
import com.h2o.poppy.service.BlackboxVideoMetadataService;
import com.h2o.poppy.service.S3Service;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/video-data")
public class BlackboxVideoMetadataController {


    private final BlackboxVideoMetadataService blackboxVideoMetadataService;
    private final S3Service s3Service;


    @Autowired
    public BlackboxVideoMetadataController(BlackboxVideoMetadataService blackboxVideoMetadataService, S3Service s3Service) {
        this.blackboxVideoMetadataService = blackboxVideoMetadataService;
        this.s3Service = s3Service;
    }

    // 전체 포트홀 읽기
    @GetMapping
    public List<BlackboxVideoMetadataDto> getAllVideo() {
        return blackboxVideoMetadataService.getAllBlackboxVideoMetadata();
    }

    // 포트홀 1명 정보 보기
    @GetMapping("/{videoPk}")
    public BlackboxVideoMetadataDto getIdVideo(@PathVariable Long videoPk) {
        return blackboxVideoMetadataService.getIdBlackboxVideoMetadata(videoPk);
    }


    // 비디오 등록 (블랙박스에서 위경도, 시리얼 넘버 보내면 자동 등록)
    @PostMapping
    public void saveData(@RequestParam("latitude") double latitude,
                           @RequestParam("longitude") double longitude,
                           @RequestParam("serialNumber") String serialNumber,
                           @RequestParam("file") MultipartFile video) throws IOException {

        String fileName = blackboxVideoMetadataService.saveData(latitude,longitude,serialNumber);
        boolean success = fileName != null;
        System.out.println(success);

        if(success){
            System.out.println(fileName);
            s3Service.createFolder(fileName);
            s3Service.uploadFile(fileName,video);
        }
    }

    // 수정
    @PutMapping
    public Object updateData(@RequestBody BlackboxVideoMetadataDto data) {
        long videoPk = blackboxVideoMetadataService.updateData(data);
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
        boolean result = blackboxVideoMetadataService.deleteData(videoPk);

        @Getter
        class DeleteDataResponse {
            private final boolean result;

            DeleteDataResponse(boolean result) {
                this.result = result;
            }
        }
        return new DeleteDataResponse(result);
    }

    // 사용자의 비디오 조회 userPk 입력
    @GetMapping("/user/{userPk}")
    public Object getByUserPk(@PathVariable Long userPk){
        List<BlackboxVideoMetadataJoinUserDto> result = blackboxVideoMetadataService.getByUserPk(userPk);
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