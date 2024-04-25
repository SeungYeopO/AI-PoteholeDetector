import styled from "styled-components";
import SideNav from "../components/SideNav";

const Background = styled.div`
  display : flex;
  flex-direction : row;
`
const Content = styled.div`
  margin-left : 5rem;
  width : 100vw;
  height : 100vh;
`


const ManageDonePage = () => {
  return (
    <Background>
    <SideNav />
    <Content>완료내역페이지</Content>
  </Background>
  );
};

export default ManageDonePage;