package com.h2o.poppy.model.manager;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ManagerDto {

    private Long managerPk;
    private String loginId;
    private String password;
    private String managerName;
    private String phoneNumber;


    // Constructors
    public ManagerDto() {
    }

}
