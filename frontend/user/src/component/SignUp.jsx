import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
function SignUp() {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    userName: "",
    phoneNumber: "",
  });
  const [isIdDuplicate, setIsIdDuplicate] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
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

    axios
      .post(url, data)
      .then((response) => response.data)
      .then((response) => {
        console.log(response);
        if (response.success == true) {
          const userPK = response.userPk;
          login(userPK);
          navigate("/map");
        } else if (response.success == false) {
          setModalOpen(true);
        }
      })
      .catch((error) => console.error(error));
  };

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
            required
          />
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
            required
          />
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
        <button type="submit" className="submit-button">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default SignUp;
