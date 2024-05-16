import React, { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "react-responsive";
import POISearch from "./POISearch";
import SearchResults from "./SearchResults";
import { useAuth } from "./AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import LocationModal from "./LocationModal.jsx";
import axios from "axios";
import Navbar from "./Navbar.jsx";

let resultMarkerArr = [];
let resultdrawArr = [];
let routeData = [];
let potholeMarkers = [];
let routeMarkers = [];
let startX = 126.98702028;
let startY = 37.5652045;
let timeoutId;
let map;
let potholeAlert = [];
let endX, endY;
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
  const [userPosition, setUserPosition] = useState({ lat: 0, lon: 0 });
  const [potholeAlerts, setPotholeAlerts] = useState([]);
  const [showAlertOverlay, setShowAlertOverlay] = useState(false);
  const [onRoute, setOnRoute] = useState(false);
  const blinkIntervalIdRef = useRef(null);
  const mapRef = useRef(null); // 맵 객체를 참조하기 위한 ref
  const userMarkerRef = useRef(null); // 마커 객체를 참조하기 위한 ref// 마커 객체를 참조하기 위한 ref
  const [mapZoom, setMapZoom] = useState(16);
  const mapContainerId = "TMapApp";
  const location = useLocation();
  const { user } = useAuth();
  const onRouteRef = useRef(onRoute);
  const [tmapAppStarted, setTmapAppStarted] = useState(false); // 티맵 앱 시작 상태

  if (!user) {
    return <Navigate to="/login" />;
  }

  // Notification API를 사용하기 위한 권한 요청 함수
  function requestNotificationPermission() {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification");
    } else {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Notification permission granted.");
          // 권한이 승인되었을 때 추가적인 초기화나 설정을 할 수 있습니다.
        } else if (permission === "denied") {
          console.log("Notification permission was denied.");
          // 권한이 거부되었을 때 사용자에게 알림 기능이 제한될 것임을 알릴 수 있습니다.
        } else {
          console.log("Notification permission is set to default (ask again).");
          // 사용자가 아직 결정을 내리지 않았을 때, 다음 요청 때 다시 권한을 요청할 수 있습니다.
        }
      });
    }
  }

  useEffect(() => {
    onRouteRef.current = onRoute; // onRoute 값이 변경될 때마다 ref 업데이트
  }, [onRoute]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  // 현재 위치와 주어진 포인트 간의 거리 계산 함수 (단위: km)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // 지구 반지름(km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const getSearchDistanceByZoomLevel = (zoomLevel) => {
    if (zoomLevel >= 17) return 0.2; // zoomLevel이 10보다 작을 때 5km
    else if (zoomLevel >= 16) return 0.7; // zoomLevel이 15보다 작을 때 2km
    else if (zoomLevel >= 15) return 1.2;
    else if (zoomLevel >= 14) return 2.0;
    else if (zoomLevel >= 13) return 3.5;
    else if (zoomLevel >= 12) return 7.0;
    else if (zoomLevel >= 11) return 13.5;
    else if (zoomLevel >= 10) return 27.5;
    else if (zoomLevel >= 9) return 50;
    else if (zoomLevel >= 8) return 100;
    else return 400;
  };

  // 포트홀 데이터를 로드하고, 필터링하여 마커를 생성하는 함수
  const loadAndMarkPotholes = async (latitude, longitude) => {
    if (!onRouteRef.current) {
      try {
        // 기존 마커 제거
        potholeMarkers.forEach((marker) => marker.setMap(null));
        potholeMarkers = []; // 마커 배열 초기화

        const zoomLevel = mapRef.current.getZoom();
        const searchDistance = getSearchDistanceByZoomLevel(zoomLevel);

        const data = {
          latitude: latitude,
          longitude: longitude,
          size: searchDistance,
        };

        const response = await axios.post(
          "/api/potholes/search-boundary",
          data
        );

        const potholes = response.data.result;
        // 필터링된 포트홀에 대해 마커 생성

        potholes.forEach((pothole) => {
          const marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(pothole.longitude, pothole.latitude),
            icon: "../img/free-icon-pothole-10392295.png", // 포트홀 아이콘 이미지 경로
            iconSize: new Tmapv2.Size(24, 24),
            map: mapRef.current,
          });
          potholeMarkers.push(marker); // 새 마커를 배열에 추가
        });
      } catch (error) {
        console.error("Error loading pothole data:", error);
      }
    }
  };

  useEffect(() => {
    console.log(potholeAlerts);
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition({ lat: latitude, lon: longitude });
        checkPotholeProximity(latitude, longitude);
      },
      (error) => console.error(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [potholeAlerts]);

  const checkPotholeProximity = (latitude, longitude) => {
    if (potholeAlerts.length > 0) {
      const firstAlert = potholeAlerts[0];
      const distance = calculateDistance(
        latitude,
        longitude,
        routeData[firstAlert].latitude,
        routeData[firstAlert].longitude
      );
      console.log(distance);
      if (distance < 0.05) {
        // 50m 이내로 설정
        alertUser();
      } else if (firstAlert + 30 < routeData.length) {
        // 다음 지점을 지났는지 확인
        const nextDistance = calculateDistance(
          latitude,
          longitude,
          routeData[firstAlert + 30].latitude,
          routeData[firstAlert + 30].longitude
        );
        console.log("nextDistance = ", nextDistance);
        if (nextDistance < 0.05) {
          stopBlinking();
          removeFirstAlert();
        }
      }
    }
  };

  const alertUser = () => {
    clearInterval(blinkIntervalIdRef.current); // 기존 인터벌이 있다면 먼저 제거
    blinkIntervalIdRef.current = setInterval(() => {
      setShowAlertOverlay((prev) => !prev); // 깜빡임 효과
    }, 300); // 0.3초마다 실행
  };

  const stopBlinking = () => {
    if (blinkIntervalIdRef.current) {
      clearInterval(blinkIntervalIdRef.current); // 인터벌 중지
      setShowAlertOverlay(false); // 오버레이 숨기기
      blinkIntervalIdRef.current = null; // 인터벌 ID 초기화
    }
  };

  const removeFirstAlert = () => {
    setPotholeAlerts((prevAlerts) => prevAlerts.slice(1)); // 첫 번째 요소 제거
  };

  useEffect(() => {
    let watchId; // watchPosition의 ID를 저장할 변수
    let lastCenter;
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

      mapRef.current.setOptions({ zoomControl: false });
      lastCenter = mapRef.current.getCenter(); // 초기 중심 저장
      let touchStartTime = 0; // 터치 시작 시간을 기록할 변수

      mapRef.current.addListener("touchstart", (evt) => {
        touchStartTime = Date.now(); // 터치가 시작되면 현재 시간을 기록
      });

      mapRef.current.addListener("touchend", async (evt) => {
        const touchEndTime = Date.now(); // 터치가 끝날 때의 시간
        const touchDuration = touchEndTime - touchStartTime; // 터치 지속 시간 계산

        if (touchDuration < 100) {
          // 지속 시간이 200밀리초 이내면 짧은 터치로 간주
          const latLng = evt.latLng;
          const lat = latLng.lat();
          const lng = latLng.lng();

          await reverseGeocode(lat, lng);
        }
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
          const center = mapRef.current.getCenter();

          startY = latitude;
          startX = longitude;

          updateMarkerPosition(latitude, longitude);
          checkLocationAndNotify(latitude, longitude);
        },
        (error) => {
          console.error("Error getting geolocation:", error);
        }
      );
    };

    function sendNotification(message) {
      if (Notification.permission === "granted") {
        new Notification(message);
        const sound = new Audio("../../audio/1.mp3");
        sound
          .play()
          .catch((error) => console.log("Sound playback failed: " + error));
      }
    }

    const checkLocationAndNotify = (latitude, longitude) => {
      // 특정 지점의 좌표 예시
      const targetLatitude = 35.20614750665463; // 서울 시청 근처
      const targetLongitude = 126.811107240829;
      const threshold = 0.0001; // 약 1km 이내로 설정

      const distance = calculateDistance(
        latitude,
        longitude,
        targetLatitude,
        targetLongitude
      );

      if (distance < threshold) {
        sendNotification("You are now within 1 km of Seoul City Hall!");
      }
    };

    const checkCenterChange = async () => {
      const currentCenter = mapRef.current.getCenter();
      const distance = calculateDistance(
        lastCenter.lat(),
        lastCenter.lng(),
        currentCenter.lat(),
        currentCenter.lng()
      );

      if (distance > 0.1 && !onRoute) {
        await loadAndMarkPotholes(currentCenter.lat(), currentCenter.lng());
        lastCenter = currentCenter; // 최신 중심으로 업데이트
      }

      timeoutId = setTimeout(checkCenterChange, 1000);
    };

    // 3초마다 맵의 중심이 변경되었는지 확인
    timeoutId = setTimeout(checkCenterChange, 1000);

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
  }, []);

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
    setOnRoute(false);
    centerMapOnUser(); // 사용자 위치로 맵 중심 이동
    setSearchPerformed(false);
    setTmapAppStarted(false);
    mapRef.current.setZoom(16);
  };

  function interpolatePoints(pointA, pointB, numPoints, name) {
    let points = [];
    for (let i = 1; i < numPoints; i++) {
      let lat =
        pointA.latitude + (pointB.latitude - pointA.latitude) * (i / numPoints);
      let lon =
        pointA.longitude +
        (pointB.longitude - pointA.longitude) * (i / numPoints);
      points.push({ name, latitude: lat, longitude: lon });
    }
    return points;
  }

  const handleLocationSelect = async (lat, lng, convertRequired) => {
    resettingMap();

    if (!convertRequired) {
      const epsg3857 = new Tmapv2.Point(lng, lat);
      const wgs84 = Tmapv2.Projection.convertEPSG3857ToWGS84GEO(epsg3857);
      endX = wgs84._lng; // 도착점 경도
      endY = wgs84._lat; // 도착점 위도
    } else {
      endX = parseFloat(lng); // 도착점 경도
      endY = parseFloat(lat); // 도착점 위도
    }

    setSearchPerformed(true);
    setOnRoute(true);
    onRouteRef.current = onRoute;

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

    const midPoint = updateMapCenterAndZoom(startY, startX, endY, endX);
    await fetch(
      "https://apis.openapi.sk.com/tmap/routes?version=1&callback=function",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        // 전체 응답 데이터를 콘솔에 출력
        const resultData = response.features;
        console.log(resultData);

        let lastCoord = null; // 이전 좌표를 저장할 변수
        const maxDistance = 0.015; // 최대 거리(km), 이 거리를 초과하면 보간

        routeData = [];
        resultData.forEach((feature) => {
          feature.geometry.coordinates.forEach((coord, index) => {
            if (
              coord[0] !== undefined &&
              coord[1] !== undefined &&
              coord[0] !== 0 &&
              coord[1] !== 0
            ) {
              const currentCoord = {
                name: feature.properties.name,
                latitude: coord[1],
                longitude: coord[0],
              };

              if (lastCoord) {
                const dist = calculateDistance(
                  lastCoord.latitude,
                  lastCoord.longitude,
                  currentCoord.latitude,
                  currentCoord.longitude
                );
                if (dist > maxDistance) {
                  // 최대 거리를 초과할 경우 중간 지점 보간
                  const interpolatedPoints = interpolatePoints(
                    lastCoord,
                    currentCoord,
                    Math.ceil(dist / maxDistance),
                    feature.properties.name
                  );
                  routeData.push(...interpolatedPoints);
                }
              }
              routeData.push(currentCoord);
              lastCoord = currentCoord; // 최신 좌표 업데이트
            }
          });
        });
        console.log(routeData);

        const pathPoints = resultData
          .map((feature) => {
            return feature.geometry.coordinates.map((coord) => {
              return new Tmapv2.LatLng(coord[1], coord[0]); // 좌표를 Tmapv2.LatLng 객체로 직접 변환
            });
          })
          .flat()
          .filter((point) => point.lat() !== 0 && point.lng() !== 0);
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
        routeMarkers.forEach((marker) => marker.setMap(null));
        routeMarkers = [];
        const response = await axios.post(
          "/api/potholes/trace-search",
          routeData
        );

        response.data.potholeList.map((element) => {
          const latitude = element.latitude;
          const longitude = element.longitude;
          const index = element.index;
          setPotholeAlerts((prevAlerts) => [...prevAlerts, index - 30]);
          const marker = new Tmapv2.Marker({
            position: new Tmapv2.LatLng(longitude, latitude),
            icon: "../img/free-icon-pothole-10392295.png",
            iconSize: new Tmapv2.Size(24, 24),
            map: mapRef.current,
          });
          routeMarkers.push(marker);
        });
      } catch (error) {}
    }

    marker();
    setShowResults(false);
    setDestinationSelected(true);
  };

  const onTmapApp = async () => {
    setTmapAppStarted(true); // 티맵 앱이 시작됨을 나타냄
    console.log(endX, endY);
    const appKey = "ew5nSZ1Mk66M0B2t7GmhDaLb5jks5Nv35LDBJ3A5";
    const name = "그랜드유치원";
    const encodedName = encodeURIComponent(name);
    const url = `https://apis.openapi.sk.com/tmap/app/routes?appKey=${appKey}&name=${encodedName}&lon=${endX}&lat=${endY}`;

    // URL 방문
    // window.location.href = url;
    window.open(url, "_blank");
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
    resultMarkerArr.forEach((marker) => {
      marker.setMap(null);
    });

    resultdrawArr.forEach((draw) => {
      draw.setMap(null);
    });

    potholeMarkers.forEach((marker) => {
      marker.setMap(null);
    });

    routeMarkers.forEach((marker) => {
      marker.setMap(null);
    });
    setPotholeAlerts([]);
    setShowAlertOverlay(false); // 오버레이 숨기기

    // 배열 초기화
    resultMarkerArr = [];
    resultdrawArr = [];
    potholeMarkers = [];
    routeMarkers = [];
  }

  return (
    <div
      id="mapContainer"
      style={{
        position: "fixed",
        height: "100vh",
        width: "100vw",
        left: "0",
        top: "0",
      }}
    >
      {showAlertOverlay && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "red",
            opacity: 0.5, // 투명도 설정을 통해 화면을 빨간색으로 표시하되, 내용은 보이도록 함
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "white",
            fontSize: "2em",
            zIndex: 2000, // 다른 요소보다 위에 오도록 z-index 설정
          }}
        >
          경고: 주의하세요!
        </div>
      )}
      <div id="TMapApp" style={{ width: "100%", height: "90%" }} />
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
      <div
        onClick={centerMapOnUser}
        style={{
          position: "fixed",
          width: "3rem",
          height: "3rem",
          left: "1rem",
          zIndex: 1000,
          bottom: "6rem",
          marginBottom: "0.5rem",
          // backgroundColor : 'red',
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src="/img/center.png"
          style={{
            width: "60px",
            height: "60px",
          }}
        />
      </div>
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
            onKeyDown={handleKeyDown}
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
      {selectedRoute && !tmapAppStarted && (
        <div
          style={{
            position: "fixed",
            bottom: "10%",
            left: "0",
            height: "11%",
            width: "100%",
            display: "flex",
            zIndex: "2000",
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
              onClick={onTmapApp}
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
      <Navbar />
    </div>
  );
}

export default Map;
