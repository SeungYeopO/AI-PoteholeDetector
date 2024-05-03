import React from "react";
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
import "./firebase-messaging-sw.js";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/map" element={<Map />} /> // Map 컴포넌트는 자체적으로
            로그인 확인
            <Route path="/report" element={<Report />} /> // Report 컴포넌트도
            자체적으로 로그인 확인
          </Routes>
          <NavbarWithAuth />
        </div>
      </Router>
    </AuthProvider>
  );
}

function MainScreen() {
  const { user } = useAuth();
  console.log(user);
  if (user) {
    return <Navigate to="/Map" />;
  }

  return (
    <div className="main-screen">
      <h1>환영합니다</h1>
      <Link to="/login">
        <button>로그인</button>
      </Link>
      <Link to="/SignUp">
        <button>회원가입</button>
      </Link>
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
