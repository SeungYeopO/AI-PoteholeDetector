
import styled from "styled-components";
import { useState } from "react";
import { useNavigate} from 'react-router-dom';


const Background = styled.div`
   background-color : #aec1f5;
   width : 100vw;
   height : 100vh;
   top: 0;
   left: 0;
   z-index: -1;
   overflow: hidden;
   position: fixed;
   background-size: cover;
   background-position: center;
   display: flex;
   align-items: center;
   justify-content: center;
`
const LoginDiv = styled.div`
  width : 28.4%;
  height : 58%;
  background-color : #DCDCDC;
  opacity : 50%;
  border-radius : 2rem;
  display : flex;
  flex-direction : column;
  align-items : center;
  /* justify-content : center; */
  
`
const LoginText = styled.div`
  font-size : 4rem;
  margin-top : 3rem;
`
const LoginArea = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  width : 70%;
  height :  40%;
  margin-top : 4rem;
  /* background-color : yellow; */
`
const LoginInput = styled.input`
  margin-bottom : 3rem;
  width : 90%;
  height : 23%;
  background-color : #DCDCDC;
  border-bottom : 0.3rem #A6A2A2 solid;
  border-top: none;
  border-left: none;
  border-right: none;
  font-family : 'BlackHanSans';
  font-size : 1.7rem;
  text-indent : 0.5rem;
  &::placeholder {
    color: #6f6c6c;
    font-family : 'BlackHanSans';
    font-size: 1.7rem;
    font-weight: 300;
  }

`

const SaveBtn = styled.div`
  cursor: pointer;
  border-radius : 10rem;
  width : 30%;
  height : 9%;
  background-color : red;
  margin-top : 3rem;
  color : white;
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 1.8rem;

`

const LoginPage = () => {
  const [userId, setuserId] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleIdChnage = (event) => {
    const id = event.target.value;
    console.log(id);
    setuserId(id);
  }

  const handlePWChange = (event) => {
    const pw = event.target.value;
    console.log(pw);
    setPassword(pw);
  }
  
  const gotoLogin = () => {
    //백에 post 요청
    navigate('./mode')
  }


  return (
    <Background>
      <LoginDiv>
        <LoginText>로그인</LoginText>
        <LoginArea>
          <LoginInput onChange={handleIdChnage} placeholder="관리자 아이디를 입력하세요"></LoginInput>
          <LoginInput onChange={handlePWChange} placeholder="관리자 암호를 입력하세요"></LoginInput>
        </LoginArea>
        <SaveBtn onClick={gotoLogin}>완료</SaveBtn>
      </LoginDiv>
    </Background>
  );
};

export default LoginPage;