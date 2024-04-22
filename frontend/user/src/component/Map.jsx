import React, { useEffect } from "react";

function Map() {
  useEffect(() => {
    // 스크립트 로딩 확인
    const loadScript = () => {
      if (!window.Tmapv2) {
        const script = document.createElement("script");
        script.src = "https://apiurl/to/tmapv2"; // Tmapv2 스크립트 URL
        script.onload = initTmap;
        document.head.appendChild(script);
      } else {
        initTmap();
      }
    };

    // 맵 초기화
    const initTmap = () => {
      if (!window.map) {
        // map 객체가 이미 초기화되지 않았는지 확인
        window.map = new Tmapv2.Map("TMapApp", {
          center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
          width: "20%",
          height: "50%",
          zoom: 16,
        });
      }
    };

    loadScript();
  }, []); // 의존성 배열을 빈 배열로 설정

  return (
    <div
      id="TMapApp"
      style={{ height: "100%", width: "100%", position: "fixed" }}
    />
  );
}

export default Map;
