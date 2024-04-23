import { useEffect } from 'react';
import proj4 from 'proj4';


const ManagePotholePage = () => {
  useEffect(() => {
    proj4.defs([
      [
        'EPSG:3857',
        '+title=WGS 84 / Pseudo-Mercator (Google Maps) +proj=merc +a=6378137 +b=6378137 ' +
        '+lat_ts=0.0 +lon_0=0.0 +x_0=0.0 +y_0=0 +k=1.0 +units=m +nadgrids=@null ' +
        '+wktext +no_defs'
      ],
      [
        'EPSG:4326',
        '+title=WGS 84 (long/lat) +proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs'
      ]
    ]);
    
    // EPSG3857 좌표
    const EPSG3857Coords = [14129167.45699935, 4516409.79215787];
    
    // EPSG3857를 WGS84로 변환
    const WGS84Coords = proj4('EPSG:3857', 'EPSG:4326', EPSG3857Coords);
    
    console.log(WGS84Coords); // [경도, 위도]
  }, []); // 빈 배열을 전달하여 이 효과를 한 번만 실행되도록 설정

  return (
    <div>
      포트홀관리페이지
    </div>
  );
};

export default ManagePotholePage;
