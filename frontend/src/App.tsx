/* eslint-disable @typescript-eslint/no-explicit-any */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./view/pages/HomePage";
import LoginPage from "./view/pages/LoginPage";
import ResidentPage from "./view/pages/ResidentPage";
import HousePage from "./view/pages/HousePage";
import PaymentPage from "./view/pages/PaymentPage";
import DetailPage from "./view/pages/DetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/resident" element={<ResidentPage />} />
        <Route path="/house" element={<HousePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/detail" element={<DetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
