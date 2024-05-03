import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import ModeSelectPage from './pages/ModeSelectPage';
import ManageReportPage from './pages/ManageReportPage';
import ManageProcessPage from './pages/ManageProcessPage';
import ManageDonePage from './pages/ManageDonePage';
import CompensationReportPage from './pages/CompensationReportPage';
import CompensationDonePage from './pages/CompensationDonePage';




const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mode" element={<ModeSelectPage/>} />
        <Route path="/manage-report" element={< ManageReportPage/>} />
        <Route path="/manage-process" element={<ManageProcessPage/>} />
        <Route path="/manage-done" element={<ManageDonePage/>} />
        <Route path="/compensation-report" element={<CompensationReportPage/>} />
        <Route path="/compensation-done" element={<CompensationDonePage/>} />
      </Routes>
  </BrowserRouter>
  );
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
export default App;