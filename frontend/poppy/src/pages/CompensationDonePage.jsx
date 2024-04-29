import styled from "styled-components";
import SideNav from "../components/SideNav_ver2";
import { useState, useEffect } from "react";
import closeBtnImg from '../assets/modal/closeBtn.png'
import { useNavigate } from "react-router-dom";
import Calender from 'react-calendar';
import '../../node_modules/react-calendar/dist/Calendar.css';

const Background = styled.div`
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
  background-color : darkgray;
  width : 100%;
  height : 10%;
  font-size : 1.1rem;
  display : flex;
  align-items : center;  
`
const GridArea = styled.div`
  margin-top : 0.8rem;
  background-color : white;
  width : 100%;
  height : 83%;
  display : grid;
  flex-wrap : wrap;
  grid-template-columns : repeat(4, 1fr);
  justify-content : center;
  background-color : lightcoral;
`
const Page = styled.div`
  background-color : red;
  width : 100%;
  height : 7%;
`

const CompensationDonePage = () => {
  return (
    <Background>
        <SideNav />
        <Content>
        <TimeArea></TimeArea>
        <GridArea>
            </GridArea>
            <Page>
            </Page>
        </Content>
    </Background>
  );
};

export default CompensationDonePage;