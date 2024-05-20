import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from '../assets/background/logoImg2.png'
import profileImg from '../assets/sidenav/profile.png'
import { useState } from "react";


const SideBox = styled.div`
  /* position : fixed; */
  width : 12%;
  height : 100vh;
  left : 0;
  top : 0;
  background-color : #005999;
  display : flex;
  flex-direction : column;
  /* justify-content : center; */
  align-items : center;
  justify-content : space-between;
  overflow : auto;
`
const LogoBox = styled.div`
  width : 100%;
  height : 9%;
  /* background-color : lightcoral; */
  display : flex;
  align-items : center;
  justify-content : space-between;
  cursor: pointer;
  
`

const ListBox = styled.div`
  display : flex;
  flex-direction : column;
  /* background-color : pink; */
  width : 100%;
  height : 60%;

`
const List = styled.div`
  cursor: pointer;
  display : flex;
  border-radius: 0.4rem;
  justify-content : center;
  align-items : center;
  color : white;
  font-size : 1rem;
  background-color: ${(props) => (props.active ? "#083B51" : "#005999")};
  opacity : 90%;
  /* border-radius : 0.5rem; */
  width : 100%;
  height : 14%;
  margin-bottom : 1rem;
  font-size : 1.6rem;

`
const UserInfoBox = styled.div`
  display : flex;
  align-items : center;
  /* background-color : lightblue; */
  width : 100%;
  height : 10%;
  margin-bottom : 1rem;
  justify-content : space-between;
  cursor: pointer;
`

const LogoImg = styled.img`
  margin-left : 0.7rem;
  /* background-color : red; */
  width : 92%;
  height : 70%;  
`

const LogoTitle = styled.div`
  display : flex;
  justify-content : left;
  align-items : center;
  /* background-color : blue; */
  width : 55%;
  font-size : 1.5rem;
  color : white;
  height : 80%;
  margin-right : 0.3rem; 
`
const ProfileImg = styled.img`
  /* background-color : red; */
  width : 28%;
  height : 60%;
  margin-left : 1rem;

`

const ProfileName = styled.div`
  /* background-color : blue; */
  width : 55%;
  height : 70%;
  font-size : 1.5rem;
  color : white;
  display: flex;
  align-items : center;
  justify-content : left;

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

const SideNav = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);

  const gotoManageReport = () => {
    navigate('/manager/report')
  };

  const gotoManageProcess = () => {
    navigate('/manager/process')
  };

  const gotoManageDone = () => {
    navigate('/manager/done')
  };

  const gotoModeSelect = () => {
    navigate('/manager/mode');
  }

  const gotoLogout = () => {
    try {
      document.cookie = "managerPk=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      window.location.href = "/manager/login";
    } catch {
      console.log("로그아웃 실패");
    }

  }
   const logoutModalOpen = () => {
    setModalOpen(true);
   }
   const logoutCloseModalOpen = () => {
    setModalOpen(false);
   }

   const gotoManageComplaint = () => {
    navigate('/manager/complaint')
   }

  return (
    <SideBox>
      <LogoBox>
        <LogoImg onClick={gotoModeSelect} src={logo}></LogoImg>

      </LogoBox>
      <ListBox>
        <List onClick={gotoManageReport} active={location.pathname === "/manager/report"}>신고내역</List>
        <List onClick={gotoManageComplaint} active={location.pathname === "/manager/complaint"}>민원내역</List>

        <List onClick={gotoManageProcess} active={location.pathname === "/manager/process"}>처리내역</List>
        <List onClick={gotoManageDone} active={location.pathname === "/manager/done"}>완료내역</List>
         
      </ListBox>
      <UserInfoBox  onClick={logoutModalOpen}>
        <ProfileImg src={profileImg}></ProfileImg>
        <ProfileName>김싸피</ProfileName>
      </UserInfoBox>
      {modalOpen && (
        <LogoOutModal>
          <LogoutText>로그아웃 하시겠습니까?</LogoutText>
          <LogoutBtnArea>
              <LogoutBtn onClick={gotoLogout}>예</LogoutBtn>
              <LogoutBtn onClick={logoutCloseModalOpen} >아니오 </LogoutBtn>
          </LogoutBtnArea>
        </LogoOutModal>
        )}
        
    </SideBox>
  );
};

export default SideNav;