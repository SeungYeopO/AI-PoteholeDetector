async function POISearch(searchKeyword, setSearchResults) {
  if (!searchKeyword) return;
  const headers = {
    appKey: "ew5nSZ1Mk66M0B2t7GmhDaLb5jks5Nv35LDBJ3A5",
  };

  try {
    const response = await fetch(
      `https://apis.openapi.sk.com/tmap/pois?version=1&format=json&searchKeyword=${encodeURIComponent(
        searchKeyword
      )}&resCoordType=EPSG3857&reqCoordType=WGS84GEO&count=20`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();
    setSearchResults(data.searchPoiInfo.pois.poi); // 결과를 상태에 저장
  } catch (error) {
    console.error("Error fetching POI data:", error);
  }
}

export default POISearch;
