import styled from "styled-components"
import ReactPlayer from 'react-player'

const Background = styled.div`
  width : 100vw;
  height : 100vh;
`
const Container = styled.div`
  width : 50%;
  height : 50%;
  background-color : lightgray;
`

const Video = () => {

  const videoURL = 'https://d1vcrv9kpqlkt7.cloudfront.net/BB47125156/0.0_0.0.mp4'

  return (
    <Background>
      비디오 띄우는 페이지 BB47125156
      <Container>
        <video style={{width : "45rem", height : "30rem"}} controls type= "video/webm;codecs=mp4v" src={videoURL}></video>
      </Container>
    </Background>

  );
};

export default Video;