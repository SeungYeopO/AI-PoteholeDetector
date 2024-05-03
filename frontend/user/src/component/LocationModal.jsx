import React from "react";

const LocationModal = ({
  locationName,
  latitude,
  longitude,
  show,
  onClose,
  onStartRoute,
}) => {
  if (!show) return null;

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.5)", // 살짝 어두운 배경 추가
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalStyle = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "5px",
    width: "300px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  };

  return (
    <div style={overlayStyle}>
      <div style={modalStyle}>
        <h2>위치 정보</h2>
        <p>{locationName}</p>
        <button
          onClick={() => {
            onStartRoute(latitude, longitude, true);
            onClose();
          }}
        >
          경로 안내
        </button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  );
};

export default LocationModal;
