import styled from "styled-components";
import SideNav from "../components/SideNav_ver2";
import { useState, useEffect } from "react";
import closeBtnImg from '../assets/modal/closeBtn.png'
import { useNavigate } from "react-router-dom";
import Calender from 'react-calendar';
import calendarImg from '../assets/modal/calenderImg.png';
import spinner from '../assets/background/loading1.gif';
import React from "react";

import '../../node_modules/react-calendar/dist/Calendar.css';


const Background = styled.div`
  display : flex;
  flex-direction : row;
  position : fixed;
  left : 0;
  top : 0;
  overflow : hidden;
`
const Content = styled.div`
  /* margin-left : 5rem; */
  /* background-color : #ebeae2; */
  width : 100vw;
  height : 100vh;
`
const TimeArea = styled.div`
  margin-left : 3rem;
  /* background-color : darkgray; */
  width : 100%;
  height : 10%;
  font-size : 1.1rem;
  display : flex;
  align-items : center;  
`
const GridArea = styled.div`
  margin-top : 0.8rem;
  background-color : white;
  width : 100%;
  height : 83%;
  display : grid;
  flex-wrap : wrap;
  grid-template-columns : repeat(4, 1fr);
  justify-content : center;
  background-color : lightcoral;
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
  background-color : #ffffff;
  border : 1px solid #A1A1A1;
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
  font-size : 1.2rem;
  
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
const ListArea = styled.div`
  margin-left : 2rem;
  width : 90%;
  height : 83%;
  display : flex;
  justify-content : center;
  /* background-color : lightcoral; */
  align-items : center;
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
const SearchBtn = styled.div`
  margin-left : 1rem;
  border-radius : 1rem;
  width : 5%;
  height : 45%;
  background-color : #ffffff;
  border : 1px solid #A1A1A1;
  font-size : 1.3rem;
  display : flex;
  justify-content : center;
  align-items : center;

  
`

const Box = styled.div`
  width : 100%;
  height : 100%;
  /* background-color : yellow; */
  display : flex;
  align-items : center;
`
const PageNumArea = styled.div`

`
const PageText = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  `

  const Loading = styled.div`
  width : 95%;
  height: 73%;
  display : flex;
  justify-content : center;
  align-items : center;
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

const CompensationDonePage = () => {
  const [data, setData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const startIndex = (currentPage -1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [color, setColoredData] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setTimeout(async () => {
           const response = await fetch(
          '/api/accident-report/yes-check'  // 페이지네이션 위해 데이터 원하는 개수만큼 나눠야함
        );
        if (!response.ok) {
          throw new Error('일단 try 구문은 돌았음');
        }
        const jsonData = await response.json();
        console.log('데이터', jsonData.yesCheckState);
        setTotalPages(Math.max(Math.ceil(jsonData.yesCheckState.length / itemsPerPage), 1));
        setData(jsonData.yesCheckState);
        setIsLoading(false);
        }, 500)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

  const format2Date = (date) => {
    if (date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } else{
      return null;
    }
  }

  const modalOpen = () => {
    console.log('click')
    if(ismodalOpen === false) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleListClick = (item) => {
    setIsInfoModalOpen(true);
    console.log(item);
    setSelectedList(item);
  };
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage -1, 1));
  };
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  };

  const closeModal = () => {
    setIsInfoModalOpen(false);
  };
  
  const handleDdateClick = (value) => {
    setSelectedDate(value);
    setIsModalOpen(false);
  }
  
  const gotoSearch = () => {
    const userData = {
      reportDate : format2Date(selectedDate),
      state : '보상완료'
    };
    try {
      setIsLoading(true);
      setTimeout(async () => {
        const response = await fetch('/api/accident-report/date', {
          method : "POST",
          headers : {
            "Content-Type" : "application/json",
          },
          body : JSON.stringify(userData),
        });
        if(response.ok){
          const responseData = await response.json();
          console.log('조회된 데이터', responseData.dateList);
          setData(responseData.dateList)
    
          setIsLoading(false);
        } else{
          console.log('데이터 조회 실패');
        }
      }, 500)
    } catch (error){
      console.log('에러발생', error);
    }
  }

  return (
    <Background>
        <SideNav />
        <Content>
        <TimeArea>
           <Box>
            <DateBox>
              <BoxName>날짜</BoxName>
                <DateTable>
                  <SortInfo width="75%" height="100%">{selectedDate ? formatDate(selectedDate) : '날짜 선택'}</SortInfo>
                  <CalenderImg src={calendarImg} onClick={modalOpen}></CalenderImg>
                </DateTable>
              </DateBox>
              <SearchBtn onClick={gotoSearch}>조회</SearchBtn>
           </Box>
        </TimeArea>
        {isLoading ? (
             <Loading>
             <h1>잠시만 기다려 주세요...</h1>
             <img src={spinner} alt="loading" />
           </Loading>
        ) : (
          <React.Fragment>
             <ListArea>
          <SortedList>
                <ListHeader>
                  <Info>상태</Info>
                  <Info width="48%">제목</Info>
                  <Info width="20%">작성자</Info>
                  <Info width="20%">작성일</Info>
                </ListHeader>
              {currentData && currentData.length === 0 ? (<Lists>"결과가 없습니다"</Lists>) : (
                currentData.map((item, index) => (
                  <Lists key={index} onClick={()=> handleListClick(item)}>
                    <Info color={color}>{item.state}</Info>
                    <Info width="48%">{item.reportContent}</Info>
                    <Info width="20%">{item.userName}</Info>
                    <Info width="20%">{item.reportDate.slice(0,10)}</Info>
                  </Lists>
                ))
              ) }
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

          </React.Fragment>
        ) }
       
        </Content>
        {ismodalOpen && (
        <CalenderModal>
            <Calender  calendarType="gregory" showNeighboringMonth={false} onChange={handleDdateClick}  />
        </CalenderModal>
      )}
    </Background>
  );
};
export default CompensationDonePage;