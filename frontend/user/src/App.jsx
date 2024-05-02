
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./component/AuthContext";
import Map from "./component/Map";
import Report from "./component/Report";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Navbar from "./component/Navbar";
import { useAuth } from "./component/AuthContext";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Logo from '../public/img/mainLogo.png';
import styled from "styled-components";

const Container = styled.div`
  width : 80%;
  height : 80%;
  /* background-color : pink; */
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : space-around;
`
const LogoBox = styled.div`
  display : flex;
  align-items : center;
  justify-content : center;
  margin-top : 3rem;
  width : 80%;
  height : 45%;
  /* background-color : lightcoral; */
`

const UserBox = styled.div`
  width : 90%;
  height : 30%;
  /* background-color : lightseagreen; */
  display : flex;
  flex-direction : column;
  align-items : center;
  justify-content : space-between;
  
`
const LinkBox = styled.div`
  margin-top : 1rem;
  display : flex;
  align-items : center;
  justify-content : center;
  font-size : 3rem;
  width : 100%;
  height : 35%;
  background-color : #F5EAEA;
  border-radius : 1.5rem;

`
const LogoImg = styled.img`
  width : 19rem;
  height : 19rem;
  
`
function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} /> 
            <Route path="/map" element={<Map />} />  
            {/* // Map 컴포넌트는 자체적으로 로그인 확인 */}
            <Route path="/report" element={<Report />} /> 
            {/* // Report 컴포넌트도 자체적으로 로그인 확인 */}
          </Routes>
          <NavbarWithAuth/>
        </div>
      </Router>
    </AuthProvider>
  );
}

function MainScreen() {
  const navigate = useNavigate();
  const { user } = useAuth();
  console.log(user);
  if (user) {
    return <Navigate to="/Map" />;
  }

  const gotoLogin = () => {
    navigate('/login')
  }

  const gotoSignup = () => {
    navigate('/SignUp')
  }

  return (
    <div className="main-screen" style={{
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#949EFF"
    }}>
      <Container>
        <LogoBox>
          <LogoImg src={Logo}></LogoImg>
        </LogoBox>
        <UserBox>
            <LinkBox onClick={gotoLogin}>로그인</LinkBox>
            <LinkBox onClick={gotoSignup}>회원가입</LinkBox>
        </UserBox>
      </Container>

    </div>
  );
}

function NavbarWithAuth() {
  const { user } = useAuth();
  if (!user) {
    return null;
  }

  return <Navbar />;
}

export default App;
