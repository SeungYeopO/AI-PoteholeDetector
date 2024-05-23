import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAMtkSJ8pYDlYxWFD3ELrqn1y-GDdcdTRU",
  authDomain: "poppy-14903.firebaseapp.com",
  projectId: "poppy-14903",
  storageBucket: "poppy-14903.appspot.com",
  messagingSenderId: "1090836559261",
  appId: "1:1090836559261:web:3fca7b53c79be973c6ab74",
  measurementId: "G-H14K671R1N",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

async function requestPermission() {
  console.log("권한 요청 중...");

  const permission = await Notification.requestPermission();
  if (permission === "denied") {
    console.log("알림 권한 허용 안됨");
    return;
  }

  console.log("알림 권한이 허용됨");

  const token = await getToken(messaging, {
    vapidKey:
      "BDMr5T0aLa1oJcm1Ya4613JmFEnXMOZBteWNaxZF3IrBWnru6764xguSgRjWRpaoQZPxzVKJNRfa2__V6h1iKzs",
  });

  if (token) console.log("token: ", token);
  else console.log("Can not get Token");

  onMessage(messaging, (payload) => {
    console.log("메시지가 도착했습니다.", payload);
    // ...
  });
}

requestPermission();
