package com.h2o.poppy.service;

import com.h2o.poppy.entity.User;
import com.h2o.poppy.model.user.UserDto;
import com.h2o.poppy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    private UserDto convertToDto(User user) {
        UserDto userDto = new UserDto();
        userDto.setUserPk(user.getUserPk());
        userDto.setLoginId(user.getLoginId());
        userDto.setPassword(user.getPassword());
        userDto.setUserName(user.getUserName());
        userDto.setPhoneNumber(user.getPhoneNumber());
        return userDto;
    }

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 전체 get
    public List<UserDto> getAllUser() {
        List<User> getUser = userRepository.findAll();
        return getUser.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    // 1인 get
    public User getIdUser(Long userPk) {
        Optional<User> optionalUser = userRepository.findById(userPk);
        return optionalUser.orElse(null);
    }

    public boolean duplicateId(String loginId) {
        User userid = userRepository.findByLoginId(loginId);
        // 사용자를 찾았는지 여부에 따라서 중복 여부를 판단합니다.
        if (userid != null) {
            // 중복되는 경우
            return false;
        } else {
            // 중복되지 않는 경우
            return true;
        }
    }

    // 삽입
    public long saveData(User data) {
        long nowPk = 0;
        try {
            userRepository.save(data);
            nowPk = data.getUserPk();
            return nowPk;
        } catch (Exception e) {
            return 0;
        }
    }

    // 수정
    public int updateData(UserDto data) {
        Long userPk = data.getUserPk();
        String replacePassword = data.getPassword();
        String replacePhoneNumber = data.getPhoneNumber();
        int state = 0;
        try {
            if (replacePassword != null && replacePhoneNumber != null) {
                // originPassword와 originPhoneNumber가 모두 null이 아닌 경우에 대한 처리
                userRepository.updatePassWord(userPk, replacePassword);
                userRepository.updatePhoneNumber(userPk, replacePhoneNumber);
                state = 1;
            } else if (replacePassword != null) {
                userRepository.updatePassWord(userPk, replacePassword);
                state = 2;

            } else if (replacePhoneNumber != null) {
                userRepository.updatePhoneNumber(userPk, replacePhoneNumber);
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
    public boolean deleteData(Long userPk) {
        try {
            userRepository.deleteById(userPk);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public long login(UserDto data) {
        String loginId = data.getLoginId();
        String loginPassword = data.getPassword();
        User user = userRepository.findByLoginId(loginId);

        if (user != null && user.getPassword().equals(loginPassword)) {
            return user.getUserPk();
        } else {
            return 0;
        }
    }
}
