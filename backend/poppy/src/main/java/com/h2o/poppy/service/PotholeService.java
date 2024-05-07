package com.h2o.poppy.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.h2o.poppy.entity.AccidentReport;
import com.h2o.poppy.entity.Pothole;
import com.h2o.poppy.model.pothole.PotholeDto;
import com.h2o.poppy.repository.PotholeRepository;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PotholeService {

    private final PotholeRepository potholeRepository;

    private PotholeDto convertToDto(Pothole pothole) {
        PotholeDto potholeDto = new PotholeDto();
        potholeDto.setPotholePk(pothole.getPotholePk());
        potholeDto.setLatitude(pothole.getLocation().getCoordinate().getX());
        potholeDto.setLongitude(pothole.getLocation().getCoordinate().getY());
        potholeDto.setIsPothole(pothole.getIsPothole());
        potholeDto.setProvince(pothole.getProvince());
        potholeDto.setCity(pothole.getCity());
        potholeDto.setStreet(pothole.getStreet());
        potholeDto.setDetectedAt(pothole.getDetectedAt());
        potholeDto.setState(pothole.getState());
        potholeDto.setStartAt(pothole.getStartAt());
        potholeDto.setExpectAt(pothole.getExpectAt());
        potholeDto.setEndAt(pothole.getEndAt());
        return potholeDto;
    }

    @Autowired
    public PotholeService(PotholeRepository potholeRepository) {
        this.potholeRepository = potholeRepository;
    }

    //위도 경도로 도로 찾기
    public String callTmapApi(String lat, String lon) {
        try{
            String url = "https://apis.openapi.sk.com/tmap/road/nearToRoad";

            // 쿼리 매개변수 설정
            UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url)
                    .queryParam("version", "1")
                    .queryParam("lat", lat)
                    .queryParam("lon", lon)
                    .queryParam("opt", "0")
                    .queryParam("vehicleWidth", 250)
                    .queryParam("vehicleHeight", 340)
                    .queryParam("vehicleWeight", 35500)
                    .queryParam("vehicleTotalWeight", 26000)
                    .queryParam("vehicleLength", 880)
                    .queryParam("vehicleType", 0)
                    .queryParam("radius", 100);

            HttpHeaders headers = new HttpHeaders();
            headers.set("accept", "application/json");
            headers.set("appKey", "e8wHh2tya84M88aReEpXCa5XTQf3xgo01aZG39k5");
            HttpEntity<?> entity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(builder.toUriString(), HttpMethod.GET, entity, String.class);
            String responseBody = response.getBody();

            // "roadName" 필드만 추출
            String roadName = extractRoadName(responseBody,lat,lon);
            return roadName;
        }catch (Exception e){
            return null;
        }

    }


    //위 반환도로이름 파싱해서 도로이름만 추출하기
    private String extractRoadName(String jsonString, String lat, String lon) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(jsonString);

            JsonNode resultData = jsonNode.get("resultData");
            JsonNode header = resultData.get("header");
            String roadName = header.get("roadName").asText();
            String extraName = findFullRoadName(roadName, lat, lon);
            return extraName;
        } catch (Exception e) {
            return null;
        }
    }


    //전체 주소 찾기
    public String findFullRoadName(String args, String lat, String lon) {
        try{
            String url = "https://apis.openapi.sk.com/tmap/pois?version=1&searchKeyword=" + args + "&searchType=all&searchtypCd=R&centerLon=" + lon + "&centerLat=" + lat + "&reqCoordType=WGS84GEO&resCoordType=WGS84GEO&radius=1&page=1&count=20&multiPoint=N&poiGroupYn=N";

            HttpHeaders headers = new HttpHeaders();
            headers.set("Accept", "application/json");
            headers.set("appKey", "e8wHh2tya84M88aReEpXCa5XTQf3xgo01aZG39k5");
            HttpEntity<?> entity = new HttpEntity<>(headers);

            RestTemplate restTemplate = new RestTemplate();
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);

            HttpStatusCode statusCode = response.getStatusCode();
            HttpHeaders responseHeaders = response.getHeaders();
            String responseBody = response.getBody();

            String fullName = extractJson(responseBody, args, lat, lon);

            return fullName;
        }catch (Exception e){
            return null;
        }


    }

    private String extractJson(String jsonString, String lowerAddrName, String lat, String lon) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode jsonNode = objectMapper.readTree(jsonString);

            JsonNode resultData = jsonNode.get("searchPoiInfo");
            JsonNode pois = resultData.get("pois");
            JsonNode poi = pois.get("poi");
            JsonNode poiList = poi.get(0);
            String upperAddrName = poiList.get("upperAddrName").asText();
            String middleAddrName = poiList.get("middleAddrName").asText();


            String potholePk = saveData(upperAddrName, middleAddrName, lowerAddrName, lat, lon);
            return potholePk;
        } catch (Exception e) {
            return null;
        }
    }


    // 포트홀 등록
    public String saveData(String upperAddrName, String middleAddrName, String lowerAddrName, String lat, String lon ) {
        try{
            // GeometryFactory를 사용하여 Point 생성
            GeometryFactory geometryFactory = new GeometryFactory();
            Point point = geometryFactory.createPoint(new Coordinate(Double.parseDouble(lon), Double.parseDouble(lat))); // x와 y는 좌표값

            Pothole pothole = new Pothole();
            pothole.setLocation(point);
            pothole.setIsPothole(true);
            pothole.setProvince(upperAddrName);
            pothole.setCity(middleAddrName);
            pothole.setStreet(lowerAddrName);
            pothole.setDetectedAt(new Date());
            pothole.setState("미확인");
            potholeRepository.save(pothole);
            long nowPk = pothole.getPotholePk();

            if(nowPk!=0)return String.valueOf(nowPk);
            else return null;
        }
        catch (Exception e){
            return null;
        }
    }


    // 이미있는 포트홀 검사
    public boolean checkGPSdata(double lat, double lon){

        List<Pothole> potholes = potholeRepository.findNearbyPotholes(lat,lon);
        //System.out.println(potholes.get(0).getPotholePk());
        if(potholes.isEmpty())return true;
        else return false;
    }


    // 전체 get
    public List<PotholeDto> getAllPothole() {
        try {
            List<Pothole> getPothole = potholeRepository.findAll();
            return getPothole.stream()
                    .map(this::convertToDto)
                    .collect(Collectors.toList());
        }catch (Exception e){
            return null;
        }
    }

    // 선택사항 필터후 반환
    public List<PotholeDto> chooseGet(PotholeDto data){
        String nowState = data.getState();
        String nowProvince = data.getProvince();
        String nowCity = data.getCity();
        Date nowDate = data.getDetectedAt();

        List<PotholeDto> pothole = potholeRepository.getPotholeByFilter(nowState,nowProvince,nowCity,nowDate);
        return pothole;
    }

    // 1인 get
    public PotholeDto getIdPothole(Long potholePk) {
        try{
            PotholeDto potholeDto = potholeRepository.getPotholeByPotholeId(potholePk);
            return potholeDto;
        }catch (Exception e){
            return null;
        }

    }

    //공사상태 get(공사대기)
    public List<PotholeDto> getState1Pothole(String nowState){
        try{
            List<PotholeDto> statePotholes = potholeRepository.getPotholeByNowState(nowState);
            System.out.println(statePotholes);
            return statePotholes;
        }catch (Exception e){
            return null;
        }
    }


    public String changeState(PotholeDto data){
        long potholePk = data.getPotholePk();
        String nowState = data.getState();
        if(nowState==null)return null;
        if(!nowState.equals("미확인") && !nowState.equals("공사중") && !nowState.equals("공사완료"))return null;
        String changeState =null;
        try{
            // 공사시작 버튼 누른경우
            if(nowState.equals("공사중")){
                potholeRepository.updateIngState(potholePk,"공사중",new Date());
                changeState = "공사중";
            // 공사완료 버튼 누른경우
            }else if(nowState.equals("공사완료")){
                potholeRepository.updateFnishState(potholePk,"공사완료",new Date());
                changeState = "공사완료";
            }
            return changeState;
        }catch (Exception e){
            return null;
        }
    }


    // 삭제
    public boolean rejectData(Long potholePk) {
        try {
            potholeRepository.updateIsPothole(potholePk);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
