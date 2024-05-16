import React from "react";

function SearchResults({ results, onSelectLocation }) {
  if (!results.length) return null;
  console.log(results);
  return (
    <div
      style={{
        position: "absolute",
        top: "5px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "90%", // 모달의 너비
        maxWidth: "600px", // 최대 너비 설정
        backgroundColor: "#fff", // 배경색
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // 그림자 효과
        borderRadius: "8px", // 테두리 둥글게
        padding: "20px", // 내부 패딩
        zIndex: 1001,
        overflowY: "auto", // 내용이 많을 경우 스크롤
        maxHeight: "40vh", // 최대 높이 설정
      }}
    >
      <ul style={{ margin: 0, padding: 0, listStyleType: "none" }}>
        {results.map((result, index) => {
          return (
            <li
              key={index}
              onClick={() =>
                onSelectLocation(
                  result.frontLat,
                  result.frontLon,
                  result.name,
                  false
                )
              }
              style={{
                padding: "10px",
                borderBottom: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              {result.name} ({result.detailBizName})
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default SearchResults;
