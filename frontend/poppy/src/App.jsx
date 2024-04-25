import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from './pages/LoginPage';
import ModeSelectPage from './pages/ModeSelectPage';
import ManageCompensationPage from './pages/ManageCompensationPage';
import ManageReportPage from './pages/ManageReportPage';
import ManageProcessPage from './pages/ManageProcessPage';
import ManageDonePage from './pages/ManageDonePage';



const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/mode" element={<ModeSelectPage/>} />
        <Route path="/manage-report" element={< ManageReportPage/>} />
        <Route path="/manage-compensation" element={<ManageCompensationPage/>} />
        <Route path="/manage-process" element={<ManageProcessPage/>} />
        <Route path="/manage-done" element={<ManageDonePage/>} />
      </Routes>
  </BrowserRouter>
  );
};
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
export default App;