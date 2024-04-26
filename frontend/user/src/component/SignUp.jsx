import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [formData, setFormData] = useState({
    loginId: "",
    password: "",
    userName: "",
    phoneNumber: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("회원가입 정보:", formData);
    // 회원가입 처리 로직을 여기에 추가하세요.
    navigate("/"); // 회원가입 성공 후 홈 또는 로그인 페이지로 리디렉션
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
