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
  height: 35rem; 
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -55%);
  z-index: 1000;
  
`
const ModalHeader = styled.div`
  width : 100%;
  height : 17%;
  background-color : yellow;
  
`
const ModalVideoList = styled.div`
  width : 100%;
  height : 73%;
  background-color : #28325e;
`
const BtnArea = styled.div`
  width : 100%;
  height : 10%;
  background-color : #99056d;
`
const ModalTitle = styled.div`
  display : flex;
  align-items : center;
  margin-left : 0.5rem;
  font-size : 1.4rem;
  width : 70%;
  height : 50%;
  /* background-color : lightblue; */

`
const SelectDateBox = styled.div`
  width : 80%;
  height : 50%;
  background-color : lightcyan;
`
const Report = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [ismodalOpen, setIsModalOpen] = useState(false);

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
            <SelectDateBox></SelectDateBox>
          </ModalHeader>
          <ModalVideoList></ModalVideoList>
          <BtnArea></BtnArea>
        </VideoListModal>
      )}
   </Background>
  );
};

export default Report;