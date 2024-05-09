
import styled from "styled-components";
import { useState } from "react";
import { useNavigate} from 'react-router-dom';
import backImg from '../assets/background/loginBackImg3.jpg';
import Logo from '../assets/background/Loginlogo1.png'


const Background = styled.div`
  background-image : url(${backImg});
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
const Container = styled.div`
  display : flex;
  width : 82%;
  height : 60%;
  /* background-color : yellow; */
  align-items : center;
  justify-content : space-around;
`
const LogoImgBox = styled.div`
  width : 45%;
  height : 100%;
  /* background-color : pink; */
  display : flex;
  align-items : center;
  justify-content : center;
  margin-right : 3rem;
`
const LogoImg = styled.img`
    width : 550.7px;
    height : 517px;
`

const LoginDiv = styled.div`
  margin-top : 1rem;
  width : 40%;
  height : 100%;
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
  background-color : #ffffff;
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
  background-color : #f3648c;
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
  
  const gotoLogin = async () => {
    const userData = {
      loginId : userId,
      password : password,
    };
    try{
      const response = await fetch('/api/managers/login',{
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(userData),
      });
      if(response.ok){
        const responseData = await response.json();
        console.log('로그인 성공', responseData);
        navigate('/manager/mode')
      }else{
        console.log('로그인 실패')
      }
    }catch(error){
      console.error('에러발생', error);
    }
 
  }


  return (
    <Background>
      <Container>
        <LogoImgBox><LogoImg src={Logo}></LogoImg></LogoImgBox>
      <LoginDiv>
          <LoginText>관리자 로그인</LoginText>
          <LoginArea>
            <LoginInput onChange={handleIdChnage} placeholder="관리자 아이디를 입력하세요"></LoginInput>
            <LoginInput type="password" onChange={handlePWChange} placeholder="관리자 암호를 입력하세요"></LoginInput>
          </LoginArea>
          <SaveBtn onClick={gotoLogin}>로그인</SaveBtn>
        </LoginDiv>
      </Container>
    </Background>
  );
};

export default LoginPage;