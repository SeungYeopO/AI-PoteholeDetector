import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const Background = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color :#949EFF;
  flex-direction : column;
  position : fixed;
  left : 0;
  top : 0;

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
 font-size : ${(props) => props.fontSize || '1.5rem'};
 width : ${(props) => props.width || '60%'};
 height : 40%;
 margin-top : ${(props) => props.marginTop || '0rem'};
 color : ${(props) => props.color || 'black'};
 /* background-color : gray; */
`
const TextBox = styled.div`
  display : flex;
  width : 80%;
  height : 40%;
  

`
const SignUp = () => {
  const [userId, setUserId] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmpassword] = useState("");
  const [validPassword, setValidPassword] = useState(true);
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [validUserId, setValidUserId] = useState(true);
  const [userName, setUserName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [userBlackboxNumber, setUserBlackboxNumber] = useState("");
  const [totalValid, setTotalValid] = useState(false);
  const [doubleCheck, setDoubleCheck] = useState(false);
  const [errorText, setErrorText] = useState('');
  const navigate = useNavigate();

  const handleIdChange = (event) => {
    const id = event.target.value;
    const regex = /^[a-zA-Z0-9]{5,10}$/;
    setValidUserId(regex.test(id));
    setUserId(event.target.value); 
  }
  
    const handlePasswordChange = (event) => {
      const password = event.target.value;
      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,15}$/;
      setValidPassword(regex.test(password));
      setUserPassword(password);
    };

  const handleConfirmPasswordChange = (event) => {
    setConfirmpassword(event.target.value);
    setPasswordMatch(event.target.value === userPassword);

  };

  const handleNameChange = (event) => {
    setUserName(event.target.value);
    console.log('이름', event.target.value);
  };

  const handleNumberChange = (event) => {
    setUserPhoneNumber(event.target.value);
  };

  const handleBlackboxNumberChange = (event) => {
    setUserBlackboxNumber(event.target.value);
  };
  
  useEffect(() => {
    setTotalValid(
      userId.length > 0 &&
        validUserId &&
        userPassword.length > 0 &&
        validPassword &&
        passwordMatch &&
        userName.length > 0 &&
        userPhoneNumber.length > 10 &&
        doubleCheck
    );
  }, [userId, validUserId, userPassword, validPassword, passwordMatch, userName, userPhoneNumber, doubleCheck]);

  const gotoDoubleCheck = async () => {
    console.log('click');
    const userData = {
      loginId : userId
    };
    try{
      const response = await fetch("/api/users/duplicate-id", {
        method : "POST",
        headers : {
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(userData),
      });
      if (response.ok){
        const responseData = await response.json();
        console.log(responseData.result);
        if(responseData.result){
          setErrorText('사용 가능한 아이디입니다')
          setDoubleCheck(true);
          console.log('사용가능한 아이디')
        } else{
          setErrorText('이미 존재하는 아이디입니다')
          setDoubleCheck(false);
          console.log('이미 있는 아이디')
        }
      } else{
        console.error('중복확인 실패');
        console.log(userData);
      }
    } catch (error) {
      console.error("오류발생", error);
    }
  };

  const gotoSignup = async () => {
    console.log('click');
    const userData = {
      loginId : userId,
      password : userPassword,
      userName : userName,
      phoneNumber : userPhoneNumber
    };
    try {
      const response = await fetch("/api/users", {
        method : "POST",
        headers : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if(response.ok){
        const responseData = await response.json();
        console.log('회원가입완료', responseData.result);
        navigate('/login')
      } else{
        console.log('회원가입 실패');
      }
    } catch(error){
      console.log('애러발생',error);
    }
}

  return (
    <Background>
      <Container>
        <Title>회원가입</Title>
        <Content>
          <UserBox>
          <Box>
              <TextBox>
                <Text width="30%">아이디</Text>
                <Text width="65%" style={{color : doubleCheck ? 'green' : 'red'}} fontSize="1.2rem" marginTop ="1rem">{errorText}</Text>
              </TextBox>
              <IdBox>
                <Input style={{border : validUserId || userId.length === 0 ? "solid 1px #F5EAEA" : "solid 4px red" }} onChange={handleIdChange} type="text" placeholder="5~10자리 영어, 특수문자 불가" width="80%" height="100%"></Input>
                <DoubleChekcBtn  style={{ backgroundColor: validUserId && userId.length > 0 ? "green" : "gray" }} disabled={validUserId && userId.length > 0} onClick={gotoDoubleCheck}>중복</DoubleChekcBtn>
              </IdBox>
            </Box>
            <Box>
              <Text>비밀번호</Text>
              <Input style={{border : validPassword || userPassword.length === 0 ? "solid 1px #F5EAEA" : "solid 4px red" }}  onChange={handlePasswordChange} type="password" placeholder="8~15자리 영문, 숫자, 특수문자 필수"></Input>
            </Box>
            <Box>
              <Text>비밀번호확인</Text>
              <Input style={{border : passwordMatch || confirmPassword.length === 0 ? "solid 1px #F5EAEA" : "solid 4px red" }} onChange={handleConfirmPasswordChange} type="password" placeholder="비밀번호를 재입력하세요"></Input>
            </Box>
            <Box>
              <Text>이름</Text>
              <Input onChange={handleNameChange} placeholder="이름을 입력하세요"></Input>
            </Box>
      
            <Box>
              <Text>전화번호</Text>
              <Input onChange={handleNumberChange} placeholder="번호를 입력해주세요 (ex.01012345678)"></Input>
            </Box>

            <Box>
              <Text>블랙박스 고유번호</Text>
              <Input onChange={handleBlackboxNumberChange} placeholder="블랙박스 번호를 입력하세요(선택)"></Input>
            </Box>
          </UserBox>
          <SubmitBtn onClick={gotoSignup} style={{ backgroundColor: totalValid ? "green" : "gray" }} disabled={!totalValid}>
            가입
          </SubmitBtn>
        </Content>
      </Container>

    </Background>
  );
};

export default SignUp;