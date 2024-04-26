import styled from "styled-components";
import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import closeBtnImg from '../assets/modal/closeBtn.png'
import { useNavigate } from "react-router-dom";

const Background = styled.div`

`
const Container = styled.div`
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
  height : 6%;
  font-size : 1.1rem;
  display : flex;
  align-items : center;  
`
const GridArea = styled.div`
  margin-top : 0.8rem;
  background-color : white;
  width : 100%;
  height : 87%;
  display : grid;
  flex-wrap : wrap;
  grid-template-columns : repeat(4, 1fr);
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

const Page = styled.div`
  /* background-color : red; */
  width : 100%;
  height : 7%;
`
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
  font-size : 1.2rem;
  
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
  background-color :#A1A1A1;
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
const PrevBtn = styled.button`
  cursor: pointer;
  
`
const PageBtn =styled.button`
 cursor: pointer;
  
`
const NextBtn = styled.button`
 cursor: pointer;
  
`
const PageBtnArea = styled.div`
 cursor: pointer;
  display : flex;
  justify-content : center;
  align-items : center;
`

const PageNumArea = styled.div`
`

const PageText = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  
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


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          '/dummydata/dummydata.json' // 경로 수정
        );
        if (!response.ok) {
          throw new Error('일단 try 구문은 돌았음');
        }
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
        setTotalPages(Math.ceil(jsonData.length / itemsPerPage));
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
  }, []); 



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
    setIsModalOpen(true);
    console.log('선택된 grid', item)
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const gotoProcess = () => {
    navigate('/manage-process')
  }
 
  return (
    <Background>
       <Container>
          <SideNav />
          <Content>
            <TimeArea>{currentDateTime.toLocaleDateString()} {currentTime.toLocaleTimeString()} 현재</TimeArea>
            <GridArea>
            {currentData && currentData.map((item, index) => (
              <GridCard key={index} onClick={() => handleGridClick(item)}>
                  <ContentBox>
                    <PotholeImg src={item.potholeImg}></PotholeImg>
                    <ListBox>
                      <List>신고시각</List>
                      <List> {item.reportTime}</List>
                      <List>신고위치</List>
                      <List>{item.reportLocation}</List>
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
              <PageNumArea>
              </PageNumArea>
          <PageText>
            페이지: {currentPage} / {totalPages}
          </PageText>
            </Page>
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
                  <ModalImg src={selectedGrid.potholeImg}></ModalImg>
                  {selectedGrid && (
                    <ModalTable>
                      <tbody>
                        <TableRow>
                          <TableCell1>신고위치</TableCell1>
                          <TableCell2>{selectedGrid.reportLocation}</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>신고자</TableCell1>
                          <TableCell2>김나나</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>신고시각</TableCell1>
                          <TableCell2>{selectedGrid.reportTime}</TableCell2>
                        </TableRow>
                        <TableRow>
                          <TableCell1>담당부서</TableCell1>
                          <TableCell2>{selectedGrid.mainPart}</TableCell2>
                        </TableRow>
                      </tbody>
                    </ModalTable>
                  )}
              </ModalContainer>
            </ModalContentBox>
            <BtnBox>
              <BtnArea>
                {/*각 버튼 클릭시 백에 요청할거 정해지면 추가 */}
                <Btn onClick={gotoProcess}>공사요청</Btn>
                <Btn>반려</Btn>
              </BtnArea>
            </BtnBox>
          </ModalContent>
        </InfoModal>
       )}
       
    </Background>
  );
};

export default ManageReportPage;
