import styled from "styled-components";
import { useState, useEffect } from "react";


const Background = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color :#949EFF;
  flex-direction : column;

`
const Container = styled.div`
  width : 90%;
  height : 90%;
  /* background-color : lightblue; */
  display : flex;
  flex-direction : column;
  justify-content : space-around;
  align-items : center;
`
const Title = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  font-size : 4rem;
  width : 70%;
  height : 15%;
  /* background-color : lightcoral; */
  font-size : 4rem;
  
`

const Content = styled.div`
    display : flex;
    flex-direction :column;
    justify-content : space-around;
    align-items : center;
    width : 100%;
    height: 80%;
    /* background-color : lightcyan; */
`

const UserBox = styled.div`
  width : 95%;
  height : 87%;
  /* background-color : lightgreen; */
  display : flex;
  flex-direction : column;
  justify-content : space-around;
  align-items : center;

`

const SubmitBtn = styled.button`
  display : flex;
  justify-content : center;
  align-items : center;
  border-radius : 1rem;
  width : 35%;
  height : 9%;
  background-color : #DCC80D;
  font-family :  'BlackHanSans';
  font-size : 2rem;
  border : none;

`
const Box = styled.div`
  width : 95%;
  height : 15%;
  /* background-color : lightseagreen; */
  display : flex;
  flex-direction : column;
  justify-content : space-around;
  align-items : left;

`
const IdBox = styled.div`
  /* background-color : lightseagreen; */
  display : flex;
  justify-content : space-around;
  align-items : left;
  width : 95%;
  height : 60%;

`

const Input = styled.input`
  border-radius : 1.1rem;
  border : none;
  background-color : #F8F8F8;
  border : solid 1px #F5EAEA;
  opacity : 70%;
  font-size : 1.3rem;
  font-family : 'BlackHanSans';
  text-indent : 0.3rem;
  width : ${(props) => props.width || '90%'};
  height :${(props) => props.height || '60%'};
  &::placeholder {
    color: #6f6c6c;
    font-family : 'BlackHanSans';
    font-size: 1.25rem;
    font-weight: 300;
  }

`
const DoubleChekcBtn = styled.div`
  display : flex;
  justify-content : center;
  align-items : center;
  color : white;
  font-size : 1.3rem;
  background-color : #5d2fde;
  width : 15%;
  height : 100%;
  border-radius : 1rem;



  
`
const Text = styled.div`
 display : flex;
 justify-content : left;
 align-items : center; 
 font-size : 1.5rem;
 width : 60%;
 height : 40%;
 /* background-color : gray; */
`
const SignUp = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState(false);
  const [validPassword, setValidPassword] = useState();
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [validCheckId, setvalidCheckId] = useState();

  const handleIdChange = (event) => {
    console.log(' 아이디', event.target.value);
    setUserId(event.target.value); 
  }
  
    const handlePasswordChange = (event) => {
      const password = event.target.value;
      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,15}$/;
      setValidPassword(!regex.test(password));
      setUserPassword(password);
    };

  const handleConfirmPasswordChange = (event) => {
    console.log("비밀번호 확인:", event.target.value);
    setConfirmpassword(event.target.value);
    setPasswordMatch(event.target.value === userPassword);
    console.log(event.target.value === userPassword);
  };

  return (
    <Background>
      <Container>
        <Title>회원가입</Title>
        <Content>
          <UserBox>
          <Box>
              <Text>아이디</Text>
              <IdBox>
                <Input onChange={handleIdChange} type="text" placeholder="5~10자리 영어, 특수문자 불가" width="80%" height="100%"></Input>
                <DoubleChekcBtn>중복</DoubleChekcBtn>
              </IdBox>
            </Box>
            <Box>
              <Text>비밀번호</Text>
              <Input onChage={handlePasswordChange} type="password" placeholder="비밀번호를 입력하세요"></Input>
            </Box>
            <Box>
              <Text>비밀번호확인</Text>
              <Input onChange={handleConfirmPasswordChange} type="password" placeholder="비밀번호를 재입력하세요"></Input>
            </Box>
            <Box>
              <Text>이름</Text>
              <Input placeholder="이름을 입력하세요"></Input>
            </Box>
      
            <Box>
              <Text>전화번호</Text>
              <Input placeholder="전화번호를 입력하세요"></Input>
            </Box>

            <Box>
              <Text>블랙박스 고유번호</Text>
              <Input placeholder="블랙박스 번호를 입력하세요(선택)"></Input>
            </Box>
          </UserBox>
          <SubmitBtn>가입</SubmitBtn>
        </Content>
      </Container>

    </Background>
  );
};

export default SignUp;