import styled from "styled-components";
import SideNav from "../components/SideNav";
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
  width : 100%;
  height : 6%;
  font-size : 1.1rem;
  display : flex;
  align-items : center;  
  margin-left : 3rem;
`
const ListArea = styled.div` 
  margin-left : 2rem;
  width : 90%;
  height : 86%;
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
const Info1 = styled.div`
  width : 68%;
  height : auto;
  /* background-color : yellow; */
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 1.3rem;
  /* white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis; */
  color : ${(props) => props.color || 'black'};

`



const ListDetailModal = styled.div`
  background-color: white;
  opacity : 98%;
  border-radius : 1rem;
  border : 1px solid gray;
  width: 40rem; 
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
  height : ${(props) => props.height || '15%'};
  /* background-color : lightgoldenrodyellow; */
  border-top : ${(props) => props.borderTop || 'none'};
  word-break: break-word;

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
  margin-top : 1rem;
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

const Page = styled.div`
  width: 100%;
  height: 7%;
  padding: 1rem 0;
  background-color : red;
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


const CompensationReportPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState(new Date());
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setTimeout(async () => {
          const response = await fetch(
            '/api/potholes/user-upload'  
          );
          if (!response.ok) {
            throw new Error('일단 try 구문은 돌았음');
          }
          const jsonData = await response.json();
          console.log('데이터', jsonData.result);
          setTotalPages(Math.max(Math.ceil(jsonData.result.length / itemsPerPage), 1));
          setData(jsonData.result); 
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
    console.log('리스트클릭')
    setIsInfoModalOpen(true);
    console.log(item);

    try {
        const response = await fetch(`/api/potholes/user-upload/${item.potholePk}`);

        if (response.ok) {
            const jsonData = await response.json();
            console.log('조회 리스트 데이터,', jsonData);
            setSelectedList(jsonData.result);
            // 여기서 jsonData를 처리하는 추가적인 코드가 필요할 수 있습니다.
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
  
  const handleReturnTitle = (event) => {
    console.log(event.target.value);
    setReturnTitle(event.target.value);
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
        potholePk: selectedList.potholePk,
        nowState: selectedList.state,
        changeState: '확인중' 
    };
    try{
      setIsLoading(true);
      setTimeout(async () => {
        const response = await fetch('/api/potholes/user-upload/change-state',{
          method : 'POST',
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

  const gotoDelete = async () => {
    console.log('딜리트버튼 클릭')
    try {
      const response = await fetch(`/api/potholes/${selectedList.potholePk}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        console.log('데이터 삭제 성공');
        console.log(response);
        window.location.reload();
        // window.location.reload();
      } else {
        console.log('데이터 삭제 실패');
        console.log(response);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }
  };

  const gotoReturn = async () => {
    try {
      const response = await fetch(`/api/potholes/${selectedList.potholePk}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      if (response.ok) {
        console.log('반려 성공');
        console.log(response);
        window.location.reload();
      } else {
        console.log('반려 실패');
        console.log(response);
      }
    } catch (error) {
      console.error('에러 발생:', error);
    }

  }


  const gotoWork = () => {
    const userData = {
      potholePk: selectedList.potholePk,
      nowState: selectedList.state,
      changeState: '공사중' 
  };
  try{
    setIsLoading(true);
    setTimeout(async () => {
      const response = await fetch('/api/potholes/user-upload/change-state',{
        method : 'POST',
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
      rejectionReason : `Title : ${returnTitle} , Content : ${returnContent}`
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
        <TimeArea>{currentDateTime.toLocaleDateString()} {currentTime.toLocaleTimeString()} 현재</TimeArea>
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
                  <Info width="40%">신고위치</Info>
                  <Info width="28%">신고시간</Info>
                  <Info>담당자명</Info>
                </ListHeader>
                {currentData && currentData.length === 0 ? (<Lists>"결과가 없습니다"</Lists>) : (
                currentData.map((item, index) => (
                  <Lists key={index} onClick={()=> handleListClick(item)}>
                    <Info >{item.state}</Info>
                    <Info width="40%">{item.province} {item.city} {item.street}</Info>
                    <Info width="28%">{item.detectedAt.slice(0,10)}</Info>
                    <Info>김싸피</Info>
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

        {selectedList && isInfoModalOpen && (
        <ListDetailModal>
          <ModalHeader>
            <ModalTitle>민원 상세 내역</ModalTitle>
            <CloseImg src={closeBtnImg} onClick={closeModal} />
          </ModalHeader>
          <ModalContent height="89%" marginTop="2rem">
          <ArticleArea>
              <ArticleList>신고 위치 : {selectedList.province} {selectedList.city} {selectedList.street}</ArticleList>
              <ArticleList height="15%" fontSize="1.4rem">신고 시각 : {selectedList.detectedAt.slice(0,10) }  {selectedList.detectedAt.slice(11,19) }</ArticleList>
              <ArticleList height="65%" fontSize="1.4rem" borderTop="3px solid darkgray">{selectedList.content}</ArticleList>
            </ArticleArea>
            <BtnArea>
              {selectedList.state === '확인중' ? (
                <>
                  <Btn1 onClick={gotoWork}>공사 요청</Btn1>
                  <Btn1 onClick={gotoReturn}>반려</Btn1>
                </>
              ) : (
                <>
                  <Btn1 onClick={gotoApprove}>확인 요청</Btn1>
                  <Btn1 onClick={gotoDelete}>삭제</Btn1>
                </>
              )}
            </BtnArea>
         </ModalContent>
       </ListDetailModal>
)}

    </Background>
  );
};

export default CompensationReportPage;