import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Map from "./component/Map";
import Report from "./component/Report";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <div className="content">
          <Routes>
            <Route path="/" element={<Map key={new Date()} />} />
            <Route path="/report" exact element={<Report />} />
          </Routes>
        </div>
        <Navbar />
      </div>
    </Router>
  );
}

function Navbar() {
  return (
    <div className="navbar">
      <Link to="/">홈</Link>
      <Link to="/report">신고하기</Link>
      <Link to="/reports">신고목록</Link>
      <Link to="/blackbox">블랙박스</Link>
    </div>
  );
}

export default App;
