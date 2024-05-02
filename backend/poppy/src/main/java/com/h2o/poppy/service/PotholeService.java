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
        potholeDto.setProvince(pothole.getProvince());
        potholeDto.setCity(pothole.getCity());
        potholeDto.setStreet(pothole.getStreet());
        potholeDto.setDetectedAt(pothole.getDetectedAt());
        potholeDto.setState(pothole.getState());
        potholeDto.setStartAt(pothole.getStartAt());
        potholeDto.setExpectAt(pothole.getExpectAt());
        potholeDto.setEndAt(pothole.getEndAt());
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

    //공사상태 get(공사대기)
    public List<PotholeDto> getState1Pothole(String nowState){
        try{
            List<PotholeDto> statePotholes = potholeRepository.getPotholeByNowState(nowState);
            System.out.println(statePotholes);
            return statePotholes;
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

    public String changeState(PotholeDto data){
        long potholePk = data.getPotholePk();
        String nowState = data.getState();
        if(nowState==null)return null;
        if(!nowState.equals("공사대기") && !nowState.equals("공사중") && !nowState.equals("공사완료"))return null;
        String changeState =null;
        try{
            if(nowState.equals("공사중")){
                potholeRepository.updateState(potholePk,"공사중");
                changeState = "공사중";
            }else if(nowState.equals("공사완료")){
                potholeRepository.updateState(potholePk,"공사완료");
                changeState = "공사완료";
            }
            return changeState;
        }catch (Exception e){
            return null;
        }
    }


    // 삭제
    public boolean rejectData(Long potholePk) {
        try {
            potholeRepository.updateIsPothole(potholePk);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
