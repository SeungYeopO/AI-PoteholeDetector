import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar" style={{ bottom: "10px", padding: "25px" }}>
      <Link to="/map">지도 보기</Link>
      <Link to="/report">신고하기</Link>
      <Link to="/reports">신고목록</Link>
      <Link to="/blackbox">블랙박스</Link>
    </div>
  );
}

export default Navbar;
