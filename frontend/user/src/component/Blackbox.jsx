import styled from "styled-components";
import Calender from 'react-calendar';
import '../../node_modules/react-calendar/dist/Calendar.css';
import calendarImg from '../../public/img/calenderImg.png';
import { useState } from "react";
import blackboxImg from '../../public/img/blackbox.png'

const Background = styled.div`
  position : fixed;
  left : 0;
  top : 0;
  width : 100vw;
  height : 100vh;
`
const Container = styled.div`
  width : 100%;
  height : 91%;
  display : flex;
  flex-direction : column;
  /* background-color : yellow; */
  `
  const Header = styled.div`
  width : 100%;
  height : 10%;
  /* background-color : red; */
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 2rem;
  border : #D8D8D8 1px solid;
`
const ContentBox = styled.div`
  width : 100%;
  height : 90%;
  display : flex;
  flex-direction : column;
  justify-content : space-evenly;
  /* background-color : yellow; */
`
const DateBox = styled.div`
  margin-left : 0.5rem;
  width : 100%;
  height : 10%;
  /* background-color : pink;   */
  display : flex;
  align-items : center;
`
const ListBox = styled.div`
  width : 99%;
  height : 84%;
  /* background-color : pink; */

`
const BoxName = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
 width : ${(props) => props.width || '25%'};
  height : 100%;
  background-color : #8d8c8c;
  font-size : 1.4rem;

`
const DateTable = styled.div`
  background-color :  white;
  width : 75%;
  height : 100%;
  display : flex;
  
`
const CalenderModal = styled.div`
  /* background-color: white; */
  opacity: 98%;
  border-radius: 1rem;
  width: 20rem; 
  height: 15rem; 
  position: absolute; /* 부모 요소를 기준으로 위치를 절대값으로 지정 */
  top: calc(30% - 7rem); /* 부모 요소의 중앙에서 모달의 절반 높이를 빼줌 */
  left: calc(40% - 7.5rem); /* CalenderImg 버튼의 위치에 따라 조정 */
  z-index: 1000;
`
const SortInfo = styled.div`
  width : ${(props) => props.width || '10%'};
  height : ${(props) => props.height || '90%'};
  display : flex;
  text-indent : 0.3rem;
  align-items : center;
  font-size : 1.1rem;

  `
  const CalenderImg = styled.img`
  display : flex;
  cursor: pointer;
  position : relative;
  margin-top : 0.3rem;
  width : 15%;
  height : 70%;
  /* background-color : red; */
  
`
const Box = styled.div`
  width : 80%;
  display : flex;
  height : 60%;
  border : 1px solid darkgray;
`
const List = styled.div`
  display : flex;
  width : 100%;
  height : 14%;
  border : 0.5px solid #D3D3D3;
  background-color : #F4F4F4;
`
const StateArea = styled.div`
  width : 25%;
  height : 100%;
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 1.5rem;
  /* background-color : red; */

`
const ListInfoArea = styled.div`
  width : 75%;
  height : 100%;
`
const TitleArea = styled.div`
  width : 100%;
  height : 100%;
  display : flex;
  justify-content : center;
  align-items : center;
  /* background-color : blue;   */

`
const TitleText = styled.div`
  width : 90%;
  height : 90%;
  display : flex;
  align-items : center;
  font-size : 1.3rem;
  overflow-wrap : break-word; /* 텍스트가 넘치면 숨김 처리 */
  text-overflow: ellipsis; /* 텍스트가 넘칠 경우 '...'로 처리 */
  /* background-color : lightblue; */

`
const BlackboxImg = styled.img`
  width : 6rem;
  height : 4rem;
  /* background-color : white; */
  
`

const Blackbox = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [iscalenderOpen, setIsCalenderOpen] = useState(false);

  const handleDateClick = (value) => {
    setSelectedDate(value);
    setIsCalenderOpen(false);
  }
  const openCalender = () => {
    setIsCalenderOpen(true);
  }
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  return (
    <Background>
      <Container>
        <Header>블랙박스 영상확인</Header>
        <ContentBox>
          <DateBox>
            <Box>
              <BoxName>날짜</BoxName>
              <DateTable>
                <SortInfo width="75%" height="100%">{selectedDate ? formatDate(selectedDate) : '날짜 선택'}</SortInfo>
                <CalenderImg src={calendarImg} onClick={openCalender}></CalenderImg>
              </DateTable>
            </Box>
          </DateBox>
          <ListBox>
            <List>
              <StateArea>
                <BlackboxImg src={blackboxImg}></BlackboxImg>
              </StateArea>
              <ListInfoArea>
                <TitleArea><TitleText>20240411 DSLEJVJSDK-sdjfl121395.mp4</TitleText></TitleArea>
              </ListInfoArea>
            </List>
            {/* List 크기 보려고 해놓은 부분 -> 데이터 받아서는 map 함수로 */}
            {/* 전체 크기 넘어가면 스크롤로 구현 */}
            <List></List>
            <List></List>
            <List></List>
            <List></List>
            <List></List>
            <List></List>
          </ListBox>
        </ContentBox>
      </Container>
      {iscalenderOpen && (
        <CalenderModal>
            <Calender onChange={handleDateClick}  />
        </CalenderModal>
      )}
    </Background>
  );
};

export default Blackbox;