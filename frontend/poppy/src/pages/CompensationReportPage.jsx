import styled from "styled-components";
import SideNav from "../components/SideNav_ver2";
import { useState, useEffect } from "react";
import closeBtnImg from '../assets/modal/closeBtn.png'
import { json, useNavigate } from "react-router-dom";
import Calender from 'react-calendar';
import calendarImg from '../assets/modal/calenderImg.png';
import '../../node_modules/react-calendar/dist/Calendar.css';
import spinner from '../assets/background/loading1.gif';
import React from "react";


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
  /* background-color : darkgray; */
  margin-left : 3rem;
  width : 100%;
  height : 10%;
  font-size : 1.1rem;
  display : flex;
  align-items : center;  
  justify-content : center;
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
  font-size : 1.1rem;
  background-color : #005999;
  color : white;

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
const CalenderModal = styled.div`
  /* background-color: white; */
  opacity: 98%;
  border-radius: 1rem;
  width: 20rem; 
  height: 15rem; 
  position: absolute; /* 부모 요소를 기준으로 위치를 절대값으로 지정 */
  top: calc(25% - 10.8rem); /* 부모 요소의 중앙에서 모달의 절반 높이를 빼줌 */
  left: calc(40% - 8rem); /* CalenderImg 버튼의 위치에 따라 조정 */
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


const ListDetailModal = styled.div`
  background-color: white;
  opacity : 98%;
  border-radius : 1rem;
  border : 1px solid gray;
  width: 55rem; 
  height: 43rem; 
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
  align-items : center;
`
const ModalContent = styled.div`
  display : flex;
  flex-direction  : column;
  width : ${(props) => props.width || '100%'};
  height : ${(props) => props.height || '100%'};
  margin-top  : ${(props) => props.marginTop || '2.4rem'};
  /* background-color : pink; */
  align-items : center;
  justify-content : center;
  
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
  /* align-items : center; */
  width : 90%;
  height : 30%;
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
const Box = styled.div`
  width : 100%;
  height : 100%;
  /* background-color : yellow; */
  display : flex;
  align-items : center;
`
const SubFile = styled.div`
  display : flex;
  align-items : center;
  text-align : left;
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
const Loading = styled.div`
  width : 95%;
  height: 73%;
  display : flex;
  justify-content : center;
  align-items : center;
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
const SearchBtn = styled.div`
  cursor: pointer;
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
  const [isLoading, setIsLoading] = useState(false);
  const [imageList, setImageList] = useState([]);
  const [blobImageList, setBlobImageList] = useState([]);
  const [videoFile, setVideoFile] = useState('');
  const [videoBlobURL, setVideoBlobURL] = useState(null);
  

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
  

  const modalOpen = () => {
    console.log('click');
    if(ismodalOpen === false) {
      setIsModalOpen(true);
    } else {
      setIsModalOpen(false);
      }
    
  };

  //   useEffect(() => {
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
          const response = await fetch(
            '/api/accident-report/no-check'  
          );
          if (!response.ok) {
            throw new Error('일단 try 구문은 돌았음');
          }
          const jsonData = await response.json();
          console.log('데이터', jsonData.noCheckState);
          setTotalPages(Math.max(Math.ceil(jsonData.noCheckState.length / itemsPerPage), 1));
          setData(jsonData.noCheckState); 
          setIsLoading(false);   
        }, 500)
    
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

  const handleListClick = async (item) => {
    setIsInfoModalOpen(true);
    console.log(item);

    try {
        const response = await fetch(`/api/accident-report/${item.reportPk}`);
  
        if (response.ok) {
            const jsonData = await response.json();
            console.log('조회 리스트 데이터,', jsonData)
            console.log('한개 리스트 데이터', jsonData.imageFileNameList);
            setSelectedList(jsonData.result);
            setImageList(jsonData.imageFileNameList);
            console.log(jsonData.videoFileName);
            setVideoFile(jsonData.videoFileName);

            const blobURLs = await Promise.all(jsonData.imageFileNameList.map(async (imageURL) => {
                try {
                    const response = await fetch(`http://d1vcrv9kpqlkt7.cloudfront.net/${imageURL}`);
                    if (!response.ok) {
                        throw new Error('이미지 데이터 가져오기 실패');
                    }
                    const imageBlob = await response.blob();
                    const blobURL = URL.createObjectURL(imageBlob);
                    return blobURL;
                } catch (error) {
                    console.error('이미지 데이터 가져오기 오류:', error);
                    return null; 
                }
            }));
            setBlobImageList(blobURLs);
            
            if(jsonData.videoFileName){
              try{
                const videoResponse = await fetch(`http://d1vcrv9kpqlkt7.cloudfront.net/${jsonData.result.serialNumber}/${jsonData.videoFileName}`);
                if(!videoResponse.ok){
                  throw new Error('비디오 데이터 가져오기 실패')
                }
                const videoBlob = await videoResponse.blob();
                const videoBlobURL = URL.createObjectURL(videoBlob);
                setVideoBlobURL(videoBlobURL);
              } catch (error){
                console.log('비디오 데이터 가져오기 오류', error);
              }
            }  

        } else {
            console.log('리스트 실패');
        }
    } catch (error) {
        console.error('에러발생', error);
    }
}

  
  const closeModal = () => {
    console.log(imageList);
    setIsInfoModalOpen(false);
  }
  const closeReturnModal = () => {
    setIsReturnModalOpen(false);
  }

  const openReturnModalOpen = () => {
    setIsReturnModalOpen(true);
  }
  

  const handleReturnContent = (event) => {
    console.log(event.target.value);
    setReturnContent(event.target.value);

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

  const gotoSearch = () => {

    const userData = {
      reportDate : format2Date(selectedDate),
      state : '미확인'
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
      }, 300)
    } catch (error){
      console.log('에러발생', error);
    }

  }
  
  const gotoApprove = () => {
    const userData = {
      reportPk : selectedList.reportPk,
      state : '보상승인',
      rejectionReason : null
    };
    try{
      setIsLoading(true);
      setTimeout(async () => {
        const response = await fetch('/api/accident-report',{
          method : 'PATCH',
          headers : {
            "Content-Type" : "application/json",
          },
          body : JSON.stringify(userData),
        });
        if(response.ok) {
          setIsLoading(false);
          const responseData = await response.json();
          console.log('수정 성공', responseData);

          window.location.reload();
        } else{
          console.log('수정 실패')
        }
      },500)
    } catch(error){
      console.log('오류발생', error);
    }
  }

  const gotoSend = () => {
    const userData = {
      reportPk : selectedList.reportPk,
      state : '반려',
      rejectionReason : returnContent
    };

    try{
      setIsLoading(true);
      setTimeout(async () => {
        const response = await fetch('/api/accident-report',{
          method : 'PATCH',
          headers : {
            "Content-Type" : "application/json",
          },
          body : JSON.stringify(userData),
        });
        if(response.ok) {
          setIsLoading(false);
          const responseData = await response.json();
          console.log('반려 수정 성공', responseData);
          window.location.reload();
        } else{
          console.log('수정 실패')
        }
      },500)
    } catch(error){
      console.log('오류발생', error);
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
                  <Info>순번</Info>
                  <Info width="48%">제목</Info>
                  <Info width="20%">작성자</Info>
                  <Info width="20%">작성일</Info>
                </ListHeader>
              {currentData && currentData.length === 0 ? (<Lists>"결과가 없습니다"</Lists>) : (
                currentData.map((item, index) => (
                  <Lists key={index} onClick={()=> handleListClick(item)}>
                    <Info>{(currentPage - 1) * itemsPerPage + index + 1}</Info> 
                    <Info width="48%">{item.reportName}</Info>
                    <Info width="20%">{item.userName}</Info>
                    <Info width="20%">{item.reportDate.slice(0,10)}</Info>
                  </Lists>
                ))
              ) } 
              </SortedList>
        </ListArea>
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
       {selectedList&&isInfoModalOpen && (<ListDetailModal>
      <ModalHeader>
            <ModalTitle>보상 신고 처리</ModalTitle>
            <CloseImg src={closeBtnImg} onClick={closeModal}></CloseImg>
          </ModalHeader>
          <ModalContent height="89%" marginTop="0rem">
            <ArticleArea>
              <ArticleList>{selectedList.reportName}</ArticleList>
              <ArticleList height="15%" fontSize="1.4rem">작성자 : {selectedList.userName}</ArticleList>
              <ArticleList height="55%" fontSize="1.4rem" borderTop="3px solid darkgray">{selectedList.reportContent}</ArticleList>
            </ArticleArea>
            <PlusFileArea>
              <SubFile>[첨부파일]</SubFile>
              {imageList&& blobImageList && blobImageList.map((blobURL, index) => (
                  <a key={index} href={blobURL} download={imageList[index]}>
                    <SubFile fontSize="1.3rem" color="#004FC7">{imageList[index]}</SubFile>
                  </a>
                ))}
             {videoBlobURL && (
                  <a href={videoBlobURL} download={videoFile}>
                      <SubFile fontSize="1.3rem" color="#004FC7">{videoFile}</SubFile>
                  </a>
              )}
            </PlusFileArea>
            <BtnArea>
              <Btn1 onClick={gotoApprove}>보상승인</Btn1>
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
          <ModalContent marginTop = "0rem" height="66%">
            <ReturnModalContent>
              <ContentInput onChange={handleReturnContent} placeholder="내용을 입력하세요"></ContentInput>
            </ReturnModalContent>
          </ModalContent>
          <BtnArea2 height="15%">
            <Btn2 onClick = {gotoSend}> 최종 제출</Btn2>
          </BtnArea2>
        </ReturnModal>)}
    </Background>
  );
};

export default CompensationReportPage;