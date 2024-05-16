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
  background-color :#FDF891;
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
  background-color : #ffffff;
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
  border-radius: 1.1rem;
  border: none;
  background-color: #ffffff;
  border: solid 1px #F5EAEA;
  font-size: 1.3rem;
  font-family: 'BlackHanSans';
  text-indent: 0.3rem;
  width: ${(props) => props.width || '90%'};
  height: ${(props) => props.height || '60%'};
  outline : none;

	&:focus{ 
		border: 1px solid blue;
	}

  &::placeholder {
    color: #6f6c6c;
    font-family: 'BlackHanSans';
    font-size: 1.25rem;
    font-weight: 300;
  }
`;

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
 width : ${(props) => props.width || '40%'};
 height : 40%;
 margin-top : ${(props) => props.marginTop || '0rem'};
 color : ${(props) => props.color || 'black'};
 /* background-color : gray; */
`
const TextBox = styled.div`
  display : flex;
  width : 90%;
  height : 40%;
  /* background-color : red; */
  align-items : center;
  justify-content : space-between;
 
  

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
  const [isFocused, setIsFocused] = useState(false);
  const [pwErrorText, setPWErrorText] = useState('');
  const [color, setColor] = useState('');
  const [pwMatchText, setPWMatchText] = useState('');

  const handleIdChange = (event) => {
    const id = event.target.value;
    const regex = /^[a-zA-Z0-9]{5,10}$/;
    setValidUserId(regex.test(id));
    setUserId(event.target.value); 
    if (id.length === 0) {
      setErrorText(''); // 길이가 0일 때 에러 문구를 비웁니다.
    } else if (!regex.test(id)) {
      setErrorText('형식에 맞지 않습니다');
      setColor('red');
    } else {
      setErrorText('');
    }
  }
  

  const getBorderStyle = () => {
    if (isFocused) {
      return 'solid 1px blue'; // 포커스 시 파란색 border
    } else if (!validUserId && userId.length > 0) {
      return 'solid 4px red'; // 유효하지 않은 경우 빨간색 border
    } else {
      return 'solid 1px #F5EAEA'; // 기본 border
    }
  };


  
    const handlePasswordChange = (event) => {
      const password = event.target.value;
      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*()]).{8,15}$/;
      setValidPassword(regex.test(password));
      setUserPassword(password);

      if (password.length === 0) {
        setPWErrorText(''); // 길이가 0일 때 에러 문구를 비웁니다.
      } else if (!regex.test(password)) {
        setPWErrorText('형식에 맞지 않습니다');
   
      } else {
        setPWErrorText('');
      }
    };

    

  const handleConfirmPasswordChange = (event) => {
    setConfirmpassword(event.target.value);
    setPasswordMatch(event.target.value === userPassword);
    if (event.target.value.length === 0) {
      setPWMatchText(''); // 길이가 0일 때 에러 문구를 비웁니다.
    } else if (!(event.target.value === userPassword)) {
      setPWMatchText('정보가 일치하지 않습니다');
    } else {
      setPWMatchText('');
    }


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
          setColor('green');
          setDoubleCheck(true);
          console.log('사용가능한 아이디')
        } else{
          setErrorText('이미 있는 아이디입니다')
          setColor('red');
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
                <Text width="25%">아이디</Text>
                <Text width="65%" color={color} fontSize="1.1rem">{errorText}</Text>
              </TextBox>
              <IdBox>
                <Input onChange={handleIdChange} type="text" placeholder="5~10자리 영어, 특수문자 불가" width="80%" height="100%"></Input>
                <DoubleChekcBtn  style={{ backgroundColor: validUserId && userId.length > 0 ? "green" : "#CACACA" }} disabled={validUserId && userId.length > 0} onClick={gotoDoubleCheck}>중복</DoubleChekcBtn>
              </IdBox>
            </Box>
            <Box>
              <TextBox>
               <Text width="30%">비밀번호</Text>
               <Text width="60%" fontSize="1.1rem" color="red" >{pwErrorText}</Text>
              </TextBox>
              <Input onChange={handlePasswordChange} type="password" placeholder="8~15자리 영문, 숫자, 특수문자 필수"></Input>
            </Box>
            <Box>
              <TextBox>
                <Text width="38%">비밀번호확인</Text>
                <Text width="55%" color="red"  fontSize="1.1rem" >{pwMatchText}</Text>
              </TextBox>
              <Input onChange={handleConfirmPasswordChange} type="password" placeholder="비밀번호를 재입력하세요"></Input>
            </Box>
            <Box>
              <Text>이름</Text>
              <Input onChange={handleNameChange} placeholder="이름을 입력하세요"></Input>
            </Box>
      
            <Box>
              <Text>전화번호</Text>
              <Input onChange={handleNumberChange} placeholder="번호를 입력해주세요(-제외, 숫자만)"></Input>
            </Box>

            <Box>
              <Text width="60%">블랙박스 고유번호</Text>
              <Input  onChange={handleBlackboxNumberChange} placeholder="블랙박스 번호를 입력하세요(선택)"></Input>
            </Box>
          </UserBox>
          <SubmitBtn onClick={gotoSignup} style={{ backgroundColor: totalValid ? "green" : "#CACACA" }} disabled={!totalValid}>
            가입
          </SubmitBtn>
        </Content>
      </Container>

    </Background>
  );
};

export default SignUp;


