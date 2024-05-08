import styled from "styled-components";

const Background = styled.div`
  position : fixed;
  left : 0;
  top : 0;
  width : 100vw;
  height : 100vh;
`
const Container = styled.div`
  width : 100%;
  height : 91%;
  display : flex;
  flex-direction : column;
  /* background-color : yellow; */
  `
  const Header = styled.div`
  width : 100%;
  height : 10%;
  /* background-color : red; */
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 2rem;
  border : #D8D8D8 1px solid;
`


const ReportList = () => {
  return (
    <Background>
      <Container>
        <Header>신고내역확인</Header>
      </Container>
    </Background>
  );
};

export default ReportList;