import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
`;

const InputBox = styled.textarea`
  width: 93%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 1rem;
  resize: none;
`;

const SaveBtn = styled.button`
  width: 100%;
  height: 40px;
  border-radius: 5px;
  background-color: lightcoral;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  color: white;
  cursor: pointer;
  border: none;
  margin-bottom: 10px;
`;

const PotholeReportModal = ({ latitude, longitude, onClose }) => {
  const [reportContent, setReportContent] = useState("");

  const handleContentChange = (event) => {
    setReportContent(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log(latitude);
    console.log(longitude);
    console.log(reportContent);
    const data = {
      latitude: latitude,
      longitude: longitude,
      content: reportContent,
    };

    try {
      const response = await axios.post("/api/potholes/by-user", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data.success);
      if (response.data.success === true) {
        alert("포트홀 신고가 완료되었습니다.");
        onClose();
      }
    } catch (error) {
      console.error("Upload failed", error);
    }
  };

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>&times;</CloseButton>
        <h2>포트홀 신고</h2>
        <form onSubmit={handleSubmit}>
          <InputBox
            value={reportContent}
            onChange={handleContentChange}
            placeholder="포트홀에 대한 상세 위치 및 정보를 입력해주세요. 허위신고 시 처벌 받을 수 있습니다."
          />
          <SaveBtn type="submit">제출</SaveBtn>
        </form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default PotholeReportModal;
