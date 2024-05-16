import { useAuth } from "../component/AuthContext";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from '../../public/img/mainL.png';
import { useEffect } from "react";

const Background = styled.div`
  display : flex;
  flex-direction : row;
  position : fixed;
  left : 0;
  top : 0;
  overflow : hidden;
`

const Container = styled.div`
  width : 80%;
  height : 80%;
  /* background-color : pink; */
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : space-around;
`
const LogoBox = styled.div`
  display : flex;
  align-items : center;
  justify-content : center;
  margin-top : 3rem;
  width : 80%;
  height : 45%;
  /* background-color : lightcoral; */
`

const UserBox = styled.div`
  width : 90%;
  height : 30%;
  /* background-color : lightseagreen; */
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : space-between;
  
`
const LinkBox = styled.div`
  margin-top : 1rem;
  display : flex;
  align-items : center;
  justify-content : center;
  font-size : 3rem;
  width : 100%;
  height : 35%;
  background-color : #ffffff;
  border-radius : 1.5rem;

`
const LogoImg = styled.img`
  width : 22rem;
  height : 22rem;
  
`


const MainScreen = () => {
  const navigate = useNavigate();
  const { user } = useAuth();


  useEffect(() => {
    if (user) {
      navigate('/map');
    }
  });

  const gotoLogin = () => {
    navigate('/login')
  }

  const gotoSignup = () => {
    navigate('/signUp')
  }
  return (

      <Background className="main-screen" style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FDF891"
        
      }}>
        <Container>
          <LogoBox>
            <LogoImg src={Logo}></LogoImg>
          </LogoBox>
          <UserBox>
              <LinkBox onClick={gotoLogin}>로그인</LinkBox>
              <LinkBox onClick={gotoSignup}>회원가입</LinkBox>
          </UserBox>
        </Container>
        {/* <NavbarWithAuth/> */}
      </Background>
  );
};


export default MainScreen;
