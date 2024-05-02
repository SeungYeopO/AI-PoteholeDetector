package com.h2o.poppy.model.user;

import com.h2o.poppy.entity.AccidentReport;
import com.h2o.poppy.entity.UsersSerials;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class UserDto {

    private Long userPk;
    private String loginId;
    private String password;
    private String userName;
    private String phoneNumber;
    private UsersSerials usersSerials;
    private List<AccidentReport> accidentReport;


    // Constructors
    public UserDto() {
    }

}
