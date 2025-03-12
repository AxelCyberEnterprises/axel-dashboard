import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/layouts/DashboardLayout";
import AdminSessionHistory from "./pages/Dashboard/Admin/AdminSessionHistory";
import AdminDashboardHome from "./pages/Dashboard/Admin/Index";
import UserAnalytics from "./pages/Dashboard/User/Analytics";
import UserDashboardHome from "./pages/Dashboard/User/Index";
import UserSettings from "./pages/Dashboard/User/Settings";
import UserSessionHistory from "./pages/Dashboard/User/UserSessionHistory";
import HomePage from "./pages/HomePage";
import "./styles/index.scss";
import Help from "./pages/Dashboard/User/help/help";
import SafetyPrivacy from "./pages/Dashboard/User/help/SafetyPrivacy";
import HelpPage from "./pages/Dashboard/User/help";
import ChatbotPage from "./pages/Dashboard/User/help/ChatbotPage";

function App() {
    return (
        <>
            <Router>
                <Routes>
                    {/* Main Layout Routes */}
                    <Route path="/" element={<HomePage />} />

                    {/* Dashboard Layout Routes */}
                    <Route path="/dashboard/user" element={<DashboardLayout />}>
                        <Route index element={<UserDashboardHome />} />
                        <Route path="session-history" element={<UserSessionHistory />} />
                        <Route path="analytics" element={<UserAnalytics />} />
                        <Route path="settings" element={<UserSettings />} />
                        <Route path="help" element={<HelpPage />}>
                            <Route index element={<Help />} />
                            <Route path="safety" element={<SafetyPrivacy />} />
                            <Route path="message" element={<ChatbotPage />} />
                        
                        </Route>
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
