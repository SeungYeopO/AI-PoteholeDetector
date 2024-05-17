
import styled from "styled-components";
import { useState } from "react";
import { useNavigate} from 'react-router-dom';
import backImg from '../assets/background/loginBackImg3.jpg';
import Logo from '../assets/background/Loginlogo1.png'
import logo from '../assets/background/logoImg.png';
import { useEffect } from "react";
import { useCookies } from 'react-cookie';

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
    width : 778px;
    height : 269px;
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
  background-color : #db6464;
  margin-top : 3rem;
  color : white;
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 1.8rem;
`
const LogoOutModal = styled.div`
  background-color: white;
  opacity : 98%;
  border-radius : 1rem;
  border : 1px solid gray;
  width: 20rem; 
  height: 13rem; 
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 1000;
  display : flex;
  flex-direction : column;
  justify-content : space-around;
  align-items : center;

  
`
const LogoutText = styled.div`
  width : 80%;
  height : 60%;
  margin-top : 1rem;
  /* background-color : yellow; */
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 1.5rem;

  
`
const LogoutBtnArea = styled.div`
  width : 70%;
  height : 30%;
  /* background-color : red; */
  margin-bottom : 1rem;
  display : flex;
  justify-content : space-around;
  align-items : center;
  
`
const LogoutBtn = styled.div`
color : white;
cursor: pointer;
width : 35%;
height : 80%;
border-radius : 1.5rem;
background-color : #db6464;
font-size : 1.5rem;
justify-content : center;
align-items : center;
display : flex;

  
`

const LoginPage = () => {
  const [userId, setuserId] = useState('');
  const [password, setPassword] = useState('');
  const [cookies, setCookies] = useCookies([]);
  const [modalOpen, setModalOpen] = useState(false);
  let navigate = useNavigate();

  useEffect( () => {
    if(cookies.managerPk) {
      console.log('쿠키에 정보 있음');
      navigate('/manager/mode');
    
    } else{
      console.log('쿠키에 정보 없음')
    }

  },[])

  const setCookie = (name, value) => {
    const options = {
      path: '/',
      maxAge: 86400,
      secure: true
    };

    let cookieString = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let key in options) {
      cookieString += "; " + key;
      let optionValue = options[key];
      if (optionValue !== true) {

        cookieString += "=" + optionValue;
      } else {
        console.log('쿠키 못넣음')
      }
    }

    document.cookie = cookieString;

  } 

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

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      gotoLogin();
    }
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  const gotoLogin = async () => {
    const userData = {
      loginId: userId,
      password: password,
    };
  
    try {
      const response = await fetch('/api/managers/login', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) { // 응답이 성공적인 경우
        const responseData = await response.json();
        
        if (responseData.result) {
          console.log('로그인 성공', responseData);
          setCookie('managerPk', responseData.managerPk);
          navigate('/manager/mode');
        } else {
          console.log('로그인 실패');
          setModalOpen(true);
        }
      } else { // 응답이 실패한 경우
        console.log('로그인 실패');
        setModalOpen(true);
      }
    } catch (error) {
      console.error('에러발생', error);
    }
  };
  


  return (
    <Background>
      <Container>
        <LogoImgBox><LogoImg src={logo}></LogoImg></LogoImgBox>
      <LoginDiv>
          <LoginText>관리자 로그인</LoginText>
          <LoginArea>
            <LoginInput onChange={handleIdChnage} placeholder="관리자 아이디를 입력하세요"></LoginInput>
            <LoginInput type="password" onKeyDown={handleOnKeyDown}  onChange={handlePWChange} placeholder="관리자 암호를 입력하세요"></LoginInput>
          </LoginArea>
          <SaveBtn onClick={gotoLogin}>로그인</SaveBtn>
        </LoginDiv>
      </Container>
      {modalOpen && (
        <LogoOutModal>
          <LogoutText>아이디 또는 비밀번호가 <br/> 일치하지 않습니다</LogoutText>
          <LogoutBtnArea>
              <LogoutBtn onClick={closeModal}>닫기</LogoutBtn>
             
          </LogoutBtnArea>
        </LogoOutModal>
        )}
    </Background>
  );
};

export default LoginPage;