import styled from "styled-components";


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
  background-color : yellow;
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
  background-color : #083B51;
  opacity : 65%;
  /* border-radius : 0.5rem; */
  width : 100%;
  height : 14%;
  margin-bottom : 1rem;
  font-size : 1.6rem;

`
const UserInfoBox = styled.div`
  background-color : lightblue;
  width : 100%;
  height : 15%;
`

const SideNav = () => {
  return (
    <SideBox>
      <LogoBox>
        로고
      </LogoBox>
      <ListBox>
        <List>신고내역</List>
        <List>처리내역</List>
        <List>완료내역</List> 
      </ListBox>
      <UserInfoBox>
          유저정보
      </UserInfoBox>

    </SideBox>
  );
};

export default SideNav;