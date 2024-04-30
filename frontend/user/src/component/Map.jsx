import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import POISearch from "./POISearch";
import SearchResults from "./SearchResults";
import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import LocationModal from "./LocationModal.jsx";
import axios from "axios";

let resultMarkerArr = [];
let resultdrawArr = [];

let startX = 126.98702028;
let startY = 37.5652045;

let map;

function Map() {
  const isMobile = useMediaQuery({ maxWidth: 600 });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [destinationSelected, setDestinationSelected] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");
  const [locationName, setLocationName] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedLat, setSeletedLat] = useState(false);
  const [selectedLng, setSeletedLng] = useState(false);
  const mapRef = useRef(null); // 맵 객체를 참조하기 위한 ref
  const userMarkerRef = useRef(null); // 마커 객체를 참조하기 위한 ref// 마커 객체를 참조하기 위한 ref
  const [mapZoom, setMapZoom] = useState(16);
  const mapContainerId = "TMapApp";
  const location = useLocation();
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    let watchId; // watchPosition의 ID를 저장할 변수
    const initializeMap = (latitude, longitude) => {
      const container = document.getElementById(mapContainerId);
      if (!container) {
        console.error("Map container not found");
        return;
      }

      // 기존 맵 인스턴스가 있고, 정상적으로 파괴 가능한지 확인
      if (mapRef.current) {
        try {
          mapRef.current.destroy();
        } catch (error) {
          console.error("Failed to destroy old map instance:", error);
        }
        mapRef.current = null; // 참조 초기화
      }
      // 맵 새로 생성
      mapRef.current = new Tmapv2.Map(mapContainerId, {
        center: new Tmapv2.LatLng(latitude, longitude),
        width: "100%",
        height: "100%",
        zoom: mapZoom,
      });

      mapRef.current.addListener("click", async (evt) => {
        const latLng = evt.latLng;
        const lat = latLng.lat();
        const lng = latLng.lng();

        // 여기에서 검색 함수를 호출하고 결과를 모달로 표시
        await reverseGeocode(lat, lng);
      });

      // 처음 마커 생성
      userMarkerRef.current = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(latitude, longitude),
        icon: "../img/icon2.png",
        iconSize: new Tmapv2.Size(32, 32),
        map: mapRef.current,
      });
    };

    const loadScriptAndInitializeMap = () => {
      if (!window.Tmapv2) {
        const script = document.createElement("script");
        script.src = "https://apiurl/to/tmapv2";
        script.onload = () => {
          getCurrentLocation(); // 스크립트 로드 후 현재 위치 가져오기
        };
        document.head.appendChild(script);
      } else {
        getCurrentLocation(); // 스크립트가 이미 로드된 경우 현재 위치 가져오기
      }
    };

    const reverseGeocode = async (lat, lon) => {
      const appKey = "ew5nSZ1Mk66M0B2t7GmhDaLb5jks5Nv35LDBJ3A5"; // Replace with your actual appKey
      const url = `https://apis.openapi.sk.com/tmap/geo/reversegeocoding?version=1&lat=${lat}&lon=${lon}&coordType=WGS84GEO&addressType=A04&newAddressExtend=Y`;
      let target;
      try {
        const response = await axios.get(url, {
          headers: {
            accept: "application/json",
            appKey: appKey,
          },
        });

        target = response.data.addressInfo.fullAddress;

        try {
          const response2 = await axios.get(
            `https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=${encodeURIComponent(
              target
            )}&searchType=all&searchtypCd=A&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&page=1&count=20&multiPoint=N&poiGroupYn=N`,
            {
              headers: {
                accept: "application/json",
                appKey: appKey,
              },
            }
          );

          setShowModal(true);
          setLocationName(response2.data.searchPoiInfo.pois.poi[0].name);
          setSeletedLat(response2.data.searchPoiInfo.pois.poi[0].frontLat);
          setSeletedLng(response2.data.searchPoiInfo.pois.poi[0].frontLon);
        } catch (error) {}
      } catch (error) {
        console.error("Reverse Geocoding failed:", error);
      }
    };

    const closeModal = () => {
      setModalOpen(false); // 모달 닫기
    };

    const getCurrentLocation = () => {
      const options = {
        timeout: 10000, // 10 seconds
        maximumAge: 60000, // 1 minute
      };

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          initializeMap(latitude, longitude); // 현재 위치를 기반으로 맵 초기화
          watchUserPosition(); // 위치 감시 시작
        },
        (error) => {
          console.error("Error getting initial geolocation:", error);
          initializeMap(startY, startX); // 오류 시 기본 위치 사용
        },
        options
      );
    };

    const watchUserPosition = () => {
      watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          startY = latitude;
          startX = longitude;

          updateMarkerPosition(latitude, longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    };

    const updateMarkerPosition = (latitude, longitude) => {
      // 기존 마커가 있다면 제거
      if (userMarkerRef.current) {
        userMarkerRef.current.setMap(null);
      }

      // 새로운 마커 생성
      userMarkerRef.current = new Tmapv2.Marker({
        position: new Tmapv2.LatLng(latitude, longitude),
        icon: "../img/icon2.png",
        iconSize: new Tmapv2.Size(32, 32),
        map: mapRef.current,
      });
    };

    loadScriptAndInitializeMap();

    // 컴포넌트 언마운트 시 맵 인스턴스 정리 및 위치 감시 중지
    return () => {
      if (window.Tmapv2 && mapRef.current) {
        mapRef.current.destroy();
        mapRef.current = null;
      }
    };
  }, [location.key]); // location.key 변경에 의존

  const handleMapClick = () => {
    // SearchResults 컴포넌트가 열려있으면 닫음
    if (showResults) {
      setShowResults(false);
    }
  };

  const handleSearch = async () => {
    if (searchQuery) {
      await POISearch(searchQuery, setSearchResults, startX, startY);
      setShowResults(true);
      setSearchQuery("");
      setSearchPerformed(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const centerMapOnUser = () => {
    const initialPosition = new Tmapv2.LatLng(startY, startX);
    mapRef.current.setCenter(initialPosition);
  };

  const handleBack = () => {
    resettingMap(); // 모든 마커와 경로 초기화
    setShowResults(false); // 검색 결과 숨김
    setSelectedRoute(null); // 선택된 경로 정보 초기화
    centerMapOnUser(); // 사용자 위치로 맵 중심 이동
    setSearchPerformed(false);
    mapRef.current.setZoom(16);
  };

  const handleLocationSelect = (lat, lng, convertRequired) => {
    console.log(lat, lng);
    let endX, endY;
    if (!convertRequired) {
      const epsg3857 = new Tmapv2.Point(lng, lat);
      const wgs84 = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(epsg3857);
      endX = wgs84._lng; // 도착점 경도
      endY = wgs84._lat; // 도착점 위도
    } else {
      endX = lng; // 도착점 경도
      endY = lat; // 도착점 위도
    }

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

    async function marker() {
      try {
        const response = await axios.get("../../data/pothole.json");

        response.data.forEach((element) => {
          const latitude = element.latitude;
          const longitude = element.longitude;
          new Tmapv2.Marker({
            position: new Tmapv2.LatLng(latitude, longitude),
            icon: "../img/free-icon-pothole-10392295.png",
            iconSize: new Tmapv2.Size(24, 24),
            map: map,
          });
        });
      } catch (error) {}
    }

    marker();
    setShowResults(false);
    setDestinationSelected(true);
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
    else if (distance < 0.1) return 12.8; // 10km 미만
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
    mapRef.current.setCenter(new Tmapv2.LatLng(midLat, midLng));
    mapRef.current.setZoom(zoomLevel);

    const startMarker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(startLat, startLng),
      icon: "../img/start.png",
      iconSize: new Tmapv2.Size(64, 64),
      map: mapRef.current,
    });

    const endMarker = new Tmapv2.Marker({
      position: new Tmapv2.LatLng(endLat, endLng),
      icon: "../img/end.png",
      iconSize: new Tmapv2.Size(64, 64),
      map: mapRef.current,
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
        map: mapRef.current,
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
      <div>
        {locationName && (
          <LocationModal
            locationName={locationName}
            latitude={selectedLat} // 예: 선택된 위치의 위도
            longitude={selectedLng}
            show={showModal}
            onClose={handleCloseModal}
            onStartRoute={handleLocationSelect}
          />
        )}
      </div>
      <button
        onClick={centerMapOnUser}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "10px",
          zIndex: 1000,
        }}
      >
        <img src="/img/center.png" style={{ width: "50px", height: "50px" }} />
      </button>
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
          {searchPerformed && (
            <button onClick={handleBack} style={{ marginLeft: "0px" }}>
              뒤로 가기
            </button>
          )}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              height: "40px",
              fontSize: "18px",
              flexGrow: 1,
              marginRight: "0px",
            }}
            placeholder="장소 검색"
          />
          <button
            onClick={handleSearch}
            style={{ height: "45px", fontSize: "18px", padding: "0 12px" }}
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
              zIndex: 1001,
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
              padding: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              style={{
                color: "black",
                fontSize: "16px",
                fontWeight: "bold",
                border: "none",
                padding: "20px 30px",
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
