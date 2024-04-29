import styled from "styled-components";
import SideNav from "../components/SideNav";
import calendarImg from '../assets/modal/calenderImg.png';
import { useState, useEffect } from "react";
import Calender from 'react-calendar';
import '../../node_modules/react-calendar/dist/Calendar.css';
import closeBtnImg from '../assets/modal/closeBtn.png';

const Background = styled.div`
  display : flex;
  flex-direction : row;
`
const Content = styled.div`
  margin-left : 5rem;
  width : 100vw;
  height : 100vh;
`
const SortedArea = styled.div`
  /* background-color : purple; */
  width : 95%;
  height: 20%;
  display : flex;
  justify-content : center;
  align-items : center;
`
const SortedBox = styled.div`
  background-color : #EFEFEF;
  width : 90%;
  height : 70%;
  display : flex;
  align-items : center;
  justify-content : space-around;

`
const DateBox = styled.div`
  display : flex;
  align-items : center;
  width : 19%;
  height : 30%;
  /* background-color : #e83e3e; */
  border : 1px solid darkgray;
`
const LocationBox = styled.div`
  display : flex;
  width : 34%;
  height : 30%;
  /* background-color : #e1e153; */
`
const StateBox = styled.div`
  display : flex;
  width : 15%;
  height : 30%;
  background-color : lightgrey;
`
const SearchBtn = styled.div`
  cursor: pointer;
  border-radius : 1rem;
  font-size : 1.4rem;
  display : flex;
  justify-content : center;
  align-items : center;
  width : 6%;
  height : 30%;
  background-color : green;
`
const AreaDrop = styled.select`
  width : 44%;
  height : 100%;
  font-family : 'BlackHanSans';
  font-size : 1.1rem;
  display : flex;
  justify-content : center;
  align-items : left;
  /* background-color : red; */

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
const BoxName1 = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 12.5%;
  height : 100%;
  font-size : 1.4rem;
  background-color : #8d8c8c;
`
const DateTable = styled.div`
  background-color :  white;
  width : 75%;
  height : 100%;
  display : flex;
  
`
const StateDrop = styled.select`
  font-family : 'BlackHanSans';
  width : 100%;
  height : 100%;
  font-size : 1.1rem;
  text-indent : 0.2rem;
`
const DropArea = styled.div`
  width  :87.5%;
  height : 100%;
  display : flex;
  align-items : center;
  justify-content : space-between;
  
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
  top: calc(25% - 10rem); /* 부모 요소의 중앙에서 모달의 절반 높이를 빼줌 */
  left: calc(40% - 6rem); /* CalenderImg 버튼의 위치에 따라 조정 */
  z-index: 1000;
`
const Option = styled.option`
  cursor: pointer;
  font-family : 'BlackHanSans';
`
const ResultArea = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  /* background-color : pink; */
  width : 95%;
  height: 73%;
`
const Page = styled.div`
  /* background-color : green; */
  width : 95%;
  height : 7%;
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
  height: 30rem; 
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  z-index: 1000;
  
`
const ModalHeader = styled.div`
  display : flex;
  width : 100%;
  height : 11%;
  background-color : #3F8CF5;
  border-top-right-radius : 1rem;
  border-top-left-radius : 1rem;
  flex-direction : row;
  justify-content : space-between;
`
const ModalContent = styled.div`
  display : flex;
  flex-direction  : column;
  width : 100%;
  height : 100%;
  margin-top  : 2.4rem;
  
`
const ModalContentBox = styled.div`
  display : flex;
  justify-content : center;
  /* background-color : blue; */
  width : 100%;
  height : 60%;
`
const BtnBox = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  /* background-color : red; */
  width : 100%;
  height : 40%;
  
`
const ModalContainer = styled.div`

  width : 94%;
  height : 100%;
  /* background-color : yellow; */
  margin-top : 1rem;
  display : flex;
  justify-content : space-between;
  
`
const ModalImg = styled.img`
  width : 43%;
  height : 100%;
  background-color : darkmagenta;
`
const ModalTable = styled.table`
  width : 54%;
  height : 100%;
  background-color :#A1A1A1;
  border-collapse : collapse;
`
const BtnArea = styled.div`
  /* background-color : green; */
  width : 55%;
  height : 35%;
  display : flex;
  justify-content : center;
`
const ModalBtn = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 1.5rem;
  width : 29%;
  height : 100%;
  background-color : #79A3DC;
  color : white;
  border-radius : 1rem;
  cursor: pointer;
`
const TableRow = styled.tr`
  line-height : 0.7rem;
`

const TableCell1 = styled.td`
  font-size : 1.3rem;
  border: 1px solid #dddddd;
  text-align: center;
`
const TableCell2 = styled.td`
  font-size : 1.3rem;
  text-align : left;
  text-indent : 1rem;
  border: 1px solid #dddddd;
`
const ModalTitle = styled.div`
  display : flex;
  align-items : center;
  font-size : 1.8em;
  color : white;
  text-indent : 1.4rem;
  
`
const CloseImg = styled.img`
  cursor: pointer;
  width : 2.9rem;
  height : 2.9rem;
  margin-right: 1rem;
`

const ManageDonePage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [areas, setAreas] = useState([]);
  const [subAreas, setSubAreas] = useState([]);
  const [data, setData] = useState([]);
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const startIndex = (currentPage -1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          '/dummydata/dummydata.json'  // 페이지네이션 위해 데이터 원하는 개수만큼 나눠야함
        );
        if (!response.ok) {
          throw new Error('일단 try 구문은 돌았음');
        }
        const jsonData = await response.json();
        console.log('데이터', jsonData);
        console.log(Math.ceil(jsonData.length / itemsPerPage))
        setTotalPages(Math.ceil(jsonData.length / itemsPerPage));
        setData(jsonData);    
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          '/data/regiondata.json'
        );
        if (!response.ok) {
          throw new Error('일단 try는 돌았음');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setAreas(jsonData);

      } catch(error) {
        console.log('에러발생', error);
      }
    };
    
    fetchData();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }

  
  const handleDdateClick = (value) => {
    setSelectedDate(value);
    setIsModalOpen(false);
  }
  
  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage -1, 1));
  }
  
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))
  }
 

  const modalOpen = () => {
    console.log('click')
    if(ismodalOpen === false) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
    }
  };

  const handleRegionSelect = (event) => {
    console.log(event.target.value);
    setSelectedRegion(event.target.value);
    const sub = areas.find((area) => area.name === event.target.value)?.subArea || [];
    console.log('하위지역',sub);
    setSubAreas(sub);
    setSelectedDistrict("");

  }
  const handleDistrictSelect = (event) => {
    console.log(event.target.value);
    setSelectedDistrict(event.target.value);
  }
  
  const handleListClick = (item) => {
    setIsInfoModalOpen(true);
    console.log(item);
    setSelectedList(item);
  }
  const closeModal = () => {
    setIsInfoModalOpen(false);
  }

  return (
    <Background>
    <SideNav />
    <Content>
    <SortedArea>
          <SortedBox>
            <DateBox>
             <BoxName>날짜</BoxName>
              <DateTable>
                <SortInfo width="75%" height="100%">{selectedDate ? formatDate(selectedDate) : '날짜 선택'}</SortInfo>
                <CalenderImg src={calendarImg} onClick={modalOpen}></CalenderImg>
              </DateTable>
            </DateBox>
            <LocationBox>
              <BoxName1>지역</BoxName1>
              <DropArea>
               <AreaDrop onChange={handleRegionSelect}>
                  <Option value="">지역 선택</Option>
                  {areas.map((area) => (
                    <Option key={area.name} value={area.name}>{area.name}</Option>
                  ))}
               </AreaDrop>
               <AreaDrop onChange={handleDistrictSelect}>
               <Option value="">시,군,구 선택</Option>
               {subAreas.map((subArea) => (
                <Option key={subArea} value={subArea}>{subArea}</Option>
               ))}
               </AreaDrop>
              </DropArea>
            </LocationBox>
            <SearchBtn>검색</SearchBtn>
          </SortedBox>
        </SortedArea>
        <ResultArea>
            <SortedList>
              <ListHeader>
                <Info>상태</Info>
                <Info width="48%">신고위치</Info>
                <Info width="20%">신고시각</Info>
                <Info>담당자명</Info>
              </ListHeader>
            {currentData && currentData.map((item, index) => (
              <Lists key={index} onClick={()=> handleListClick(item)}>
                <Info>공사완료</Info>
                <Info width="48%">{item.reportLocation}</Info>
                <Info width="20%">{item.reportTime}</Info>
                <Info>김싸피</Info>
              </Lists>
            ))}
        
            </SortedList>
        </ResultArea>
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
            <ModalTitle>세부 신고 내역</ModalTitle>
            <CloseImg src={closeBtnImg} onClick={closeModal}></CloseImg>
          </ModalHeader>
          <ModalContent>
            <ModalContentBox>
              <ModalContainer>
                  <ModalImg src={selectedList.potholeImg}></ModalImg>
                    <ModalTable>
                        <TableRow>
                          <TableCell1>담당자명</TableCell1>
                          <TableCell2>김싸피</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>신고위치</TableCell1>
                          <TableCell2>{selectedList.reportLocation}</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>신고시각</TableCell1>
                          <TableCell2>{selectedList.reportTime}</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>담당부서</TableCell1>
                          <TableCell2>아직모름(백에서처리)</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>시공업체</TableCell1>
                          <TableCell2>삼성건설</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>시작예정일</TableCell1>
                          <TableCell2>백과연동</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>완료예정일</TableCell1>
                          <TableCell2>백과연동</TableCell2>
                        </TableRow>
                    </ModalTable>
              </ModalContainer>
            </ModalContentBox>
          </ModalContent>
      </ListDetailModal>
         )}
  </Background>
  );
};

export default ManageDonePage;