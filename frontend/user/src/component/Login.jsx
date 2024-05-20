import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import axios from "axios";
import logo from "../../public/img/loginlogo.png";

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #ffc700;
  flex-direction: column;
`;

const Container = styled.div`
  width: 85%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* background-color : red; */
  margin-bottom: 1rem;
`;

const LoginTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  width: 65%;
  height: 20%;
  /* background-color : red; */
`;

const ContentBox = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  /* background-color : red; */
`;

const Box = styled.div`
  width: 95%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: left;
`;

const InputBox = styled.input`
  width: 90%;
  height: 45%;
  border-radius: 1.1rem;
  border: none;
  background-color: #ffffff;
  border: solid 1px #f5eaea;
  font-size: 1.4rem;
  font-family: "BlackHanSans";
  text-indent: 0.3rem;
  outline: none;

  &:focus {
    border: 1px solid blue;
  }

  &::placeholder {
    color: #6f6c6c;
    font-family: "Nanum";
    font-size: 1.3rem;
    font-weight: 300;
  }
`;

const Text = styled.div`
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 1.5rem;
  font-weight: 500;
  width: 30%;
  height: 40%;
`;

const SubmitBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  margin-top: 5rem;
  width: 35%;
  height: 13%;
  border: none;
  background-color: #ffffff;
  font-family: "Nanum";
  font-size: 2rem;
`;

const Foot = styled.div``;
const LoginLogo = styled.div`
  margin-top: 2rem;
  width: 90%;
  height: 20%;
  /* background-color : red; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LogoImg = styled.img`
  width: 11rem;
  height: 11rem;
`;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
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
          alert("아이디나 비밀번호가 일치하지 않습니다");
        }
      })
      .catch((error) => console.error(error));
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleLogin(event);
    }
  };

  return (
    <Background>
      <LoginLogo>
        <LogoImg src={logo}></LogoImg>
      </LoginLogo>
      <Container>
        <LoginTitle>로그인</LoginTitle>
        <ContentBox>
          <Box>
            <Text>아이디</Text>
            <InputBox
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder="아이디를 입력하세요"
            />
          </Box>
          <Box>
            <Text>비밀번호</Text>
            <InputBox
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              required
            />
          </Box>
          <SubmitBtn onClick={handleLogin}>제출</SubmitBtn>
        </ContentBox>
      </Container>
      <Foot></Foot>
    </Background>
  );
};

export default Login;
