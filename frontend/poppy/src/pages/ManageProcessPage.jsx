import styled from "styled-components";
import SideNav from "../components/SideNav";
import { useState, useEffect } from "react";
import Calender from 'react-calendar';


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
  background-color : purple;
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
  background-color : pink;
  width : 95%;
  height: 73%;
`
const Page = styled.div`
  background-color : green;
  width : 95%;
  height : 7%;
`
const SortedBox = styled.div`
  background-color : lightcoral;
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
  background-color : #e83e3e;
`
const LocationBox = styled.div`
  display : flex;
  width : 34%;
  height : 30%;
  background-color : #e1e153;
`
const StateBox = styled.div`
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
const AreaDrop = styled.div`
  width : 44%;
  height : 100%;
  background-color : darkgray;
  
`
const BoxName = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 25%;
  height : 100%;
  background-color : gray;
  font-size : 1.4rem;

`
const BoxName1 = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  width : 12.5%;
  height : 100%;
  font-size : 1.4rem;
  background-color : gray;
`
const DateTable = styled.div`
  background-color : black;
  width : 75%;
  height : 100%;
  display : flex;

`
const StateDrop = styled.div`
  
`
const DropArea = styled.div`
  width  :87.5%;
  height : 100%;
  display : flex;
  align-items : center;
  justify-content : space-between;
  
`
const ListHeader = styled.div`
  background-color : lightseagreen;
  width : 87.5;
  height : 8%;
  display : flex;
  align-items : center;
  justify-content : space-around;
  /* justify-content : center; */

`
const Lists = styled.div`
  display : flex;
  align-items : center;
  justify-content : space-around;
  background-color : #ebbc8e;
  width : 100%;
  height : 8%;
  
`
const SortedList = styled.div`
  background-color : lightcyan;
  width : 95%;
  height : 95%;
  display : flex;
  flex-direction : column;
  justify-content : space-between;
`
const Info = styled.div`
  width : ${(props) => props.width || '10%'};
  height : ${(props) => props.height || '90%'};
  background-color : yellow;
  display : flex;
  justify-content : center;
  align-items : center;
`
const CalenderImg = styled.div`
  width : 25%;
  height : 100%;
  background-color : red;
  
`
const CalenderModal = styled.div`
  background-color: white;
  opacity : 98%;
  border-radius : 1rem;
  width: 20rem; 
  height: 15rem; 
  position: fixed;
  top: 50%; 
  left: 50%; 
  transform: translate(-110%, -165%);
  z-index: 1000;
  
`
const CloseBtn = styled.button`
  
`
const ManageProcessPage = () => {
  const [ismodalOpen, setIsModalOpen] = useState(false);
  const [value, onChange] = useState(null);



  const modalOpen = () => {
    console.log('click')
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
    console.log(value)
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
                <Info width="75%" height="100%"></Info>
                <CalenderImg onClick={modalOpen}></CalenderImg>
              </DateTable>
            </DateBox>
            <LocationBox>
              <BoxName1>지역</BoxName1>
              <DropArea>
                <AreaDrop></AreaDrop>
                <AreaDrop></AreaDrop>
              </DropArea>
            </LocationBox>
            <StateBox>
              <BoxName>상태</BoxName>
              <StateDrop></StateDrop>
            </StateBox>
            <SearchBtn>검색</SearchBtn>
          </SortedBox>
        </SortedArea>
        <ResultArea>
            <SortedList>
              <ListHeader>
                <Info></Info>
                <Info width="48%"></Info>
                <Info width="20%"></Info>
                <Info></Info>
              </ListHeader>
              <Lists>
              <Info></Info>
                <Info width="48%"></Info>
                <Info width="20%"></Info>
                <Info></Info>
              </Lists>
              <Lists></Lists>
              <Lists></Lists>
              <Lists></Lists>
              <Lists></Lists>
              <Lists></Lists>
              <Lists></Lists>
              <Lists></Lists>
              <Lists></Lists>
              <Lists></Lists>
            </SortedList>
        </ResultArea>
        <Page></Page>
      </Content>
      {ismodalOpen && (
        <CalenderModal>
            <Calender onChange={onChange} value={value} />
            <CloseBtn onClick={closeModal}>선택</CloseBtn>
        </CalenderModal>
      )}
    </Background>
  );
};

export default ManageProcessPage; 