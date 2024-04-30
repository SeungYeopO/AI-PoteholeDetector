package com.h2o.poppy.service;

import com.h2o.poppy.entity.Manager;
import com.h2o.poppy.model.manager.ManagerDto;
import com.h2o.poppy.repository.ManagerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ManagerService {

    private final ManagerRepository managerRepository;

    private ManagerDto convertToDto(Manager manager) {
        ManagerDto managerDto = new ManagerDto();
        managerDto.setManagerPk(manager.getManagerPk());
        managerDto.setLoginId(manager.getLoginId());
        managerDto.setPassword(manager.getPassword());
        managerDto.setManagerName(manager.getManagerName());
        managerDto.setPhoneNumber(manager.getPhoneNumber());
        return managerDto;
    }

    @Autowired
    public ManagerService(ManagerRepository managerRepository) {
        this.managerRepository = managerRepository;
    }

    // 전체 get
    public List<ManagerDto> getAllManager() {
        List<Manager> getManager = managerRepository.findAll();
        return getManager.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 1인 get
    public Manager getIdManager(Long managerPk) {
        Optional<Manager> optionalManager = managerRepository.findById(managerPk);
        return optionalManager.orElse(null);
    }

    public boolean duplicateId(String loginId) {
        Manager managerid = managerRepository.findByLoginId(loginId);
        // 사용자를 찾았는지 여부에 따라서 중복 여부를 판단합니다.
        if (managerid != null) {
            // 중복되는 경우
            return false;
        } else {
            // 중복되지 않는 경우
            return true;
        }
    }

    // 삽입
    public long saveData(Manager data) {
        long nowPk = 0;
        try {
            managerRepository.save(data);
            nowPk = data.getManagerPk();
            return nowPk;
        } catch (Exception e) {
            return 0;
        }
    }

    // 수정
    public int updateData(ManagerDto data) {
        Long managerpk = data.getManagerPk();
        String replacePassword = data.getPassword();
        String replacePhoneNumber = data.getPhoneNumber();
        int state = 0;
        try {
            if (replacePassword != null && replacePhoneNumber != null) {
                // originPassword와 originPhoneNumber가 모두 null이 아닌 경우에 대한 처리
                managerRepository.updatePassWord(managerpk, replacePassword);
                managerRepository.updatePhoneNumber(managerpk, replacePhoneNumber);
                state = 1;
            } else if (replacePassword != null) {
                managerRepository.updatePassWord(managerpk, replacePassword);
                state = 2;

            } else if (replacePhoneNumber != null) {
                managerRepository.updatePhoneNumber(managerpk, replacePhoneNumber);
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
    public boolean deleteData(Long managerPk) {
        try {
            managerRepository.deleteById(managerPk);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public long login(ManagerDto data) {
        String loginId = data.getLoginId();
        String loginPassword = data.getPassword();
        Manager managerid = managerRepository.findByLoginId(loginId);
        Manager managerPassword = managerRepository.findByPassword(loginPassword);

        if (managerid != null && managerPassword != null) {
            Manager info = managerRepository.findManagerPkByLoginId(loginId);
            long managerPk = info.getManagerPk();
            return managerPk;
        } else {
            return 0;
        }
    }
}
