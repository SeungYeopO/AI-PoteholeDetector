package com.h2o.poppy.service;

import com.h2o.poppy.model.address.Address;
import com.h2o.poppy.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

@Service
public class AddressService {

    private final AddressRepository addressRepository;

    @Autowired
    public AddressService(AddressRepository addressRepository) {
        this.addressRepository = addressRepository;
    }

    public int saveAddress(String address) {
        // 입력된 주소가 null 이거나 빈 문자열인지 검사
        if (!StringUtils.hasText(address)) {
            System.out.println("Invalid address input.");
            return 0; // 유효하지 않은 입력 처리
        }

        // 데이터베이스에 이미 같은 ID의 주소가 있는지 확인
        if (addressRepository.existsById(address)) {
            System.out.println("Address already exists in the database.");
            return 2; // 이미 존재하는 주소
        }

        // 새 주소 객체를 생성하고 저장
        Address newAddress = new Address(address);
        addressRepository.save(newAddress);
        System.out.println("Address saved to database successfully.");
        return 1; // 성공적으로 저장됨
    }
}
