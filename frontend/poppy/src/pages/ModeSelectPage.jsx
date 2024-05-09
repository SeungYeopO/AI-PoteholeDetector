import styled from "styled-components";
import { useNavigate} from 'react-router-dom';
import backImg from '../assets/background/loginBackImg3.jpg';
import moneyImg from '../assets/mode/money.png';
import potholeImg from '../assets/mode/pothole.png';

const Background = styled.div`
  background-image : url(${backImg});
   /* background-color : #aec1f5; */
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
  /* background-color : yellow; */
  width : 73%;
  height: 53%;
  display : flex;
  justify-content : space-between;

  `
  const ModeText = styled.div`
    width : 100%;
    height : 20%;
    /* background-color : yellow; */
    display : flex;
    justify-content : center;
    align-items : center;
    font-size : 3.5rem;

  `
  const ModeImg = styled.img`
    margin-top : 2rem;
    width : 300px;
    height : 300px;

  `
    
  

const Mode = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : space-around;
  align-items : center;
  cursor: pointer;
  /* background-color : pink; */
  border-radius : 1rem;
  width : 40%;
  height : 100%;
  font-size : 2.5rem;
  box-shadow : 0px 5px 2px rgba(0, 0, 0, 0.2);
  border-radius : 8rem;

`
const Mode1 = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : space-around;
  align-items : center;
  cursor: pointer;
  /* background-color : pink; */
  border-radius : 1rem;
  width : 40%;
  height : 100%;
  font-size : 2.5rem;
  box-shadow : 0px -5px 2px rgba(0, 0, 0, 0.2);
  border-radius : 8rem;
`

const ModeImgBox = styled.div`
  width : 70%;
  height : 70%;
  /* background-color : red; */
  display : flex;
  justify-content : center;
  align-items : center;
`



const ModeSelectPage = () => {
  const navigate = useNavigate();
  
  const gotoManagePothole = () => {
    navigate('/manager/report')
  }

  const gotoMangeCompensation = () => {
    navigate('/manager/compensation-report')
  }

  return (
    <Background>
      <ModeSelectArea>
        <Mode onClick={gotoManagePothole}>
          <ModeImgBox><ModeImg src={potholeImg} ></ModeImg></ModeImgBox>
          <ModeText>
          포트홀 관리</ModeText>
        </Mode>
        <Mode1 onClick={gotoMangeCompensation}>
        <ModeImgBox><ModeImg src={moneyImg}></ModeImg></ModeImgBox>
          <ModeText boxShadow="5px 0px 2px rgba(0, 0, 0, 0.5)">
          보상 관리</ModeText>
        </Mode1>
      </ModeSelectArea>
    </Background>
  );
};

export default ModeSelectPage;