package com.h2o.poppy.controller;

import com.h2o.poppy.model.blackboxvideometadata.BlackboxVideoMetadataDto;
import com.h2o.poppy.model.blackboxvideometadata.BlackboxVideoMetadataJoinUserDto;
import com.h2o.poppy.service.BlackboxVideoMetadataService;
import com.h2o.poppy.service.S3Service;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/video-data")
@EnableAsync
public class BlackboxVideoMetadataController {


    private final BlackboxVideoMetadataService blackboxVideoMetadataService;
    private final S3Service s3Service;


    @Autowired
    public BlackboxVideoMetadataController(BlackboxVideoMetadataService blackboxVideoMetadataService, S3Service s3Service) {
        this.blackboxVideoMetadataService = blackboxVideoMetadataService;
        this.s3Service = s3Service;
    }

    @GetMapping
    public List<BlackboxVideoMetadataDto> getAllVideo() {
        return blackboxVideoMetadataService.getAllBlackboxVideoMetadata();
    }

    @GetMapping("/{videoPk}")
    public BlackboxVideoMetadataDto getIdVideo(@PathVariable Long videoPk) {
        return blackboxVideoMetadataService.getIdBlackboxVideoMetadata(videoPk);
    }


    @PostMapping
    @Async
    public void saveData(@RequestParam("latitude") double latitude,
                           @RequestParam("longitude") double longitude,
                           @RequestParam("serialNumber") String serialNumber,
                           @RequestParam("file") MultipartFile video) throws IOException {

        String fileName = blackboxVideoMetadataService.saveData(latitude,longitude,serialNumber, video);
        boolean success = fileName != null;
        System.out.println(success);

        if(success){
            System.out.println(fileName);
            s3Service.createFolder(fileName);
            s3Service.videoUploadFile(fileName,video);
        }
    }

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

    @GetMapping("/user/{userPk}")
    public Object getByUserPk(@PathVariable Long userPk){
        List<BlackboxVideoMetadataJoinUserDto> result = blackboxVideoMetadataService.getByUserPk(userPk);
        boolean success = result !=null; 

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