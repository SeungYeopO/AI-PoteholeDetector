package com.h2o.poppy.service;


import com.h2o.poppy.entity.AccidentReport;
import com.h2o.poppy.entity.SerialList;
import com.h2o.poppy.entity.User;
import com.h2o.poppy.repository.BlackboxVideoMetadataRepository;
import com.h2o.poppy.entity.BlackboxVideoMetadata;
import com.h2o.poppy.model.blackboxvideometadata.BlackboxVideoMetadataDto;
import com.h2o.poppy.repository.SerialListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class BlackboxVideoMetadataService {
    private final BlackboxVideoMetadataRepository blackboxVideoMetadataRepository;
    private final SerialListRepository serialListRepository;

    @Autowired
    public BlackboxVideoMetadataService(BlackboxVideoMetadataRepository blackboxVideoMetadataRepository,
                                        SerialListRepository serialListRepository) {
        this.blackboxVideoMetadataRepository = blackboxVideoMetadataRepository;
        this.serialListRepository = serialListRepository;
    }
    private BlackboxVideoMetadataDto convertToDto(BlackboxVideoMetadata blackboxVideoMetadata) {
        BlackboxVideoMetadataDto blackboxVideoMetadataDto = new BlackboxVideoMetadataDto();
        blackboxVideoMetadataDto.setVideoPk(blackboxVideoMetadata.getVideoPk());
        blackboxVideoMetadataDto.setSerialPk(blackboxVideoMetadata.getSerialPk().getSerialPk());
        blackboxVideoMetadataDto.setDetectedAt(blackboxVideoMetadata.getDetectedAt());
        blackboxVideoMetadataDto.setLatitude(blackboxVideoMetadata.getLatitude());
        blackboxVideoMetadataDto.setLongitude(blackboxVideoMetadata.getLongitude());
        return blackboxVideoMetadataDto;
    }



    // 전체 get
    public List<BlackboxVideoMetadataDto> getAllBlackboxVideoMetadata() {
        List<BlackboxVideoMetadata> getBlackboxVideoMetadata = blackboxVideoMetadataRepository.findAll();
        return getBlackboxVideoMetadata.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 1인 get
    public BlackboxVideoMetadataDto getIdBlackboxVideoMetadata(Long blackboxVideoMetadataPk) {
        BlackboxVideoMetadataDto blackboxVideoMetadataDto = blackboxVideoMetadataRepository.getBlackboxVideoMetadataByVideoId(blackboxVideoMetadataPk);
        return blackboxVideoMetadataDto;
    }


    // 삽입
    public long saveData(BlackboxVideoMetadataDto data) {
        try{
            long videoPk = data.getVideoPk();
            return 0;
        }catch (Exception e){
            try {
                long nowPk = 0;

                long serialPk = data.getSerialPk();
                Date detectedAt = data.getDetectedAt();
                double latitude = data.getLatitude();
                double longitude = data.getLongitude();

                SerialList serialList = serialListRepository.findById(serialPk).orElse(null);

                BlackboxVideoMetadata blackboxVideoMetadata = new BlackboxVideoMetadata(serialList, detectedAt, latitude, longitude);
                blackboxVideoMetadataRepository.save(blackboxVideoMetadata);

                nowPk = blackboxVideoMetadata.getVideoPk();

                return nowPk;
            } catch (Exception e1) {
                return 0;
            }
        }
    }

    // 수정
    public int updateData(BlackboxVideoMetadataDto data) {
        Long videoPk = data.getVideoPk();
        double latitude = data.getLatitude();
        double longitude = data.getLongitude();

        int state = 0;
        try {
            if (latitude != 0 && longitude != 0) {
                // originPassword와 originPhoneNumber가 모두 null이 아닌 경우에 대한 처리
                blackboxVideoMetadataRepository.updatelatitude(videoPk, latitude);
                blackboxVideoMetadataRepository.updatelongitude(videoPk, longitude);
                state = 1;
            } else if (latitude != 0) {
                blackboxVideoMetadataRepository.updatelatitude(videoPk, latitude);
                state = 2;
            } else if (longitude != 0) {
                blackboxVideoMetadataRepository.updatelongitude(videoPk, longitude);
                state = 3;
            }
            return state;
        } catch (Exception e) {
            System.out.println("update operation failed");
            e.printStackTrace(); // 예외 스택 트레이스 출력
            return 0;
        }
    }

    // 삭제
    public boolean deleteData(Long blackboxVideoMetadataPk) {
        try {
            blackboxVideoMetadataRepository.deleteById(blackboxVideoMetadataPk);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
