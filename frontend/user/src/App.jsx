
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./component/AuthContext";

import Map from './component/Map.jsx'
import Report from "./component/Report.jsx";
import Login from "./component/Login.jsx";
import SignUp from "./component/SignUp.jsx";
import Navbar from "./component/Navbar.jsx";
import ReportList from "./component/ReportList.jsx";
import MainScreen from "./component/MainScreen.jsx";
import Blackbox from "./component/Blackbox.jsx";
import "./App.css";
import { useAuth } from "./component/AuthContext";


function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
        <Routes>
            <Route path="/" element={<MainScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} /> 
            <Route path="/map" element={<Map/>} />  
            <Route path="/report" element={<Report />} /> 
            <Route path="/reports" element={<ReportList />}/>
            <Route path="/blackbox" element={<Blackbox/>}/>
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}


export default App;
