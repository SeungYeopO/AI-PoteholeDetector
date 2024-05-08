import styled from "styled-components";
import { useState, useEffect } from "react";
import Calender from 'react-calendar';
import '../../node_modules/react-calendar/dist/Calendar.css';
import calendarImg from '../../public/img/calenderImg.png';



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
  justify-content : space-between;
  /* background-color : yellow; */

`
const TextBox = styled.div`
  width : 99%;
  height : ${(props)=> props.height || '9.9%'};
  border-top :  #D8D8D8 0.5px solid;
  border-left : none;
  border-right : none;
  border-bottom : #D8D8D8 0.5px solid;
  display : flex;
  justify-content : space-around;
  align-items  : center;
  /* background-color : lightcoral; */
`
const TitleBox = styled.input` 
  width : 100%;
  height : 99%;
  border-top : #D8D8D8 0.5px solid;
  border-left : none;
  border-right : none;
  
  border-bottom : #D8D8D8 0.5px solid;
  font-family : 'BlackHanSans';
  font-size : 1.5rem;
  text-indent : 1rem;
  &::placeholder {
    color: #7a7979;
    font-family: "BlackHanSans";
    font-size: 1.5rem;

  }
`

const InputBox = styled.textarea`
  width : 100%;
  height : 95%;
  border : none;
  font-family : 'BlackHanSans';
  font-size : 1.3rem;
  text-indent : 1rem;
  margin-top : 1.6rem;
  &::placeholder {
    color: #7a7979;
    font-family: "BlackHanSans";
    font-size: 1.3rem;
  }

`
const FileText = styled.div`
  width : 70%;
  height : 90%;
  /* background-color : yellow; */
  display : flex;
  justify-content : left;
  align-items :  center;
  font-size : 1.4rem;
  color : #7a7979;
  
`
const FileBtn = styled.div`
  width : 15%;
  height : 70%;
  background-color : lightcoral;
  border-radius : 1rem;
  display : flex;
  justify-content : center;
  align-items :  center;
  font-size : 1.3rem;
  color : white;
`
const SaveBtn = styled.div`
  width : 22%;
  height : 75%;
  border-radius : 1.6rem;
  background-color : #949EFF;
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 1.7rem;
  color : white;
`
const VideoListModal = styled.div`
  background-color: #D3D3D3;
  opacity : 98%;
  border-radius : 1rem;
  width: 80%; 
  height: 40rem; 
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -43%);
  z-index: 1000;
  
`
const ModalHeader = styled.div`
  width : 100%;
  height : 17%;
  /* background-color : yellow; */
  
`
const ModalVideoList = styled.div`
  margin-top : 0.3rem;
  width : 100%;
  height : 73%;
  background-color : #28325e;
`
const BtnArea = styled.div`
  width : 100%;
  height : 10%;
  /* background-color : #99056d; */
  display : flex;
  justify-content : center;
  align-items : center;
`
const ModalTitle = styled.div`
  display : flex;
  align-items : center;
  margin-left : 1rem;
  font-size : 1.4rem;
  width : 70%;
  height : 50%;
  /* background-color : lightblue; */

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
  top: calc(30% + 1rem); /* 부모 요소의 중앙에서 모달의 절반 높이를 빼줌 */
  left: calc(40% - 7.5rem); /* CalenderImg 버튼의 위치에 따라 조정 */
  z-index: 1000;
`

const DateBox = styled.div`
  display : flex;
  align-items : center;
  width : 80%;
  height : 40%;
  background-color : lightcyan;
  /* background-color : #e83e3e; */
  border : 1px solid darkgray;
  margin-left : 1rem;
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
const VideoList = styled.div`
  width : 100%;
  height : 20%;
  background-color : lightgreen;
`
const Btn = styled.div`
  width : 20%;
  height : 80%;
  margin-bottom : 0.3rem;
  background-color : #949EFF;
  border-radius : 1rem;
  display : flex;
  align-items : center;
  justify-content : center;
  color : white;
  font-size : 1.34rem;
  `

const Report = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [iscalenderOpen, setIsCalenderOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState('');

    const handleTitle = (event) => {
      console.log(event.target.value);
      setTitle(event.target.value);
    };
    
    const handleContent = (event) => {
      console.log(event.target.value);
      setContent(event.target.value);
    };

    const chooseImage = () => {
        console.log('click');
    };

    const chooseVideo = () => {
      console.log('video Click');
      setIsModalOpen(true);
    }

    const closeModal = () => {
      setIsModalOpen(false);
    };
    
    const modalOpen = () => {
      setIsCalenderOpen(true);
    };
    const handleDateClick = (value) => {
      setSelectedDate(value);
      setIsCalenderOpen(false);
    };

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}.${month}.${day}`;
    };
  
    const chooseBlackbox = () => {
      setIsModalOpen(false);
    }

  return (
   <Background>
      <Container>
        <Header>사고신고</Header>
        <ContentBox>
            <TextBox>
              <TitleBox onChange={handleTitle} placeholder="제목을 입력하세요"></TitleBox>
            </TextBox>
            <TextBox height="59%">
              <InputBox onChange={handleContent} placeholder="내용을 입력하세요"></InputBox>
            </TextBox>
            <TextBox>
                  <FileText>사고 사진을 첨부하세요</FileText>
                  <FileBtn onClick={chooseImage}>첨부</FileBtn>
            </TextBox>
            <TextBox>
                  <FileText>블랙박스 영상을 첨부하세요</FileText>
                  <FileBtn onClick={chooseVideo}>첨부</FileBtn>
            </TextBox>
            <TextBox>
              <SaveBtn>제출</SaveBtn>
            </TextBox>
        </ContentBox>
      </Container>
      {ismodalOpen && (
        <VideoListModal>
          <ModalHeader>
            <ModalTitle>블랙박스 영상 자료 선택</ModalTitle>
            <DateBox>
             <BoxName>날짜</BoxName>
              <DateTable>
                <SortInfo width="75%" height="100%">{selectedDate ? formatDate(selectedDate) : '날짜 선택'}</SortInfo>
                <CalenderImg src={calendarImg} onClick={modalOpen}></CalenderImg>
              </DateTable>
            </DateBox>
          </ModalHeader>
          <ModalVideoList>
            {/* 영상 어떻게 들어오는지 보고 추가 */}
            <VideoList></VideoList> 
          </ModalVideoList>
          <BtnArea>
            <Btn onClick={chooseBlackbox}>선택</Btn>
          </BtnArea>
        </VideoListModal>
      )}
    {iscalenderOpen && (
        <CalenderModal>
            <Calender onChange={handleDateClick}  />
        </CalenderModal>
      )}
   </Background>
  );
};

export default Report;