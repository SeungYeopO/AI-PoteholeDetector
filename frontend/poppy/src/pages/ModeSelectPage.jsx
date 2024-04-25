import styled from "styled-components";
import { useNavigate} from 'react-router-dom';
import roadImg from '../assets/mode/roadImg.png';
import moneyImg from '../assets/mode/moneyImg.png';


const Background = styled.div`
   background-color : #aec1f5;
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
const ModeSelectArea = styled.div`
  background-color : yellow;
  width : 73%;
  height: 58%;
  display : flex;
  justify-content : space-between;

  `
  const ModeText = styled.div`
    font-size : 3.5rem;
    margin-top : 7rem;
  `

const Mode1 = styled.div`
  cursor: pointer;
  background-color : pink;
  border-radius : 1rem;
  width : 40%;
  height : 100%;

`
const Mode1Img = styled.img`

  
`
const Mode2 = styled.div`
  cursor: pointer;
  background-image : url(${moneyImg});
  background-color : pink;
  border-radius : 1rem;
  width : 40%;
  height : 100%;
  background-repeat : no-repeat;
  background-size : cover;
  display : flex;
  justify-content : center;
`


const ModeSelectPage = () => {
  const navigate = useNavigate();
  
  const gotoManagePothole = () => {
    navigate('/manage-report')
  }

  const gotoMangeCompensation = () => {
    navigate('/manage-compensation')
  }

  return (
    <Background>
      <ModeSelectArea>
        <Mode1 onClick={gotoManagePothole}>
          <ModeText>포트홀 관리</ModeText>
          <Mode1Img src={roadImg}></Mode1Img>
        </Mode1>
        <Mode2 onClick={gotoMangeCompensation}>
          <ModeText>보상 관리</ModeText>
        </Mode2>
      </ModeSelectArea>
    </Background>
  );
};

export default ModeSelectPage;