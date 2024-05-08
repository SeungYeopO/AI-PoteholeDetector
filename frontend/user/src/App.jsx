
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "./component/AuthContext";
import Map from "./component/Map";
import Report from "./component/Report";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import Navbar from "./component/Navbar";
import ReportList from "./component/ReportList";
import MainScreen from "./component/MainScreen";
import Blackbox from "./component/Blackbox";
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
            <Route path="/map" element={<Map />} />  
            <Route path="/report" element={<Report />} /> 
            <Route path="/reports" element={<ReportList />}/>
            <Route path="/blackbox" element={<Blackbox/>}/>
          </Routes>
            <NavbarWithAuth />
        </div>
      </Router>
    </AuthProvider>
  );
}

function NavbarWithAuth() {
  const { user } = useAuth();
  if (!user) {
    return null;
  }

  return <Navbar />;
}

export default App;
