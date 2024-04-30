import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // 상태 추가: 사용자 아이디와 비밀번호를 저장합니다.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    
    
    const userPK = "your_userPK_from_server"; // 가정: 서버로부터 받은 userPK, 실제 API 응답을 사용해야 함

    login(userPK);
    navigate("/map");
  };

  return (
    <form onSubmit={handleLogin} className="login-form">
      <div id="login">로그인</div>

      <div>아이디</div>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

      <div>비밀번호</div>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <button type="submit">제출</button>
    </form>
  );
}

export default Login;
