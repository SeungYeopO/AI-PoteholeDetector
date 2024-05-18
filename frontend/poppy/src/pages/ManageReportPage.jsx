import styled from "styled-components";
import React from "react";
import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import closeBtnImg from '../assets/modal/closeBtn.png'
import { useNavigate } from "react-router-dom";
import spinner from '../assets/background/loading1.gif';
import poly1 from '../assets/background/Poly2.png';
import poly2 from '../assets/background/Poly3.png';
import dummy from '../../public/dummydata/dummydata.json'

const Background = styled.div`

  display : flex;
  flex-direction : row;
  position : fixed;
  left : 0;
  top : 0;
  overflow : hidden;
`

const Container = styled.div`
  display : flex;
  flex-direction : row;
` 

const Content = styled.div`
  /* margin-left : 5rem; */
  /* background-color : #ebeae2; */
  width : 100vw;
  height : 100vh;
`
const TimeArea = styled.div`
  /* background-color : darkgray; */
  width : 100%;
  height : 6%;
  font-size : 1.1rem;
  display : flex;
  align-items : center;  
  margin-left : 3rem;
`
const GridArea = styled.div`
  margin-top : 0.8rem;
  background-color : white;
  margin-left : 4.2rem;
  width : 90%;
  height : 85%;
  display : grid;
  flex-wrap : wrap;
  grid-template-columns: repeat(auto-fill, minmax(25%, 1fr));
  grid-template-rows: repeat(auto-fill, 50%);

  justify-content : center;
`

const GridCard = styled.div`
  cursor: pointer;
  background-color : #EDEDED;
  border : 1px solid darkgray;
  border-radius : 1rem;
  display : flex;
  height : 90%;
  width : 80%;
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : center;
`

// const Page = styled.div`
//   /* background-color : red; */
//   width : 100%;
//   height : 7%;
// `
const ContentBox = styled.div`
  /* background-color : lightpink; */
  display : flex;
  flex-direction : column;
  align-items : center;
  width : 85%;
  height : 90%;
  justify-content : space-between;

`
const PotholeImg = styled.img`
  /* background-color : darkgoldenrod; */
  width : 85%;
  height : 60%;
  
`
const ListBox = styled.div`
  /* background-color : darkkhaki; */
  width : 95%;
  height : 35%; 
`
const List = styled.div`
  font-size : 1.1rem;
  margin-top : ${(props)=> props.marginTop || '0rem'};
  
`
const InfoModal = styled.div`
  background-color: white;
  opacity : 98%;
  border-radius : 1rem;
  width: 55rem; 
  height: 30rem; 
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-50%, -50%);
  border : 1px solid darkgray;
  z-index: 1000;
`;

const ModalTitle = styled.div`
  display : flex;
  align-items : center;
  font-size : 1.8em;
  color : white;
  text-indent : 1.4rem;
  
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
  margin-top : 0.2rem;
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
  background-color : darkmagenta;
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
  justify-content : space-between;
`
const Btn = styled.div`
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

`
const TableCell1 = styled.td`
  font-size : 1.3rem;
  padding: 1rem;
  border: 1px solid #dddddd;
  text-align: center;
`
const TableCell2 = styled.td`
  font-size : 1.3rem;
  text-align : left;
  text-indent : 1rem;
  border: 1px solid #dddddd;
`
const Page = styled.div`
  width: 100%;
  height: 7%;
  padding: 1rem 0;
  /* background-color : red; */
`;

const PageBtnArea = styled.div`
  height : 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem; /* 버튼 간의 간격 */
`;

const PageNumArea = styled.div`
  height : 50%;

  margin-top: 0.5rem;
  text-align: center;
`;

const PageText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #2F80ED; 
  font-weight: bold;
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

const Loading = styled.div`
   width : 90%;
  height : 87%;
  display : flex;
  justify-content : center;
  align-items : center;
`
const PolyImg = styled.div`
  
`


  const ManageReportPage = () => {
  const navigate = useNavigate();
  const itemsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState('');
  const [totalPages, setTotalPages] = useState(0); // totalPages 상태 추가
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, data.length);
  const currentData = data.slice(startIndex, endIndex);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [selectedGrid, setSelectedGrid] = useState(null);
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [randomCompany, setRandomCompany] = useState('');
  const company = ['아무건설', '싸피건설', '삼성건설', '난몰라건설', '뭐라해건설'];
  const currentDate = new Date();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/dummydata/dummydata.json'); // public 디렉토리 기준 경로

  //       if (response.ok) {
  //         const jsonData = await response.json();
  //         console.log('더미 데이터 가져오기 성공:', jsonData);
  //         setData(jsonData);
  //         setTotalPages(Math.max(Math.ceil(jsonData.length / itemsPerPage), 1));
  //       } else {
  //         console.log('더미 데이터 가져오기 실패');
  //       }
  //     } catch (error) {
  //       console.error('더미 데이터 가져오기 실패:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); 


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); 
        setTimeout(async () => {
          const response = await fetch('/api/potholes/before-state', {
            method: 'GET',
            headers: {
              "Content-Type": "application/json",
            }
          });
          if (!response.ok) {
            throw new Error('일단 try 구문은 돌았음');
          }
          const jsonData = await response.json();
          console.log('포트홀정보', jsonData.state1Potholes);
          setData(jsonData.state1Potholes);
          setTotalPages(Math.max(Math.ceil(jsonData.state1Potholes.length / itemsPerPage), 1));
          setIsLoading(false); 
        }, 300); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      setCurrentDateTime(new Date())
    }, 1000);
    return () => clearInterval(intervalId);
  }, [data]); 



  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage-1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleGridClick = (item) => {
    setSelectedGrid(item);
    console.log(item)
    setIsModalOpen(true);
    console.log('선택된 grid', item)
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  }


  const gotoProcess = async () => {
    const value = company[Math.floor(Math.random() * company.length)];
    console.log(value);
    setRandomCompany(value);
    console.log(new Date(currentDate.getTime()));
 
    

    const userData = {
      potholePk : selectedGrid.potholePk,
      state : "공사중"
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
  };

  const gotoDelete = async () => {
    try {
      const response = await fetch(`/api/potholes/${selectedGrid.potholePk}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        console.log('데이터 삭제 성공');
        window.location.reload();
      } else {
        console.log('데이터 삭제 실패');
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  return (
    <Background>
       <Container>
          <SideNav />
          <Content>
            <TimeArea>{currentDateTime.toLocaleDateString()} {currentTime.toLocaleTimeString()} 현재</TimeArea>
            {isLoading ? (
            <Loading>
              <h1>잠시만 기다려 주세요...</h1>
              <img src={spinner} alt="loading"></img>
            </Loading>
          ) : (
        <React.Fragment>
          <GridArea>
            {currentData && currentData.map((item, index) => (
              <GridCard key={index} onClick={() => handleGridClick(item)}>
                <ContentBox>
                  <PotholeImg src={`http://d1vcrv9kpqlkt7.cloudfront.net/${item.province}+${item.city}+${item.street}/${item.longitude}_${item.latitude}.jpg`} alt="pothole"></PotholeImg>
                  <ListBox>
                    <List>신고시각 : </List>
                    <List> {item.detectedAt.slice(0,10)} {item.detectedAt.slice(11,19)}</List>
                    <List marginTop="0.5rem">신고위치</List>
                    <List>{item.province} {item.city} {item.street}</List>
                  </ListBox>
                </ContentBox>
              </GridCard>
            ))}  
          </GridArea>
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
       </Container>
       {ismodalOpen && selectedGrid !== null && (
        <InfoModal>
          <ModalHeader>
            <ModalTitle>세부 신고 내역</ModalTitle>
            <CloseImg src={closeBtnImg} onClick={closeModal}></CloseImg>
          </ModalHeader>
          <ModalContent>
            <ModalContentBox>
              <ModalContainer>
                  <ModalImg src={`http://d1vcrv9kpqlkt7.cloudfront.net/${selectedGrid.province}+${selectedGrid.city}+${selectedGrid.street}/${selectedGrid.longitude}_${selectedGrid.latitude}.jpg`}></ModalImg>
                  {selectedGrid && (
                    <ModalTable>
                      <tbody>
                        <TableRow>
                          <TableCell1>신고위치</TableCell1>
                          <TableCell2>{selectedGrid.province} {selectedGrid.city} {selectedGrid.street}</TableCell2>
                        </TableRow>
                        {/* <TableRow>
                          <TableCell1>신고자</TableCell1>
                          <TableCell2>김나나</TableCell2>
                        </TableRow> */}
                        <TableRow>
                          <TableCell1>신고시각</TableCell1>
                          <TableCell2>{selectedGrid.detectedAt.slice(0,10)} {selectedGrid.detectedAt.slice(11,19)}</TableCell2>
                        </TableRow>
                        {/* <TableRow>
                          <TableCell1>담당부서</TableCell1>
                          <TableCell2>미정</TableCell2>
                        </TableRow> */}
                      </tbody>
                    </ModalTable>
                  )}
              </ModalContainer>
            </ModalContentBox>
            <BtnBox>
              <BtnArea>
                {/*각 버튼 클릭시 백에 요청할거 정해지면 추가 */}
                <Btn onClick={gotoProcess}>공사요청</Btn>
                {/* 공사요청 시 랜덤으로 시작일, 예정일 보내주는걸로 api 요청 */}
                <Btn onClick={gotoDelete}>반려</Btn>
              </BtnArea>
            </BtnBox>
          </ModalContent>
        </InfoModal>
       )}
       
    </Background>
  );
};

export default ManageReportPage;
