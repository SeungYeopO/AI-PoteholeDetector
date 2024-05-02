// VideoPlayer.js
import React from "react";
import ReactPlayer from "react-player";

function Report() {
  return (
    <div className="player-wrapper">
      <ReactPlayer
        url="https://d1vcrv9kpqlkt7.cloudfront.net/20240426_094452/index.m3u8"
        playing
        controls
        width="100%"
        height="100%"
      />
    </div>
  );
}

export default Report;
