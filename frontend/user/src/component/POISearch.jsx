async function POISearch(
  searchKeyword,
  setSearchResults,
  centerLon,
  centerLat
) {
  if (!searchKeyword) return;
  const headers = {
    appKey: "ew5nSZ1Mk66M0B2t7GmhDaLb5jks5Nv35LDBJ3A5",
  };

  console.log(centerLon);
  console.log(centerLat);

  try {
    const response = await fetch(
      `https://apis.openapi.sk.com/tmap/pois?version=1&format=json&searchKeyword=${encodeURIComponent(
        searchKeyword
      )}&centerLon=${centerLon}&centerLat=${centerLat}&resCoordType=EPSG3857&reqCoordType=WGS84GEO&count=20`,
      {
        method: "GET",
        headers: headers,
      }
    );
    const data = await response.json();
    console.log(data);
    setSearchResults(data.searchPoiInfo.pois.poi); // 결과를 상태에 저장
  } catch (error) {
    console.error("Error fetching POI data:", error);
  }
}

export default POISearch;
