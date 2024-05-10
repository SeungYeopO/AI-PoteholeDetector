import styled from "styled-components";
import Calender from "react-calendar";
import "../../node_modules/react-calendar/dist/Calendar.css";
import calendarImg from "../../public/img/calenderImg.png";
import { useState, useEffect } from "react";
import blackboxImg from "../../public/img/blackbox.png";
import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";

const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;
const Container = styled.div`
  width: 100%;
  height: 91.5%;
  display: flex;
  flex-direction: column;
  /* background-color : yellow; */
`;
const Header = styled.div`
  width: 100%;
  height: 10%;
  /* background-color : red; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border: #d8d8d8 1px solid;
`;
const ContentBox = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  /* background-color : yellow; */
`;
const DateBox = styled.div`
  margin-left: 0.5rem;
  width: 100%;
  height: 10%;
  /* background-color : pink;   */
  display: flex;
  align-items: center;
`;
const ListBox = styled.div`
  width: 99%;
  height: 84%;
  overflow-y: auto;
  /* background-color : pink; */
`;
const BoxName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${(props) => props.width || "25%"};
  height: 100%;
  background-color: #8d8c8c;
  font-size: 1.4rem;
`;
const DateTable = styled.div`
  background-color: white;
  width: 75%;
  height: 100%;
  display: flex;
`;
const CalenderModal = styled.div`
  /* background-color: white; */
  opacity: 98%;
  border-radius: 1rem;
  width: 20rem;
  height: 15rem;
  position: absolute; /* 부모 요소를 기준으로 위치를 절대값으로 지정 */
  top: calc(30% - 7rem); /* 부모 요소의 중앙에서 모달의 절반 높이를 빼줌 */
  left: calc(40% - 7.5rem); /* CalenderImg 버튼의 위치에 따라 조정 */
  z-index: 1000;
`;
const SortInfo = styled.div`
  width: ${(props) => props.width || "10%"};
  height: ${(props) => props.height || "90%"};
  display: flex;
  text-indent: 0.3rem;
  align-items: center;
  font-size: 1.1rem;
`;
const CalenderImg = styled.img`
  display: flex;
  cursor: pointer;
  position: relative;
  margin-top: 0.3rem;
  width: 15%;
  height: 70%;
  /* background-color : red; */
`;
const Box = styled.div`
  width: 80%;
  display: flex;
  height: 60%;
  border: 1px solid darkgray;
`;
const List = styled.div`
  display: flex;
  width: 100%;
  height: 14%;
  border: 0.5px solid #d3d3d3;
  background-color: #f4f4f4;
`;
const StateArea = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
  /* background-color : red; */
`;
const ListInfoArea = styled.div`
  width: 75%;
  height: 100%;
`;
const TitleArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* background-color : blue;   */
`;
const TitleText = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  font-size: 1.3rem;
  overflow-wrap: break-word; /* 텍스트가 넘치면 숨김 처리 */
  text-overflow: ellipsis; /* 텍스트가 넘칠 경우 '...'로 처리 */
  /* background-color : lightblue; */
`;
const BlackboxImg = styled.img`
  width: 6rem;
  height: 4rem;
  /* background-color : white; */
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1050;
`;

// 모달 컨텐트 스타일
const ModalContent = styled.div`
  width: 80%;
  max-width: 640px;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Blackbox = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [iscalenderOpen, setIsCalenderOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [currentVideo, setCurrentVideo] = useState("");
  const [videoList, setVideoList] = useState([]); // 상태로 비디오 리스트 관리
  const [filteredVideos, setFilteredVideos] = useState([]);

  const { user } = useAuth();

  // useEffect를 사용하여 selectedDate나 videoList가 변경될 때마다 필터링을 업데이트
  useEffect(() => {
    const updatedFilteredVideos = filterVideosByDate(videoList, selectedDate);
    setFilteredVideos(updatedFilteredVideos);
  }, [videoList, selectedDate]);

  const handleVideoClick = (video) => {
    const videoUrl = `https://d1vcrv9kpqlkt7.cloudfront.net/${video.serialNumber}/${video.latitude}_${video.longitude}.mp4`;
    setCurrentVideo(videoUrl);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleDateClick = (value) => {
    setSelectedDate(formatDate(value));
    setIsCalenderOpen(false);
  };

  const openCalender = () => {
    setIsCalenderOpen(!iscalenderOpen);
  };

  const filterVideosByDate = (videos, selectedDate) => {
    if (!selectedDate) return videos; // 날짜가 선택되지 않았다면 모든 비디오를 반환
    return videos.filter((video) => {
      const videoDate = formatDateWithTime(video.detectedAt).slice(0, 10); // YYYY-MM-DD 형식으로 날짜 추출
      console.log(videoDate);
      return videoDate === selectedDate;
    });
  };

  const fetchVideos = async () => {
    try {
      const response = await fetch(`/api/video-data/user/${user}`);
      if (!response.ok) {
        throw new Error("서버 통신 에러");
      }
      const data = await response.json();
      console.log(data);
      setVideoList(data.result); // 상태 업데이트
    } catch (error) {
      console.error("비디오 데이터를 불러오는 데 실패했습니다:", error);
    }
  };

  const formatDateWithTime = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const seconds = date.getSeconds().toString().padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  };

  useEffect(() => {
    fetchVideos(); // 컴포넌트 마운트 시 API 호출
  }, []); // 의존성 배열이 비어 있으므로 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <Background>
      <Container>
        <Header>블랙박스 영상확인</Header>
        <ContentBox>
          <DateBox>
            <Box>
              <BoxName>날짜</BoxName>
              <DateTable>
                <SortInfo onChange={handleDateClick} width="75%" height="100%">
                  {selectedDate ? selectedDate : "날짜 선택"}
                </SortInfo>
                <CalenderImg
                  src={calendarImg}
                  onClick={openCalender}
                ></CalenderImg>
              </DateTable>
            </Box>
          </DateBox>
          <ListBox>
            {filteredVideos.map((video) => (
              <List key={video.videoPk} onClick={() => handleVideoClick(video)}>
                <StateArea>
                  <video
                    style={{
                      width: "6rem",
                      height: "4rem",
                    }}
                    src={`https://d1vcrv9kpqlkt7.cloudfront.net/${video.serialNumber}/${video.latitude}_${video.longitude}.mp4`}
                  ></video>
                </StateArea>
                <ListInfoArea>
                  <TitleArea>
                    <TitleText>
                      {formatDateWithTime(video.detectedAt)}
                    </TitleText>
                  </TitleArea>
                </ListInfoArea>
              </List>
            ))}
          </ListBox>
        </ContentBox>
      </Container>
      {iscalenderOpen && (
        <CalenderModal>
          <Calender calendarType="gregory" onChange={handleDateClick} />
        </CalenderModal>
      )}
      <Navbar />
      {showModal && (
        <ModalBackground onClick={handleClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <video
              src={currentVideo}
              controls
              autoPlay
              style={{ width: "100%" }}
            ></video>
          </ModalContent>
        </ModalBackground>
      )}
    </Background>
  );
};

export default Blackbox;
