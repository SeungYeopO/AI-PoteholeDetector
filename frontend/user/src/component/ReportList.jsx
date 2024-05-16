import styled from "styled-components";
import Calender from "react-calendar";
import "../../node_modules/react-calendar/dist/Calendar.css";
import calendarImg from "../../public/img/calenderImg.png";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import { useAuth } from "./AuthContext";
import axios from "axios";

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
`;

const Header = styled.div`
  width: 100%;
  height: 10%;
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
`;

const DateBox = styled.div`
  margin-left: 0.5rem;
  width: 100%;
  height: 10%;
  display: flex;
  align-items: center;
`;

const ListBox = styled.div`
  width: 99%;
  height: 84%;
  overflow-y: auto;
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
  opacity: 98%;
  border-radius: 1rem;
  width: 20rem;
  height: 15rem;
  position: absolute;
  top: calc(30% - 7rem);
  left: calc(40% - 7.5rem);
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
  cursor: pointer; /* 클릭할 수 있도록 커서를 변경 */
`;

const StateArea = styled.div`
  width: 25%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5rem;
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
`;

const TitleText = styled.div`
  width: 90%;
  height: 90%;
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
`;

const DateArea = styled.div`
  width: 100%;
  height: 30%;
  display: flex;
  justify-content: right;
`;

const DateText = styled.div`
  display: flex;
  margin-right: 2rem;
  width: 25%;
  font-size: 1.2rem;
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1001;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 1.5rem;
  border-radius: 1rem;
  width: 35rem;
  height: 35rem;
  position: relative;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const MediaContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const ImageGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  justify-content: center;
`;

const Thumbnail = styled.img`
  max-width: 23%;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

const FullImageModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1002;
`;

const FullImageContent = styled.div`
  position: relative;
`;

const FullImage = styled.img`
  max-width: 90%;
  max-height: 90%;
`;

const FullImageCloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 2rem;
  color: white;
  cursor: pointer;
`;
const Section = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #d8d8d8;
`;

const SectionTitle = styled.h3`
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
  color: #333;
`;

const SectionContent = styled.p`
  font-size: 1.2rem;
  color: #555;
`;

const ReportList = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [iscalenderOpen, setIsCalenderOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null); // 선택된 신고내역
  const [imageUrls, setImageUrls] = useState([]); // 이미지 URL 상태
  const [videoUrl, setVideoUrl] = useState(""); // 비디오 URL 상태
  const [selectedImage, setSelectedImage] = useState(null); // 선택된 이미지 상태
  const { user } = useAuth();

  useEffect(() => {
    const updatedFilteredReports = filterReportsByDate(reports, selectedDate);
    setFilteredReports(updatedFilteredReports);
  }, [reports, selectedDate]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`/api/accident-report/user/${user}`);
        setReports(response.data.result); // 데이터를 상태에 저장
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    fetchReports();
  }, [user]);

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

  const filterReportsByDate = (reports, selectedDate) => {
    if (!selectedDate) return reports;
    return reports.filter((report) => {
      const reportDate = formatDateWithTime(report.reportDate).slice(0, 10);
      return reportDate === selectedDate;
    });
  };

  const handleDateClick = (value) => {
    setSelectedDate(formatDate(value));
    setIsCalenderOpen(false);
  };

  const openCalender = () => {
    setIsCalenderOpen(!iscalenderOpen);
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const openModal = async (report) => {
    setSelectedReport(report);
    try {
      const mediaResponse = await axios.get(
        `/api/accident-report/${report.reportPk}`
      );
      console.log(mediaResponse);
      const serialNumber = mediaResponse.data.result.serialNumber;
      console.log(serialNumber);
      const reportPk = mediaResponse.data.reportPk;
      const videoFileName = mediaResponse.data.videoFileName;
      const imageUrls = mediaResponse.data.imageFileNameList.map(
        (filename) => `https://d1vcrv9kpqlkt7.cloudfront.net/${filename}`
      );

      const videoUrl = `https://d1vcrv9kpqlkt7.cloudfront.net/${serialNumber}/${videoFileName}`;
      console.log(imageUrls[0]);
      console.log(videoUrl);
      setImageUrls(imageUrls);
      setVideoUrl(videoUrl);
    } catch (error) {
      console.error("Failed to fetch media files:", error);
    }
  };

  const closeModal = () => {
    setSelectedReport(null);
    setImageUrls([]);
    setVideoUrl("");
  };

  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  return (
    <Background>
      <Container>
        <Header>신고내역확인</Header>
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
            {filteredReports.map((report) => (
              <List key={report.reportPk} onClick={() => openModal(report)}>
                <StateArea>{report.state}</StateArea>
                <ListInfoArea>
                  <TitleArea>
                    <TitleText>{report.reportName}</TitleText>
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
      {selectedReport && (
        <Modal onClick={closeModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={closeModal}>&times;</CloseButton>
            <Section>
              <SectionTitle>신고명</SectionTitle>
              <SectionContent>{selectedReport.reportName}</SectionContent>
            </Section>
            <Section>
              <SectionTitle>상태</SectionTitle>
              <SectionContent>{selectedReport.state}</SectionContent>
            </Section>
            <Section>
              <SectionTitle>상세 내용</SectionTitle>
              <SectionContent>{selectedReport.reportDetail}</SectionContent>
            </Section>

            <Section>
              <SectionTitle>날짜</SectionTitle>
              <SectionContent>
                {formatDateWithTime(selectedReport.reportDate)}
              </SectionContent>
            </Section>
            {selectedReport.state === "반려" && (
              <Section>
                <SectionTitle>반려 사유</SectionTitle>
                <SectionContent>
                  {selectedReport.rejectionReason}
                </SectionContent>
              </Section>
            )}
            <Section>
              <SectionTitle>사고 사진</SectionTitle>
              <ImageGrid>
                {imageUrls.map((url, index) => (
                  <Thumbnail
                    key={index}
                    src={url}
                    alt={`사고 사진 ${index + 1}`}
                    onClick={() => openImageModal(url)}
                  />
                ))}
              </ImageGrid>
            </Section>
            <Section>
              <SectionTitle>블랙박스 영상</SectionTitle>
              <video
                controls
                style={{ maxWidth: "100%", height: "auto" }}
                src={videoUrl}
                type="video/mp4"
                crossOrigin="anonymous"
                muted
              >
                브라우저가 비디오 태그를 지원하지 않습니다.
              </video>
            </Section>
          </ModalContent>
        </Modal>
      )}
      {selectedImage && (
        <FullImageModal onClick={closeImageModal}>
          <FullImageContent onClick={(e) => e.stopPropagation()}>
            <FullImageCloseButton onClick={closeImageModal}>
              &times;
            </FullImageCloseButton>
            <FullImage src={selectedImage} alt="확대된 사고 사진" />
          </FullImageContent>
        </FullImageModal>
      )}
      <Navbar />
    </Background>
  );
};

export default ReportList;
