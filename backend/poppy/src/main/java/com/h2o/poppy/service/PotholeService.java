package com.h2o.poppy.service;

import com.h2o.poppy.entity.AccidentReport;
import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.model.pothole.PotholeDto;
import com.h2o.poppy.repository.PotholeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PotholeService {

    private final PotholeRepository potholeRepository;

    private PotholeDto convertToDto(Pothole pothole) {
        PotholeDto potholeDto = new PotholeDto();
        potholeDto.setPotholePk(pothole.getPotholePk());
        potholeDto.setLatitude(pothole.getLatitude());
        potholeDto.setLongitude(pothole.getLongitude());
        potholeDto.setIsPothole(pothole.getIsPothole());
        potholeDto.setIsRepair(pothole.getIsRepair());
        potholeDto.setProvince(pothole.getProvince());
        potholeDto.setCity(pothole.getCity());
        potholeDto.setStreet(pothole.getStreet());
        potholeDto.setDetectedAt(pothole.getDetectedAt());
        return potholeDto;
    }

    @Autowired
    public PotholeService(PotholeRepository potholeRepository) {
        this.potholeRepository = potholeRepository;
    }

    // 전체 get
    public List<PotholeDto> getAllPothole() {
        try {
            List<Pothole> getPothole = potholeRepository.findAll();
            return getPothole.stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        }catch (Exception e){
            return null;
        }
    }

    // 1인 get
    public PotholeDto getIdPothole(Long potholePk) {
        try{
            PotholeDto potholeDto = potholeRepository.getPotholeByPotholeId(potholePk);
            return potholeDto;
        }catch (Exception e){
            return null;
        }

    }


    // 삽입
    public long saveData(Pothole data) {
        try{
            long potholePk = data.getPotholePk();
            return 0;
        }
        catch (Exception e){
            try {
                long nowPk = 0;
                potholeRepository.save(data);
                nowPk = data.getPotholePk();
                return nowPk;
            } catch (Exception e1) {
                return 0;
            }
        }
    }

    // 수정
    public int updateData(PotholeDto data) {
        Long potholePk = data.getPotholePk();
        boolean isPothole = false;
        int potholeFlag=1;
        boolean isRepair = false;
        int repairFlag=1;

        try {
            isPothole = data.getIsPothole();
        }catch (Exception e){
            potholeFlag=0;
        }

        try {
            isRepair = data.getIsRepair();
        }catch (Exception e){
            repairFlag=0;
        }

        int state = 0;
        try {
            if (potholeFlag != 0 && repairFlag != 0) {
                // originPassword와 originPhoneNumber가 모두 null이 아닌 경우에 대한 처리
                potholeRepository.updateIsPothole(potholePk, isPothole);
                potholeRepository.updateIsRepair(potholePk, isRepair);
                state = 1;
            } else if (potholeFlag != 0) {
                potholeRepository.updateIsPothole(potholePk, isPothole);
                state = 2;
            } else if (repairFlag != 0) {
                potholeRepository.updateIsRepair(potholePk, isRepair);
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
    public boolean deleteData(Long potholePk) {
        try {
            potholeRepository.deleteById(potholePk);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
