
import spinner from '../assets/background/loading1.gif';


const Loading = () => {
  return (
    <div>
      <h3>잠시만 기다려 주세요</h3>
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default Loading;