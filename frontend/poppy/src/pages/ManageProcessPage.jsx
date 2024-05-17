import styled from "styled-components";
import React from "react";
import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import Calender from 'react-calendar';
import '../../node_modules/react-calendar/dist/Calendar.css';
import calendarImg from '../assets/modal/calenderImg.png';
import closeBtnImg from '../assets/modal/closeBtn.png';
import reloadImg from '../assets/modal/reload.png'
import spinner from '../assets/background/loading1.gif';
import reloadImg1 from '../assets/background/reload.png';
import reloadImg2 from '../assets/background/reload3.png';



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
const ResultArea = styled.div`
  display : flex;
  flex-direction : column;
  justify-content : center;
  align-items : center;
  /* background-color : pink; */
  width : 95%;
  height: 73%;
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
  /* border : 1px solid darkgray; */
`
const LocationBox = styled.div`
  display : flex;
  width : 34%;
  height : 30%;
  /* background-color : #e1e153; */
`
const StateBox = styled.div`
  display : flex;
  justify-content : space-around;
  width : 13%;
  height : 30%;
  /* background-color : lightgrey; */
`
const SearchBtn = styled.div`
  cursor: pointer;
  border-radius : 1rem;
  font-size : 1.4rem;
  display : flex;
  justify-content : center;
  align-items : center;
  width : 45%;
  height : 100%;
  background-color : #ffffff;
  border : 1px solid #A1A1A1;
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
  background-color : #005999;
  color : white;
  /* border : 1px solid #A1A1A1; */
  font-size : 1.1rem;

`
const BoxName1 = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 12.5%;
  height : 100%;
  font-size : 1.1rem;
  background-color : #005999;
  /* border : 1px solid #A1A1A1; */
  color : white;
`
const DateTable = styled.div`
  background-color :  #ffffff;
  width : 75%;
  height : 100%;
  display : flex;
  border : 1px solid #A1A1A1;
  
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
const SortedList = styled.div`
  /* background-color : lightcyan; */
  width : 95%;
  height : 95%;
  display : flex;
  flex-direction : column;
  justify-content : flex-start;
  gap : 0.4rem;
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



const ListDetailModal = styled.div`
  background-color: white;
  opacity : 98%;
  border-radius : 1rem;
  border : 1px solid darkgray;
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
const CloseImg = styled.img`
  cursor: pointer;
  width : 2.9rem;
  height : 2.9rem;
  margin-right: 1rem;
`
const ModalContent = styled.div`
  display : flex;
  flex-direction  : column;
  width : 100%;
  height : 89%;
  
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
  background-color : #c2c1c1;
`
const ModalTable = styled.table`
  width : 54%;
  height : 100%;
  background-color :#EFEFEF;
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

const ReFilterBtn = styled.div`
  cursor: pointer;
  width : 30%;
  height : 100%;
  /* background-color : yellow; */
  display : flex;
  justify-content : center;
  align-items : center;
`
const RefilterImg = styled.img`
  cursor: pointer;
  width : 2.1rem;
  height : 2.1rem;
  /* background-color : red; */
`

const Loading = styled.div`
  width : 95%;
  height: 73%;
  display : flex;
  justify-content : center;
  align-items : center;
`

const Page = styled.div`
  width: 100%;
  height: 7%;
  padding: 1rem 0;
`;

const PageBtnArea = styled.div`
  height : 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem; /* 버튼 간의 간격 */
`;


const Button = styled.button`
  cursor: pointer;
  padding: 0.5rem 1rem;
  border: 2px solid #2F80ED; 
  background-color: white;
  color: #2F80ED;
  border-radius: 5px;
  font-size: 1rem;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #0067F2;
    color: white;
  }

  &:disabled {
    border-color: #c0c0c0;
    color: #c0c0c0;
    cursor: not-allowed;
    background-color: #f9f9f9;
  }
`;

const PrevBtn = styled(Button)`
  /* 추가 스타일링이 필요하면 여기에 추가 */
`;

const PageBtn = styled(Button)`
  /* 추가 스타일링이 필요하면 여기에 추가 */
`;

const NextBtn = styled(Button)`
  /* 추가 스타일링이 필요하면 여기에 추가 */
`;

const ManageProcessPage = () => {
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [areas, setAreas] = useState([]);
  const [subAreas, setSubAreas] = useState([]);
  const [data, setData] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const startIndex = (currentPage -1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [selectedList, setSelectedList] = useState(null);
  const [randomCompany, setRandomCompany] = useState('');
  const company = ['아무건설', '싸피건설', '삼성건설', '난몰라건설', '뭐라해건설'];
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setTimeout(async () => {
          const response = await fetch(
            '/api/potholes/ing-state'  // 페이지네이션 위해 데이터 원하는 개수만큼 나눠야함
          );
          if (!response.ok) {
            throw new Error('일단 try 구문은 돌았음');
          }
          const jsonData = await response.json();
          console.log('데이터', jsonData.state1Potholes);
          setData(jsonData.state1Potholes); 
          console.log(Math.ceil(jsonData.length / itemsPerPage))
          setTotalPages(Math.max(Math.ceil(jsonData.state1Potholes.length / itemsPerPage), 1));
          setIsLoading(false);
        }, 300)
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
    console.log('선택 날짜', value)
    setIsModalOpen(false);
  }
  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }

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

  const handleRegionSelect = (event) => {
    console.log(event.target.value);
    console.log('상위지역', event.target.value);
    setSelectedRegion(event.target.value);
    const sub = areas.find((area) => area.name === event.target.value)?.subArea || [];
    setSubAreas(sub);
    setSelectedDistrict(null);

  }

  const handleDistrictSelect = (event) => {
    console.log('하위지역', event.target.value);
    setSelectedDistrict(event.target.value);
  }
  
  const handleStateSelect = (event) => {
    console.log(event.target.value);
    setSelectedState(event.target.value);
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
  
  

  const handleListClick = (item) => {
    setIsInfoModalOpen(true);
    console.log(item);
    setSelectedList(item);
    const value = company[Math.floor(Math.random() * company.length)];
    console.log(value);
    setRandomCompany(value);
  
  }

  const gotoDone = async () => {
    const userData = {
      potholePk : selectedList.potholePk,
      state : "공사완료"
    };
    try{
      const response = await fetch("/api/potholes", {
        method : "PATCH",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(userData),
      });
      if (response.ok){
        const responseData = await response.json();
        console.log(responseData); 
        window.location.reload();
      }else{
        console.log('데이터수정실패')
      }
    } catch (error) {
      console.error('에러발생', error);
    }

  }
  
  const gotoSearch = async () => {
    
    const userData = {
      state : '공사중',
      province : selectedRegion,
      city : selectedDistrict,
      detectedAt : format2Date(selectedDate)
    };
    try {
      setIsLoading(true);
      setTimeout(async () =>  {
        const response = await fetch('/api/potholes/choose', {
          method : "POST",
          headers : {
            "Content-Type" : "application/json",
          },
          body : JSON.stringify(userData),
        });
        if (response.ok){
          const responseData = await response.json();
          console.log('여기서 걸림');
          console.log('조회된 데이터', responseData.filteredDate)
          console.log(format2Date(selectedDate));
          setData(responseData.filteredDate);
          setIsLoading(false);
  
        }else{
          console.log('데이터조회실패')
        }
      }, 500)
    }catch (error) {
      console.error('에러발생', error);
    }

  }

  const closeModal = () => {
    setIsInfoModalOpen(false);
  }
 
  const gotoRefilter = () => {
      window.location.reload();
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
            <StateBox>
            <SearchBtn onClick={gotoSearch}>검색</SearchBtn>
             <ReFilterBtn onClick={gotoRefilter}><RefilterImg src={reloadImg2}></RefilterImg></ReFilterBtn> 
            </StateBox>
          </SortedBox>
        </SortedArea>
        {isLoading ? (
          <Loading>
            <h1>잠시만 기다려 주세요...</h1>
            <img src={spinner} alt="loading" />
          </Loading>
        ):(
          <React.Fragment>
             <ResultArea>
            <SortedList>
              <ListHeader>
                <Info>상태</Info>
                <Info width="40%">신고위치</Info>
                <Info width="28%">신고시각</Info>
                <Info>담당자명</Info>
              </ListHeader>
            {currentData &&  currentData.length === 0 ? (<Lists>"결과가 없습니다"</Lists>) : (
              currentData.map((item, index) => ( 
                <Lists key={index} onClick={()=> handleListClick(item)}>
                  <Info>{item.state}</Info>
                  <Info width="40%">{item.province} {item.city} {item.street}</Info>
                  <Info width="28%">{item.detectedAt.slice(0,10)}  {item.detectedAt.slice(11,16)}</Info>
                  <Info>김싸피</Info>
                </Lists>
              ))
            ) }
            </SortedList>
        </ResultArea>
          <Page>
        <PageBtnArea>
          <PrevBtn onClick={handlePrevPage} disabled={currentPage === 1}>
          이전
          </PrevBtn>
          {Array.from({ length: totalPages }, (_, index) => (
            <PageBtn key={index + 1} onClick={() => goToPage(index + 1)}>
              {index + 1}
            </PageBtn>
          ))}
          <NextBtn onClick={handleNextPage} disabled={currentPage === totalPages}>
            다음
          </NextBtn>
        </PageBtnArea>
      </Page>
          </React.Fragment>
        )}

      </Content>
      {ismodalOpen && (
        <CalenderModal>
            <Calender  calendarType="gregory" showNeighboringMonth={false} onChange={handleDdateClick}  />
        </CalenderModal>
      )}
      {randomCompany&&selectedList&&isInfoModalOpen && (<ListDetailModal>
      <ModalHeader>
            <ModalTitle>세부 처리 내역</ModalTitle>
            <CloseImg src={closeBtnImg} onClick={closeModal}></CloseImg>
          </ModalHeader>
          <ModalContent>
            <ModalContentBox>
              <ModalContainer>
                  <ModalImg src={`http://d1vcrv9kpqlkt7.cloudfront.net/${selectedList.province}+${selectedList.city}+${selectedList.street}/${selectedList.longitude}_${selectedList.latitude}.jpg`} alt="No image"></ModalImg>
                    <ModalTable>
                        <TableRow>
                          <TableCell1>담당자명</TableCell1>
                          <TableCell2>김싸피</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>신고위치</TableCell1>
                          <TableCell2>{selectedList.province} {selectedList.city} {selectedList.street}</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>신고시각</TableCell1>
                          <TableCell2>{selectedList.detectedAt.slice(0,10)} {selectedList.detectedAt.slice(11,19)}</TableCell2>
                        </TableRow>
                        {/* <TableRow>
                          <TableCell1>담당부서</TableCell1>
                          <TableCell2>아직모름(백에서처리)</TableCell2>
                        </TableRow> */}
                        <TableRow>
                          <TableCell1>시공업체</TableCell1>
                          <TableCell2>삼성건설</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>시작예정일</TableCell1>
                         {selectedList.startAt && (
                          <TableCell2>{selectedList.startAt.slice(0,10)}</TableCell2>
                           )} 
                          
                        </TableRow>
                        <TableRow>
                          <TableCell1>완료예정일</TableCell1>
                          {selectedList.expectAt && (
                          <TableCell2>{selectedList.expectAt.slice(0,10)}</TableCell2>
                          )}
                        </TableRow>
                    </ModalTable>
              </ModalContainer>
            </ModalContentBox>
            <BtnBox>
              <BtnArea>
                {/*각 버튼 클릭시 백에 요청할거 정해지면 추가 */}
                {/* 처음에 들어오면 모두 공사대기, 공사예정일/완료일 랜덤으로 설정한다음에 */}
                {/* 그냥 시간 지나가면 공사중으로 바뀌고, 완료버튼을 누르면 완료내역으로 가기 */}
                {/* 완료일보다 공사완료버튼을 누른게 더 이후라면 몇일 지연됐는지 보여주면 될듯? (미정) */}
                <ModalBtn onClick={gotoDone}>공사완료</ModalBtn>
                {/* 공사완료 여부 바꿔주는 api 요청 */}
              </BtnArea>
            </BtnBox>
          </ModalContent>
      </ListDetailModal>
      )}
    </Background>
  );

}
export default ManageProcessPage; 