import styled from "styled-components";
import SideNav from "../components/SideNav_ver2";
import { useState, useEffect } from "react";
import closeBtnImg from '../assets/modal/closeBtn.png'
import { useNavigate } from "react-router-dom";
import Calender from 'react-calendar';
import calendarImg from '../assets/modal/calenderImg.png';


import '../../node_modules/react-calendar/dist/Calendar.css';

const Background = styled.div`
  display : flex;
  flex-direction : row;
`
const Content = styled.div`
  margin-left : 5rem;
  /* background-color : #ebeae2; */
  width : 100vw;
  height : 100vh;
`
const TimeArea = styled.div`
  /* background-color : darkgray; */
  width : 100%;
  height : 10%;
  font-size : 1.1rem;
  display : flex;
  align-items : center;  
`
const ListArea = styled.div`
  width : 100%;
  height : 83%;
  display : flex;
  justify-content : center;
  /* background-color : lightcoral; */
  align-items : center;
`
const Page = styled.div`
  /* background-color : red; */
  width : 100%;
  height : 7%;
`
const DateBox = styled.div`
  display : flex;
  align-items : center;
  width : 19%;
  height : 45%;
  /* background-color : #e83e3e; */
  border : 1px solid darkgray;
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
const CalenderModal = styled.div`
  /* background-color: white; */
  opacity: 98%;
  border-radius: 1rem;
  width: 20rem; 
  height: 15rem; 
  position: absolute; /* 부모 요소를 기준으로 위치를 절대값으로 지정 */
  top: calc(25% - 12.8rem); /* 부모 요소의 중앙에서 모달의 절반 높이를 빼줌 */
  left: calc(40% - 10.4rem); /* CalenderImg 버튼의 위치에 따라 조정 */
  z-index: 1000;
`
const SortedList = styled.div`
  /* background-color : lightcyan; */
  width : 95%;
  height : 95%;
  display : flex;
  flex-direction : column;
  justify-content : flex-start;
  gap : 0.4rem;
`
const ListHeader = styled.div`
  font-size : 1.4rem;
  width : 87.5;
  height : 8%;
  display : flex;
  align-items : center;
  justify-content : space-around;

  /* justify-content : center; */

`
const Lists = styled.div`
  cursor: pointer;
  font-size : 1.3rem;
  display : flex;
  align-items : center;
  justify-content : space-around;
  background-color : #F5F5F5;
  width : 100%;
  height : 8%;
  
`
const Info = styled.div`
  width : ${(props) => props.width || '10%'};
  height : ${(props) => props.height || '90%'};
  /* background-color : yellow; */
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 1.3rem;
  color : ${(props) => props.color || 'black'};

`

const PageBtnArea = styled.div`
 cursor: pointer;
  display : flex;
  justify-content : center;
  align-items : center;
`

const Btn = styled.button`
  cursor: pointer;
  
`
const PageNumArea = styled.div`

`
const PageText = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  
`
const ListDetailModal = styled.div`
  background-color: white;
  opacity : 98%;
  border-radius : 1rem;
  border : 1px solid gray;
  width: 55rem; 
  height: 35rem; 
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 1000;
  
`
const ModalHeader = styled.div`
  display : flex;
  width : 100%;
  height : ${(props) => props.height || '11%'};
  background-color :${(props) => props.backgroundColor ||'#3F8CF5'};
  border-top-right-radius : 1rem;
  border-top-left-radius : 1rem;
  flex-direction : row;
  justify-content : space-between;
`
const ModalContent = styled.div`
  display : flex;
  flex-direction  : column;
  width : ${(props) => props.width || '100%'};
  height : ${(props) => props.height || '100%'};
  margin-top  : ${(props) => props.marginTop || '2.4rem'};
  /* background-color : pink; */
  align-items : center;
  
`
const ModalTitle = styled.div`
  display : flex;
  align-items : center;
  font-size :${(props) => props.fontSize || '1.8rem'};
  color : white;
  text-indent : 1.4rem;
  
`
const CloseImg = styled.img`
  cursor: pointer;
  width : ${(props) => props.width || '2.9rem'};
  height : ${(props) => props.height || '2.9rem'};
  margin-right: 1rem;
`
const ArticleArea = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : space-between;
  align-items : center;
  width : 90%;
  height : 60%;
  /* background-color : lightblue; */
  
`
const ArticleList = styled.div`
  font-size : ${(props) => props.fontSize || '1.6rem'};
  display : flex;
  align-items : center;
  width : 100%;
  height : ${(props) => props.height || '25%'};
  /* background-color : lightgoldenrodyellow; */
  border-top : ${(props) => props.borderTop || 'none'};
`
const PlusFileArea = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : space-between;
  align-items : center;
  width : 90%;
  height : 25%;
  /* background-color : lightgreen; */
  
`
const BtnArea = styled.div`
  display : flex;
  justify-content : space-around;
  align-items : center;
  width : 60%;
  height : ${(props) => props.height || '15%'};
  /* background-color : lightcoral; */
  
`
const BtnArea2 = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 100%;
  height : 17%;
  /* background-color : gray; */

`
const SubFile = styled.div`
  display : flex;
  align-items : center;
  width : 100%;
  height : 30%;
  /* background-color : darkgreen; */
  font-size : ${(props) => props.fontSize || '1.4rem'};
  color : ${(props) => props.color || 'black'};
`
const Btn1 = styled.div`
  cursor: pointer;
  width : 30%;
  height : 80%;
  display : flex;
  align-items : center;
  justify-content : center;
  background-color : #79A3DC;
  border-radius : 1rem;
  font-size : 1.6rem;
  color : white;
`
const ReturnModal = styled.div`
  background-color: white;
  opacity : 98%;
  border-radius : 1rem;
  border : 1px solid gray;
  width: 30rem; 
  height: 20rem; 
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 2000;
  
`

const ReturnModalTitle = styled.div`
  width : 100%;
  height : 20%;
  /* background-color : red; */

`
const ReturnModalContent = styled.div`
  width : 100%;
  height : 80%;
  display : flex;
  justify-content : center;
  align-items : center;
  /* background-color : blue; */
`
const Btn2 = styled.div`
  cursor: pointer;
  background-color : black;
  width : 20%;
  height : 90%;
  border-radius : 1rem;
  display : flex;
  justify-content : center;
  align-items : center;
  color : white;
  font-size : 1.2rem;
`
const TitleInput = styled.input`
  width : 97%;
  height : 90%;
  border-bottom : 0.1rem #A6A2A2 solid;
  border-top: none;
  border-left: none;
  border-right: none;
  font-family : 'BlackHanSans';
  font-size : 1.2rem;
  text-indent : 0.4rem;
  &::placeholder {
    color: #898787;
    font-family : 'BlackHanSans';
    font-size: 1.3rem;
    font-weight: 300;
  }
`
const ContentInput = styled.textarea`
  width: 90%;
  height: 90%;
  border: none;
  background-color: #e6e2e2;
  font-family : 'BlackHanSans';
  font-size : 1.1rem;
  text-indent : 0.4rem;
  &::placeholder {
    color: #898787;
    font-family : 'BlackHanSans';
    font-size: 1.2rem;
    font-weight: 300;
  }
`
const CompensationReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const startIndex = (currentPage -1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [returnTitle, setReturnTitle] = useState('');
  const [returnContent, setReturnContent] = useState('');


  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }

  const modalOpen = () => {
    console.log('click')
    if(ismodalOpen === false) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };
  const handleDdateClick = (value) => {
    setSelectedDate(value);
    setIsModalOpen(false);
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          '/data/articledata.json'  // 페이지네이션 위해 데이터 원하는 개수만큼 나눠야함
        );
        if (!response.ok) {
          throw new Error('일단 try 구문은 돌았음');
        }
        const jsonData = await response.json();
        console.log('데이터', jsonData);
        setTotalPages(Math.ceil(jsonData.length / itemsPerPage));
        setData(jsonData);    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 
  
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage -1, 1));
  }
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }

  const handleListClick = (item) => {
    setIsInfoModalOpen(true);
    console.log(item);
    setSelectedList(item);
  }
  
  const closeModal = () => {
    setIsInfoModalOpen(false);
  }
  const closeReturnModal = () => {
    setIsReturnModalOpen(false);
  }

  const openReturnModalOpen = () => {
    setIsReturnModalOpen(true);
  }
  
  const handleReturnTitle = (event) => {
    console.log(event.target.value);
    setReturnTitle(event.target.value);
  }

  const handleReturnContent = (event) => {
    console.log(event.target.value);
    setReturnContent(event.target.value);

  }
  return (
    <Background>
        <SideNav />
        <Content>
        <TimeArea>
        <DateBox>
             <BoxName>날짜</BoxName>
              <DateTable>
                <SortInfo width="75%" height="100%">{selectedDate ? formatDate(selectedDate) : '날짜 선택'}</SortInfo>
                <CalenderImg src={calendarImg} onClick={modalOpen}></CalenderImg>
              </DateTable>
            </DateBox>
        </TimeArea>
        <ListArea>
          <SortedList>
                <ListHeader>
                  <Info>순번</Info>
                  <Info width="48%">제목</Info>
                  <Info width="20%">작성자</Info>
                  <Info width="20%">작성일</Info>
                </ListHeader>
              {currentData && currentData.map((item, index) => (
                <Lists key={index} onClick={()=> handleListClick(item)}>
                  <Info>{(currentPage - 1) * itemsPerPage + index + 1}</Info> 
                  <Info width="48%">{item.title}</Info>
                  <Info width="20%">{item.writer}</Info>
                  <Info width="20%">{item.date}</Info>
                </Lists>
              ))}
          
              </SortedList>
        </ListArea>
            <Page>
            <PageBtnArea>
                  <Btn onClick={handlePrevPage} disabled={currentPage === 1}>
                  이전
                </Btn>
                {Array.from({ length: totalPages }, (_, index) => (
                  <Btn key={index + 1} onClick={() => goToPage(index + 1)}>
                    {index + 1}
                  </Btn>
                ))}
                <Btn onClick={handleNextPage} disabled={currentPage === totalPages}>
                  다음
                </Btn>
              </PageBtnArea>
              <PageNumArea>
              </PageNumArea>
          <PageText>
            페이지: {currentPage} / {totalPages}
          </PageText>
            </Page>
        </Content>
        {ismodalOpen && (
        <CalenderModal>
            <Calender onChange={handleDdateClick}  />
        </CalenderModal>
      )}
       {selectedList&&isInfoModalOpen && (<ListDetailModal>
      <ModalHeader>
            <ModalTitle>보상 신고 처리</ModalTitle>
            <CloseImg src={closeBtnImg} onClick={closeModal}></CloseImg>
          </ModalHeader>
          <ModalContent height="89%" marginTop="0rem">
            <ArticleArea>
              <ArticleList>{selectedList.title}</ArticleList>
              <ArticleList height="15%" fontSize="1.4rem">작성자 : {selectedList.writer}</ArticleList>
              <ArticleList height="55%" fontSize="1.4rem" borderTop="3px solid darkgray">{selectedList.content}</ArticleList>
            </ArticleArea>
            <PlusFileArea>
              <SubFile>[첨부파일]</SubFile>
              <SubFile fontSize="1.3rem" color="#004FC7">{selectedList.video}</SubFile>
              <SubFile fontSize="1.3rem" color="#004FC7">{selectedList.photo}</SubFile>
            </PlusFileArea>
            <BtnArea>
              <Btn1>보상승인</Btn1>
              <Btn1 onClick={openReturnModalOpen}>반려</Btn1>
            </BtnArea>
          </ModalContent>
      </ListDetailModal>
         )}
        {isReturnModalOpen && (<ReturnModal>
          <ModalHeader height="13%" backgroundColor="#91A3BC">
          <ModalTitle fontSize="1.5rem">반려 사유 작성</ModalTitle>
            <CloseImg width ="2rem" height ="2rem" src={closeBtnImg} onClick={closeReturnModal}></CloseImg>
          </ModalHeader>
          <ModalContent marginTop = "0rem" height="70%">
            <ReturnModalTitle>
              <TitleInput onChange={handleReturnTitle} placeholder="제목을 입력하세요"></TitleInput>
            </ReturnModalTitle>
            <ReturnModalContent>
              <ContentInput onChange={handleReturnContent} placeholder="내용을 입력하세요"></ContentInput>
            </ReturnModalContent>
          </ModalContent>
          <BtnArea2 height="17%">
            <Btn2>제출</Btn2>
          </BtnArea2>
        </ReturnModal>)}
    </Background>
  );
};

export default CompensationReportPage;