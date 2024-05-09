import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logoImg from '../assets/sidenav/logo.png'
import profileImg from '../assets/sidenav/profile.png'

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
  background-color : lightcoral;
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
  margin-bottom : 3rem;
  justify-content : space-between;
`

const LogoImg = styled.img`
  margin-left : 0.3rem;
  /* background-color : red; */
  width : 35%;
  height : 75%;  
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

const SideNav_ver2 = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const gotoManageReport = () => {
    navigate('/manager/compensation-report')
  };


  const gotoManageDone = () => {
    navigate('/manager/compensation-done')
  };

  const gotoModeSelect = () => {
    navigate('/manager/mode');
  }
  return (
    <SideBox>
      <LogoBox>
        <LogoImg src={logoImg}></LogoImg>
        <LogoTitle onClick={gotoModeSelect}>POPPY</LogoTitle>
      </LogoBox>
      <ListBox>
        <List onClick={gotoManageReport} active={location.pathname === "/manager/compensation-report"}>신고내역</List>
        <List onClick={gotoManageDone} active={location.pathname === "/manager/compensation-done"}>처리내역</List>
      
      </ListBox>
      <UserInfoBox>
        <ProfileImg src={profileImg}></ProfileImg>
        <ProfileName>김싸피</ProfileName>
      </UserInfoBox>

    </SideBox>
  );
};

export default SideNav_ver2;