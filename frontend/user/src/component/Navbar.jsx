
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import icon1 from '../../public/icons/navicon1.png';
import icon2 from '../../public/icons/navicon2.png';
import icon3 from '../../public/icons/navicon3.png';
import icon4 from '../../public/icons/navicon4.png';

const Nav = styled.div`
  position : fixed;
  left : 0;
  bottom : 0;
  display: flex;
  width : 100%;
  height : 5rem;
  justify-content: space-around;
  background: #d7dbec;
`
const Content = styled.div`
  width : 20%;
  height : 100%;
  background-color: ${(props) => (props.active ? "#eeb7bc" : "#d7dbec")};
  /* background-color : lightcoral; */
  display : flex;
  flex-direction : column;
  justify-content : space-around;
  border-radius : 1rem;
  align-items : center;
`
const Text = styled.div`
  width : 100%;
  height : 30%;
  /* background-color : red; */
  display : flex;
  justify-content : center;
  align-items : center;

`
const Icon = styled.img`
  margin-top : 0.3rem;
  width : 3rem;
  height : 3rem;
  /* background-color : blue; */
`

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();

  const gotoMap = () => {
    navigate('/map');
  }
  
  
  const gotoReport = () => {
    navigate('/report')
  }
  
  const gotoReportList = () => {
    navigate('/reports')

  }
  
  const gotoBlackbox = () => {
    navigate('/blackbox')

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
      <Content onClick={gotoReportList} active={location.pathname === "/reports"}>
        <Icon src={icon3}></Icon>
        <Text>신고내역</Text>
      </Content>
      <Content onClick={gotoBlackbox} active={location.pathname === "/blackbox"}>
        <Icon src={icon4}></Icon>
        <Text>블랙박스</Text>
      </Content>

    
    </Nav>
  );
}

export default Navbar;
