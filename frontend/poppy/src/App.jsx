import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import ModeSelectPage from './pages/ModeSelectPage';
import ManageCompensationPage from './pages/ManageCompensationPage';
import ManagePotholePage from './pages/ManagePotholePage';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mode" element={<ModeSelectPage/>} />
        <Route path="/manage-pothole" element={<ManagePotholePage/>} />
        <Route path="/manage-compensation" element={<ManageCompensationPage/>} />
   
      </Routes>
  </BrowserRouter>
  );
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
export default App;