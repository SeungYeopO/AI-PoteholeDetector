import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import POISearch from "./POISearch";
import SearchResults from "./SearchResults";

let resultMarkerArr = [];
let resultdrawArr = [];

const startX = 126.98217734415019;
const startY = 37.56468648536046;

function Map() {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);

  useEffect(() => {
    const mapContainerId = "TMapApp";
    const loadScript = () => {
      if (!window.Tmapv2) {
        const script = document.createElement("script");
        script.src = "https://apiurl/to/tmapv2";
        script.onload = () => {
          initTmap(); // 스크립트 로드 후 맵 초기화
        };
        document.head.appendChild(script);
      } else {
        initTmap(); // 스크립트가 이미 로드된 경우 바로 맵 초기화
      }
    };

    const initTmap = () => {
      const container = document.getElementById(mapContainerId);
      if (container) {
        container.innerHTML = ""; // 컨테이너 비우기
      }

      // 맵 새로 생성
      window.map = new Tmapv2.Map(mapContainerId, {
        center: new Tmapv2.LatLng(37.566481622437934, 126.98502302169841),
        width: "100%",
        height: "100%",
        zoom: 19,
      });
    };

    loadScript();

    // 컴포넌트 언마운트 시 맵 인스턴스 정리
    return () => {
      const container = document.getElementById(mapContainerId);
      if (container) {
        container.innerHTML = ""; // 컨테이너를 비우면 맵도 제거됨
      }
    };
  }, []); // 종속성 배열을 빈 배열로 설정하여 컴포넌트 마운트 시 한 번만 실행

  const handleMapClick = () => {
    // SearchResults 컴포넌트가 열려있으면 닫음
    if (showResults) {
      setShowResults(false);
    }
  };

  const handleSearch = async () => {
    if (searchQuery) {
      await POISearch(searchQuery, setSearchResults, startY, startX);
      setShowResults(true);
    }
  };

  const handleLocationSelect = (lat, lng) => {
    const epsg3857 = new Tmapv2.Point(lng, lat);
    const wgs84 = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(epsg3857);
    const startX = 126.98217734415019; // 시작점 경도
    const startY = 37.56468648536046;
    const endX = wgs84._lng; // 도착점 경도
    const endY = wgs84._lat; // 도착점 위도

    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        appKey: "ew5nSZ1Mk66M0B2t7GmhDaLb5jks5Nv35LDBJ3A5",
      },
      body: JSON.stringify({
        tollgateFareOption: 16,
        roadType: 32,
        directionOption: 0,
        endX: endX,
        endY: endY,
        endRpFlag: "G",
        reqCoordType: "WGS84GEO",
        startX: startX,
        startY: startY,
        gpsTime: "20191125153000",
        speed: 10,
        uncetaintyP: 1,
        uncetaintyA: 1,
        uncetaintyAP: 1,
        carType: 0,
        startName: "%EC%9D%84%EC%A7%80%EB%A1%9C%20%EC%9E%85%EA%B5%AC%EC%97%AD",
        endName: "%ED%97%A4%EC%9D%B4%EB%A6%AC",
        //passList: "127.38454163183215,36.35127257501252",
        // gpsInfoList:
        //   "126.939376564495,37.470947057194365,120430,20,50,5,2,12,1_126.939376564495,37.470947057194365,120430,20,50,5,2,12,1",
        detailPosFlag: "2",
        resCoordType: "WGS84GEO",
        sort: "index",
      }),
    };
    resettingMap();
    const midPoint = updateMapCenterAndZoom(startY, startX, endY, endX);
    fetch(
      "https://apis.openapi.sk.com/tmap/routes?version=1&callback=function",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response); // 전체 응답 데이터를 콘솔에 출력
        const resultData = response.features;
        const pathPoints = resultData
          .map((feature) => {
            return feature.geometry.coordinates.map((coord) => {
              return new Tmapv2.LatLng(coord[1], coord[0]); // 좌표를 Tmapv2.LatLng 객체로 직접 변환
            });
          })
          .flat();
        drawLine(pathPoints, "0"); // traffic 정보 없이 모두 빨간색으로 통일

        setSelectedRoute({
          distance: response.features[0].properties.totalDistance / 1000,
          time: response.features[0].properties.totalTime / 60,
          arrivalTime: new Date(
            Date.now() + response.features[0].properties.totalTime * 1000
          ),
        });
      })
      .catch((err) => console.error(err));

    setShowResults(false);
  };
  function simpleDistance(lat1, lon1, lat2, lon2) {
    const latDiff = lat2 - lat1;
    const lonDiff = lon2 - lon1;
    return Math.sqrt(latDiff * latDiff + lonDiff * lonDiff);
  }

  // 줌 레벨을 결정하는 함수
  function getZoomLevel(distance) {
    if (distance < 0.02) return 15; // 2km 미만
    else if (distance < 0.05) return 14; // 5km 미만
    else if (distance < 0.1) return 13; // 10km 미만
    else if (distance < 0.2) return 12; // 20km 미만
    else if (distance < 0.4) return 11; // 40km 미만
    else if (distance < 0.8) return 10; // 80km 미만
    else if (distance < 1.6) return 9;
    else if (distance < 3) return 8;
    else return 7.7; // 그 이상
  }

  // 맵 중심 설정과 줌 레벨 조정
  function updateMapCenterAndZoom(startLat, startLng, endLat, endLng) {
    const midLat = (startLat + endLat) / 2;
    const midLng = (startLng + endLng) / 2;
    const distance = simpleDistance(startLat, startLng, endLat, endLng);
    const zoomLevel = getZoomLevel(distance);
    console.log(distance);
    window.map.setCenter(new Tmapv2.LatLng(midLat, midLng));
    window.map.setZoom(zoomLevel);

    const startMarker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(startLat, startLng),
      icon: "../img/start.png",
      iconSize: new Tmapv2.Size(64, 64),
      map: map,
    });

    const endMarker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(endLat, endLng),
      icon: "../img/end.png",
      iconSize: new Tmapv2.Size(64, 64),
      map: map,
    });

    resultMarkerArr.push(startMarker);
    resultMarkerArr.push(endMarker);
  }

  function drawLine(arrPoint, traffic) {
    const lineColor = "#FF0000"; // 빨간색으로 설정
    const filteredPoints = arrPoint.filter(
      (point) => point.lat() !== 0 && point.lng() !== 0
    ); // 0인 좌표 다시 한번 걸러내기
    if (filteredPoints.length > 1) {
      const polyline = new Tmapv2.Polyline({
        path: filteredPoints,
        strokeColor: lineColor,
        strokeWeight: 6,
        map: map,
      });
      resultdrawArr.push(polyline);
    }
  }

  function resettingMap() {
    // 기존 마커 삭제
    resultMarkerArr.forEach((marker) => marker.setMap(null));

    // 기존 draw 삭제
    resultdrawArr.forEach((draw) => draw.setMap(null));

    // 배열 초기화
    resultMarkerArr = [];
    resultdrawArr = [];
  }

  return (
    <div id="mapContainer" style={{ position: "relative", height: "100%" }}>
      <div id="TMapApp" style={{ width: "100%", height: "100%" }} />
      <div
        style={{
          position: "absolute",
          top: "5px",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "10px 0",
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              height: isMobile ? "30px" : "40px",
              fontSize: isMobile ? "16px" : "18px",
              flexGrow: 1,
              marginRight: "8px",
            }}
            placeholder="장소 검색"
          />
          <button
            onClick={handleSearch}
            style={{
              height: isMobile ? "30px" : "40px",
              fontSize: isMobile ? "16px" : "18px",
              padding: "0 12px",
            }}
          >
            검색
          </button>
        </div>
      </div>
      {showResults && (
        <div
          style={{
            position: "absolute",
            top: "50px",
            width: "100%",
            zIndex: 1000,
          }}
        >
          <SearchResults
            results={searchResults}
            onSelectLocation={handleLocationSelect}
          />
        </div>
      )}
      {/* 바깥쪽을 클릭했을 때의 이벤트 핸들러 */}
      {showResults && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 999,
          }}
          onClick={handleMapClick}
        />
      )}
      {selectedRoute && (
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            display: "flex",
          }}
        >
          <div
            style={{
              flexGrow: 2,
              backgroundColor: "#f8f9fa",
              padding: "10px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <div>예상 시간: {Math.round(selectedRoute.time)} 분</div>
            <div>
              도착 시간: {selectedRoute.arrivalTime.toLocaleTimeString()}
            </div>
            <div>거리: {selectedRoute.distance.toFixed(2)} km</div>
          </div>
          <div
            style={{
              flexGrow: 1,
              backgroundColor: "#dc3545",
              padding: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                color: "white",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                padding: "10px 20px",
                cursor: "pointer",
              }}
            >
              안내 시작
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Map;
