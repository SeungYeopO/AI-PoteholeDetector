import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import icon1 from "../../public/icons/navicon1.png";
import icon2 from "../../public/icons/navicon6.png";
import icon3 from "../../public/icons/navicon3.png";
import icon4 from "../../public/icons/navicon4.png";
import icon5 from "../../public/icons/navicon5.png";

const Nav = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 10%;
  justify-content: space-around;
  background: #FFE58A;
`;
const Content = styled.div`
  width: 15%;
  height: 100%;
  background-color: ${(props) => (props.active ? "#FFC700" : "#FFE58A")};
  /* background-color : lightcoral; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border-radius: 1rem;
  align-items: center;
`;
const Text = styled.div`
  width: 100%;
  height: 30%;
  /* background-color : red; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Icon = styled.img`
  margin-top: 0.3rem;
  width: 2.6rem;
  height: 2.6rem;
  /* background-color : blue; */
`;

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
const LogoutBtn = styled.div`
cursor: pointer;
width : 35%;
height : 80%;
border-radius : 1.5rem;
background-color : #FFC700;
font-size : 1.5rem;
color : white;
justify-content : center;
align-items : center;
display : flex;

  
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
const LogoOutModal = styled.div`
  background-color: white;
  opacity : 98%;
  border-radius : 1rem;
  border : 1px solid gray;
  width: 25rem; 
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

function Navbar() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const gotoMap = () => {
    navigate("/map");
  };

  const gotoReport = () => {
    navigate("/report");
  };

  const gotoReportList = () => {
    navigate("/reports");
  };

  const gotoBlackbox = () => {
    navigate("/blackbox");
  };
  
  const clickLogout = () => {
    setModalOpen(true);
  }

  const gotoLogout = () => {

    logout();
    console.log("로그아웃");
    navigate("/");
  };
  const logoutCloseModalOpen = () => {
    setModalOpen(false);
   }


  return (
    <Nav>
      <Content onClick={gotoMap} active={location.pathname === "/map"}>
        <Icon src={icon1}></Icon>
        <Text>지도보기</Text>
      </Content>
      <Content onClick={gotoReport} active={location.pathname === "/report"}>
        <Icon src={icon2}></Icon>
        <Text>사고신고</Text>
      </Content>
      <Content
        onClick={gotoReportList}
        active={location.pathname === "/reports"}
      >
        <Icon src={icon3}></Icon>
        <Text>신고내역</Text>
      </Content>
      <Content
        onClick={gotoBlackbox}
        active={location.pathname === "/blackbox"}
      >
        <Icon src={icon4}></Icon>
        <Text>블랙박스</Text>
      </Content>
      <Content>
        <Icon onClick={clickLogout} src={icon5}></Icon>
        <Text>로그아웃</Text>
      </Content>
     
      
      
      {modalOpen && (
        <LogoOutModal>
          <LogoutText>로그아웃 하시겠습니까?</LogoutText>
          <LogoutBtnArea>
              <LogoutBtn onClick={gotoLogout}>예</LogoutBtn>
              <LogoutBtn onClick={logoutCloseModalOpen} >아니오 </LogoutBtn>
          </LogoutBtnArea>
        </LogoOutModal>
        )}
    </Nav>
  );
}

export default Navbar;
