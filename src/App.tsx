import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/layouts/DashboardLayout";
import SessionsLayout from "./components/layouts/SessionsLayout";
import AdminSessionHistory from "./pages/Dashboard/Admin/AdminSessionHistory";
import AdminDashboardHome from "./pages/Dashboard/Admin/Index";
import UserAnalytics from "./pages/Dashboard/User/Analytics";
import UserDashboardHome from "./pages/Dashboard/User/Index";
import UserSettings from "./pages/Dashboard/User/Settings";
import UserSessionHistory from "./pages/Dashboard/User/UserSessionHistory";
import PitchPracticeSession from "./pages/Sessions/PitchPractice";
import HomePage from "./pages/HomePage";
import "./styles/index.scss";
import Help from "./pages/Dashboard/User/help/help";
import SafetyPrivacy from "./pages/Dashboard/User/help/SafetyPrivacy";
import HelpPage from "./pages/Dashboard/User/help";
import ChatbotPage from "./pages/Dashboard/User/help/ChatbotPage";
import UserPlan from "./components/layouts/userAuth";
import LoginPage from "./pages/auth/login";
import Tutorial from "./pages/auth/tutorial";
import AuthPage from "./pages/auth";
import ForgotPassword from "./pages/auth/forgotPassword";
import ResetPassword from "./pages/auth/resetPassword";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";

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

                    {/* Signup flow */}
                    <Route path="/" element={<UserPlan />}>
                        <Route index path="signup" element={<AuthPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="forgot-password" element={<ForgotPassword />} />
                        <Route path="reset-password" element={<ResetPassword />} />
                        <Route path="tutorial" element={<Tutorial />} />
                    </Route>

                    <Route path="/" element={<SessionsLayout />}>
                        <Route path="pitch-practice-session" element={<PitchPracticeSession />} />
                    </Route>

                    {/* 404 Page */}
                    {/* <Route path="*" element={<NotFound />} /> */}
                </Routes>
            </Router>
        </>
    );
}

export default App;
