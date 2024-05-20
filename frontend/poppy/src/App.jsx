import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import ModeSelectPage from './pages/ModeSelectPage';
import ManageReportPage from './pages/ManageReportPage';
import ManageProcessPage from './pages/ManageProcessPage';
import ManageDonePage from './pages/ManageDonePage';
import CompensationReportPage from './pages/CompensationReportPage';
import CompensationDonePage from './pages/CompensationDonePage';
import { Navigate } from 'react-router-dom';
import Video from './pages/Video';
import ManageComplaintPage from './pages/ManageComplaintPage';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Navigate to="/manager/login" />} />
        <Route path="/manager/login" element={<LoginPage />} />
        <Route path="/manager/mode" element={<ModeSelectPage/>} />
        <Route path="/manager/report" element={< ManageReportPage/>} />
        <Route path="/manager/process" element={<ManageProcessPage/>} />
        <Route path="/manager/done" element={<ManageDonePage/>} />
        <Route path="/manager/compensation-report" element={<CompensationReportPage/>} />
        <Route path="/manager/compensation-done" element={<CompensationDonePage/>} />
        <Route path="/manager/complaint" element={<ManageComplaintPage/>} />
        <Route path="/manager/video" element={<Video/>}/>
      </Routes>
  </BrowserRouter>
  );
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
export default App;