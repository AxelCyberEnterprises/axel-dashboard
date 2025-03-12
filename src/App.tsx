import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/layouts/DashboardLayout";
import AdminSessionHistory from "./pages/Dashboard/Admin/AdminSessionHistory";
import AdminDashboardHome from "./pages/Dashboard/Admin/Index";
import UserAnalytics from "./pages/Dashboard/User/Analytics";
import UserDashboardHome from "./pages/Dashboard/User/Index";
import PublicSpeaking from "./pages/Dashboard/User/PublicSpeaking";
import UserSettings from "./pages/Dashboard/User/Settings";
import UserSessionHistory from "./pages/Dashboard/User/UserSessionHistory";
import Features from "./pages/Features";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import "./styles/index.scss";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* Main Layout Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />

          {/* Dashboard Layout Routes */}
          <Route path="/dashboard/user" element={<DashboardLayout />}>
            <Route index element={<UserDashboardHome />} />
            <Route path="session-history" element={<UserSessionHistory />} />
            <Route path="public-speaking" element={<PublicSpeaking />} />
            <Route path="analytics" element={<UserAnalytics />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>

          <Route path="/dashboard/admin" element={<DashboardLayout />}>
            <Route index element={<AdminDashboardHome />} />
            <Route path="session-history" element={<AdminSessionHistory />} />
            <Route path="analytics" element={<UserAnalytics />} />
            <Route path="settings" element={<UserSettings />} />
          </Route>

          {/* 404 Page */}
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
