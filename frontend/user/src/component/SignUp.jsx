import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp() {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    passwordConfirm: "",
    userName: "",
    phoneNumber: "",
  });

  const [validation, setValidation] = useState({
    loginIdValid: true,
    passwordValid: true,
    passwordConfirmValid: true,
    userNameValid: true,
    phoneNumberValid: true,
  });

  const [errorMessages, setErrorMessages] = useState({
    loginId: "",
    password: "",
    passwordConfirm: "",
    userName: "",
    phoneNumber: "",
  });

  const [isIdDuplicate, setIsIdDuplicate] = useState(false);

  const navigate = useNavigate();

  const inputRegexs = {
    idRegex: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
    pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    nicknameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let isValid = true;
    let errorMessage = "";

    switch (name) {
      case "loginId":
        isValid = inputRegexs.idRegex.test(value);
        errorMessage = isValid
          ? ""
          : "아이디는 문자로 시작하고, 영문자, 숫자, 하이픈(-), 언더바(_)를 포함하여 3~20자 이내여야 합니다.";
        break;
      case "password":
        isValid = inputRegexs.pwRegex.test(value);
        errorMessage = isValid
          ? ""
          : "비밀번호는 최소 8자 이상, 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함해야 하며 공백을 허용하지 않습니다.";
        if (isValid) {
          isValid = value === formData.passwordConfirm;
          errorMessage = isValid ? "" : "비밀번호 확인이 일치하지 않습니다.";
        }
        break;
      case "passwordConfirm":
        isValid = value === formData.password;
        errorMessage = isValid ? "" : "비밀번호 확인이 일치하지 않습니다.";
        break;
      case "userName":
        isValid = inputRegexs.nicknameRegex.test(value);
        errorMessage = isValid
          ? ""
          : "닉네임은 영어 대소문자, 숫자, 한글을 포함하여 2~10자 이내여야 합니다.";
        break;
    }

    setValidation((prev) => ({
      ...prev,
      [name + "Valid"]: isValid,
    }));

    setErrorMessages((prev) => ({
      ...prev,
      [name]: errorMessage,
    }));
  };

  const checkDuplicateId = () => {
    const url = "/api/users/duplicate-id";
    const data = {
      loginId: formData.loginId,
    };
    axios
      .post(url, data)
      .then((response) => response.data)
      .then((response) => {
        if (response.result == true) {
          setIsIdDuplicate(true);
          alert("가능한 아이디");
        } else {
          alert("불가능");
        }
      })
      .catch((error) => {
        console.error("중복 검사 중 에러 발생:", error);
        alert("중복 검사에 실패했습니다.");
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = "/api/users";
    const data = {
      loginId: loginId,
      password: password,
      userName: userName,
      phoneNumber: phoneNumber,
    };

    if (isIdDuplicate == false) {
      alert("중복체크하세요");
      return;
    }
    axios
      .post(url, data)
      .then((response) => response.data)
      .then((response) => {
        console.log(response);
        if (response.success == true) {
          const userPK = response.userPk;
          navigate("/login");
        } else if (response.success == false) {
        }
      })
      .catch((error) => console.error(error));
  };

  const inputStyle = (isValid) => ({
    border: isValid ? "1px solid #ccc" : "2px solid red",
  });

  return (
    <div className="signup-container">
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-group">
          <label htmlFor="loginId">아이디</label>
          <input
            type="text"
            name="loginId"
            id="loginId"
            value={formData.loginId}
            onChange={handleChange}
            style={inputStyle(validation.loginIdValid)}
            required
          />
          {errorMessages.loginId && (
            <div style={{ color: "red" }}>{errorMessages.loginId}</div>
          )}
          <button type="button" onClick={checkDuplicateId}>
            중복 확인
          </button>
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            style={inputStyle(validation.passwordValid)}
            required
          />
          {errorMessages.password && (
            <div style={{ color: "red" }}>{errorMessages.password}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="password">비밀번호 확인</label>
          <input
            type="password"
            name="passwordConfirm"
            id="passwordConfirm"
            value={formData.passwordConfirm}
            onChange={handleChange}
            style={inputStyle(validation.passwordConfirmValid)}
            required
          />
          {errorMessages.passwordConfirm && (
            <div style={{ color: "red" }}>{errorMessages.passwordConfirm}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="userName">이름</label>
          <input
            type="text"
            name="userName"
            id="userName"
            value={formData.userName}
            onChange={handleChange}
            required
          />
          {errorMessages.userName && (
            <div style={{ color: "red" }}>{errorMessages.userName}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">전화번호</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        {errorMessages.loginId && (
          <div style={{ color: "red" }}>{errorMessages.phoneNumber}</div>
        )}
        <button type="submit" className="submit-button">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
