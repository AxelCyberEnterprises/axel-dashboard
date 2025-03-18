import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import DashboardLayout from "./components/layouts/DashboardLayout";
import SessionsLayout from "./components/layouts/SessionsLayout";
import UserPlan from "./components/layouts/userAuth";
import AuthPage from "./pages/auth";
import ForgotPassword from "./pages/auth/forgotPassword";
import LoginPage from "./pages/auth/login";
import ResetPassword from "./pages/auth/resetPassword";
import Tutorial from "./pages/auth/tutorial";
import AdminSessionHistory from "./pages/Dashboard/Admin/AdminSessionHistory";
import AdminDashboardHome from "./pages/Dashboard/Admin/Index";
import UserAnalytics from "./pages/Dashboard/User/Analytics";
import UserDashboardHome from "./pages/Dashboard/User/Index";
import PresentationPractice from "./pages/Dashboard/User/PresentationPractice";
import PublicSpeaking from "./pages/Dashboard/User/PublicSpeaking";
import UserSettings from "./pages/Dashboard/User/Settings";
import UserSessionHistory from "./pages/Dashboard/User/UserSessionHistory";
import Features from "./pages/Features";
import HomePage from "./pages/HomePage";
import Pricing from "./pages/Pricing";
import PitchPracticeSession from "./pages/Sessions/PitchPractice";
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
                        <Route path="presentation-practice" element={<PresentationPractice />} />
                        <Route path="analytics" element={<UserAnalytics />} />
                        <Route path="settings" element={<UserSettings />} />
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
