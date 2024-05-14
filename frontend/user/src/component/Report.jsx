import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Calender from "react-calendar";
import "../../node_modules/react-calendar/dist/Calendar.css";
import calendarImg from "../../public/img/calenderImg.png";
import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";
import axios from "axios";

const FileImgBox = styled.div`
  width: 99%;
  display: flex;
  height: ${(props) => props.height || "9.9%"};
  border-top: #d8d8d8 0.5px solid;
  border-left: none;
  border-right: none;
  border-bottom: #d8d8d8 0.5px solid;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  font-size: 1.4rem;
  color: #7a7979;
  /* background-color : yellow; */
`;
const SubImgBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 20%;
  border-radius: 0.3rem;
  height: 95%;
  background-color: #d4daeb;
`;
const ImgBox = styled.div`
  display: flex;
  width: 70%;
  height: 90%;
  /* background-color : #d7d1d1; */
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
`;
const FIleImg = styled.img`
  width: 3.5rem;
  height: 3.5rem;
`;
const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
`;
const Container = styled.div`
  width: 100%;
  height: 91%;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  width: 100%;
  height: 10%;
  /* background-color : red; */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  border: #d8d8d8 1p1x solid;
`;
const ContentBox = styled.div`
  width: 100%;
  height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  /* background-color : yellow; */
  overflow: auto;
  &::-webkit-scrollbar {
    width: 1rem;
  }

  &::-webkit-scrollbar-track {
    background: rgba(79, 79, 79, 0.9);
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 1rem;
  }
`;
const TextBox = styled.div`
  width: 99%;
  height: ${(props) => props.height || "9.9%"};
  border-top: #d8d8d8 0.5px solid;
  border-left: none;
  border-right: none;
  border-bottom: #d8d8d8 0.5px solid;
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* background-color : lightcoral; */
`;
const TitleBox = styled.input`
  width: 100%;
  height: 99%;
  border-top: #d8d8d8 0.5px solid;
  border-left: none;
  border-right: none;

  border-bottom: #d8d8d8 0.5px solid;
  font-family: "BlackHanSans";
  font-size: 1.5rem;
  text-indent: 1rem;
  &::placeholder {
    color: #7a7979;
    font-family: "BlackHanSans";
    font-size: 1.5rem;
  }
`;

const InputBox = styled.textarea`
  width: 100%;
  height: 95%;
  border: none;
  font-family: "BlackHanSans";
  font-size: 1.3rem;
  text-indent: 1rem;
  margin-top: 1.6rem;
  &::placeholder {
    color: #7a7979;
    font-family: "BlackHanSans";
    font-size: 1.3rem;
  }
`;
const FileText = styled.div`
  width: 70%;
  height: 90%;
  /* background-color : yellow; */
  display: flex;
  justify-content: left;
  align-items: center;
  font-size: 1.4rem;
  color: #7a7979;
`;
const FileBtn = styled.div`
  width: 15%;
  height: 70%;
  background-color: lightcoral;
  border-radius: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3rem;
  color: white;
`;
const SaveBtn = styled.div`
  width: 22%;
  height: 75%;
  border-radius: 1.6rem;
  background-color: #949eff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.7rem;
  color: white;
`;
const VideoListModal = styled.div`
  background-color: #d3d3d3;
  opacity: 98%;
  border-radius: 1rem;
  width: 80%;
  height: 40rem;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -43%);
  z-index: 1000;
`;

const VideoItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  cursor: pointer;
`;

const VideoThumbnail = styled.video`
  width: 6rem;
  height: 4rem;
`;

const VideoInfo = styled.div`
  flex: 1;
  padding: 0 20px; // 내용과 비디오 사이에 공간 추가
  color: white; // 텍스트 색상 변경
`;

const SelectButton = styled.button`
  background-color: #949eff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #7a7eff;
  }
`;

const ModalHeader = styled.div`
  width: 100%;
  height: 17%;
  /* background-color : yellow; */
`;
const ModalVideoList = styled.div`
  margin-top: 0.3rem;
  width: 100%;
  height: 73%;
  background-color: #28325e;
  overflow-y: auto;
`;
const BtnArea = styled.div`
  width: 100%;
  height: 10%;
  /* background-color : #99056d; */
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  margin-left: 1rem;
  font-size: 1.4rem;
  width: 70%;
  height: 50%;
  /* background-color : lightblue; */
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
  top: calc(30% + 1rem); /* 부모 요소의 중앙에서 모달의 절반 높이를 빼줌 */
  left: calc(40% - 7.5rem); /* CalenderImg 버튼의 위치에 따라 조정 */
  z-index: 1000;
`;

const DateBox = styled.div`
  display: flex;
  align-items: center;
  width: 80%;
  height: 40%;
  background-color: lightcyan;
  /* background-color : #e83e3e; */
  border: 1px solid darkgray;
  margin-left: 1rem;
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
const VideoList = styled.div`
  width: 100%;
  height: 20%;
  background-color: lightgreen;
`;
const Btn = styled.div`
  width: 20%;
  height: 80%;
  margin-bottom: 0.3rem;
  background-color: #949eff;
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.34rem;
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

const Report = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [iscalenderOpen, setIsCalenderOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedImage, setSelectedImage] = useState([]);
  const [videoList, setVideoList] = useState([]); // 비디오 리스트 상태
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [currentVideo, setCurrentVideo] = useState(""); // 현재 선택된 비디오
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const Navigate = useNavigate();

  const [selectedVideos, setSelectedVideos] = useState([]);

  const toggleVideoSelection = (video) => {
    const isAlreadySelected = selectedVideos.length;
    if (isAlreadySelected) {
      setSelectedVideos([]);
      setSelectedVideos([video]);
    } else {
      setSelectedVideos([video]);
    }

    closeModal();
  };

  useEffect(() => {
    fetchVideos(); // 비디오 데이터 불러오기
  }, []);

  useEffect(() => {
    const updatedFilteredVideos = filterVideosByDate(videoList, selectedDate);
    setFilteredVideos(updatedFilteredVideos);
  }, [videoList, selectedDate]);

  const fetchVideos = async () => {
    try {
      const response = await fetch(`/api/video-data/user/${user}`);
      if (!response.ok) {
        throw new Error("서버 통신 에러");
      }
      const data = await response.json();
      setVideoList(data.result); // 상태 업데이트
    } catch (error) {
      console.error("비디오 데이터를 불러오는 데 실패했습니다:", error);
    }
  };

  const filterVideosByDate = (videos, selectedDate) => {
    if (!selectedDate) return videos; // 날짜가 선택되지 않았다면 모든 비디오를 반환
    return videos.filter((video) => {
      const videoDate = formatDateWithTime(video.detectedAt).slice(0, 10); // YYYY-MM-DD 형식으로 날짜 추출
      return videoDate === selectedDate;
    });
  };

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleContent = (event) => {
    setContent(event.target.value);
  };

  const chooseImage = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.multiple = true;
    fileInput.click();

    fileInput.addEventListener("change", (event) => {
      const files = event.target.files;
      const selected = Array.from(files);
      const totalSelected = selectedImage.length + selected.length;

      if (totalSelected > 4) {
        alert("최대 네개의 사진만 선택할 수 있습니다.");
      } else {
        setSelectedImage((prevSelected) => [...prevSelected, ...selected]);
      }
    });
  };

  const gotoUpload = async () => {
    if (selectedVideos.length === 0) {
      return; // 비디오가 선택되지 않았다면 함수 종료
    }

    const formData = new FormData();
    formData.append("userPk", user);
    formData.append("reportName", title);
    formData.append("reportContent", content);
    formData.append("videoPk", selectedVideos[0].videoPk);

    // 이미지 파일 추가
    selectedImage.forEach((image) => {
      formData.append("file", image); // 'images'는 서버가 기대하는 필드명입니다.
    });

    try {
      const response = await axios.post("/api/accident-report", formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 멀티파트 형식으로 요청
        },
      });
      console.log(response.data.success);
      if (response.data.success === true) Navigate("/reports");
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  const chooseVideo = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCalender = () => {
    if (!iscalenderOpen) {
      setIsCalenderOpen(true);
    } else {
      setIsCalenderOpen(false);
    }
  };
  const handleVideoClick = (video) => {
    const videoUrl = `https://d1vcrv9kpqlkt7.cloudfront.net/${video.serialNumber}/${video.latitude}_${video.longitude}.mp4`;
    setCurrentVideo(videoUrl);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleDateClick = (value) => {
    setSelectedDate(formatDate(value));
    setIsCalenderOpen(false);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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

  const chooseBlackbox = () => {
    setIsModalOpen(false);
  };

  return (
    <Background>
      <Container>
        <Header>사고신고</Header>
        <ContentBox>
          <TextBox>
            <TitleBox
              onChange={handleTitle}
              placeholder="제목을 입력하세요"
            ></TitleBox>
          </TextBox>
          <TextBox height="59%">
            <InputBox
              onChange={handleContent}
              placeholder="내용을 입력하세요"
            ></InputBox>
          </TextBox>
          <FileImgBox>
            <ImgBox>
              {selectedImage && selectedImage.length > 0 ? (
                selectedImage.map((item, index) => (
                  <SubImgBox key={index}>
                    <FIleImg src={URL.createObjectURL(item)} alt={item.name} />
                  </SubImgBox>
                ))
              ) : (
                <FileText width="100%">사고사진을 첨부하세요(최대4장)</FileText>
              )}
            </ImgBox>
            <FileBtn onClick={chooseImage}>첨부</FileBtn>
          </FileImgBox>
          <TextBox>
            {selectedVideos && selectedVideos.length > 0 ? (
              selectedVideos.map((item, index) => (
                <FileText key={index}>
                  {formatDateWithTime(item.detectedAt)}
                </FileText>
              ))
            ) : (
              <FileText>블랙박스 영상을 첨부하세요</FileText>
            )}
            <FileBtn onClick={chooseVideo}>첨부</FileBtn>
          </TextBox>
          <TextBox>
            <SaveBtn onClick={gotoUpload}>제출</SaveBtn>
          </TextBox>
        </ContentBox>
      </Container>
      <Navbar />
      {ismodalOpen && (
        <VideoListModal>
          <ModalHeader>
            <ModalTitle>블랙박스 영상 자료 선택</ModalTitle>
            <DateBox>
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
            </DateBox>
          </ModalHeader>
          <ModalVideoList>
            {filteredVideos.map((video) => (
              <VideoItem
                key={video.videoPk}
                onClick={() => handleVideoClick(video)}
              >
                <VideoThumbnail
                  src={`https://d1vcrv9kpqlkt7.cloudfront.net/${video.serialNumber}/${video.latitude}_${video.longitude}.mp4`}
                />
                <VideoInfo>{formatDateWithTime(video.detectedAt)}</VideoInfo>
                <SelectButton
                  onClick={(e) => {
                    e.stopPropagation(); // 이벤트 버블링 방지
                    toggleVideoSelection(video);
                  }}
                >
                  {selectedVideos.includes(video) ? "Unselect" : "Select"}
                </SelectButton>
              </VideoItem>
            ))}
          </ModalVideoList>
          <BtnArea>
            <Btn onClick={chooseBlackbox}>닫기</Btn>
          </BtnArea>
        </VideoListModal>
      )}
      {iscalenderOpen && (
        <CalenderModal>
          <Calender calendarType="gregory" onChange={handleDateClick} />
        </CalenderModal>
      )}
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

export default Report;
