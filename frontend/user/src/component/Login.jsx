import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";

function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ background: "white", padding: 20 }}>
        {children}
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
}

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // 상태 추가: 사용자 아이디와 비밀번호를 저장합니다.
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLogin = async (event) => {
    event.preventDefault();

    const url = "/api/users/login";
    const data = {
      loginId: username,
      password: password,
    };

    axios
      .post(url, data)
      .then((response) => response.data)
      .then((response) => {
        if (response.result == true) {
          const userPK = response.userPk;
          login(userPK);
          navigate("/map");
        } else if (response.result == false) {
          setModalOpen(true);
        }
      })
      .catch((error) => console.error(error));
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

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)}>
        로그인에 실패하였습니다.
      </Modal>
    </form>
  );
}

export default Login;
