import React from "react";
import styled from "styled-components";

const Overlay = styled.div`
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

const Modal = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h3`
  margin-bottom: 20px;
`;

const Button = styled.button`
  display: block;
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:first-child {
    background-color: #ffc700;
    color: white;
  }

  &:nth-child(2) {
    background-color: #5ab2ff;
    color: white;
  }

  &:nth-child(3) {
    background-color: #f44336;
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`;

const LocationModal = ({
  locationName,
  latitude,
  longitude,
  show,
  onClose,
  onStartRoute,
  onReportPothole,
}) => {
  if (!show) return null;

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Title>{locationName}</Title>
        <Button
          onClick={() => {
            onStartRoute(latitude, longitude, locationName, true);
            onClose();
          }}
        >
          경로 안내
        </Button>
        <Button
          onClick={() => {
            onReportPothole(latitude, longitude);
          }}
        >
          포트홀 신고
        </Button>
        <Button onClick={onClose}>닫기</Button>
      </Modal>
    </Overlay>
  );
};

export default LocationModal;
