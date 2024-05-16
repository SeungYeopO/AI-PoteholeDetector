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
  justify-content : center;
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
  background-color: #FFC700;
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
  border: 2px solid #FFC700;
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
  font-size: 1.4rem;
  overflow-wrap: break-word; /* 텍스트가 넘치면 숨김 처리 */
  text-overflow: ellipsis; /* 텍스트가 넘칠 경우 '...'로 처리 */
  /* background-color : lightblue; */
`;
const DateArea = styled.div`
  width: 100%;
  height: 30%;
  /* background-color : lightcoral; */
  display: flex;
  justify-content: right;
`;
const DateText = styled.div`
  display: flex;
  margin-right: 2rem;
  width: 25%;
  font-size: 1.2rem;
  /* background-color : red; */
  height: 100%;
`;

const ReportList = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [iscalenderOpen, setIsCalenderOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const updatedFilteredReports = filterReportsByDate(reports, selectedDate);
    setFilteredReports(updatedFilteredReports);
  }, [reports, selectedDate]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get(`/api/accident-report/user/${user}`);
        console.log(response.data.result);
        setReports(response.data.result); // 데이터를 상태에 저장
      } catch (error) {
        console.error("Failed to fetch reports:", error);
      }
    };

    fetchReports();
  }, [user]); // userPk가 변경될 때마다 API 요청

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
    if (!selectedDate) return reports; // 날짜가 선택되지 않았다면 모든 비디오를 반환
    return reports.filter((reports) => {
      const reportsDate = formatDateWithTime(reports.reportDate).slice(0, 10); // YYYY-MM-DD 형식으로 날짜 추출
      return reportsDate === selectedDate;
    });
  };

  const handleDateClick = (value) => {
    setSelectedDate(formatDate(value));
    setIsCalenderOpen(false);
  };
  const openCalender = () => {
    if (!iscalenderOpen) {
      setIsCalenderOpen(true);
    } else {
      setIsCalenderOpen(false);
    }
  };
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
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
              <List key={report.reportPk}>
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
      <Navbar />
    </Background>
  );
};

export default ReportList;
