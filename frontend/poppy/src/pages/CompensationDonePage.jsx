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
const ListArea = styled.div`
  width : 100%;
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
const PageNumArea = styled.div`

`
const PageText = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
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

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };

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
                  <Info>상태</Info>
                  <Info width="48%">신고위치</Info>
                  <Info width="20%">작성일</Info>
                </ListHeader>
              {currentData && currentData.map((item, index) => (
                <Lists key={index} onClick={()=> handleListClick(item)}>
                  <Info color={color}>{item.state}</Info>
                  <Info width="48%">{item.title}</Info>
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
    </Background>
  );
};
export default CompensationDonePage;