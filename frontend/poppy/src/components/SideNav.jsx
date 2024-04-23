import styled from "styled-components";


const SideBox = styled.div`
  background-color : #005999;
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
`
const List = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  color : white;
  font-size : 1rem;
`


const SideNav = () => {
  return (
    <SideBox>
      <List>신고내역</List>
      <List>처리내역</List>
      <List>완료내역</List>
      

    </SideBox>
  );
};

export default SideNav;