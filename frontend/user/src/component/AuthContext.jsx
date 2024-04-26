import React, { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // 로컬 스토리지에서 사용자 정보 불러오기
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (userInfo) => {
    localStorage.setItem("user", JSON.stringify(userInfo)); // 로그인 정보를 로컬 스토리지에 저장
    setUser(userInfo);
  };

  const logout = () => {
    localStorage.removeItem("user"); // 로그아웃 시 로컬 스토리지에서 사용자 정보 삭제
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
