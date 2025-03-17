import { ReactNode } from "react";
import { Link, Navigate, Route, Routes, useLocation, BrowserRouter as Router } from "react-router";
import { useSelector } from "react-redux";
import DashboardLayout from "../components/layouts/DashboardLayout";
import SessionsLayout from "../components/layouts/SessionsLayout";
import UserPlan from "./layouts/userAuth";
import AdminSessionHistory from "../pages/Dashboard/Admin/AdminSessionHistory";
import AdminDashboardHome from "../pages/Dashboard/Admin/Index";
import UserAnalytics from "../pages/Dashboard/User/Analytics";
import UserDashboardHome from "../pages/Dashboard/User/Index";
import UserSettings from "../pages/Dashboard/User/Settings";
import UserSessionHistory from "../pages/Dashboard/User/UserSessionHistory";
import PitchPracticeSession from "../pages/Sessions/PitchPractice";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/login";
import Tutorial from "../pages/auth/tutorial";
import AuthPage from "../pages/auth";
import ForgotPassword from "../pages/auth/forgotPassword";
import ResetPassword from "../pages/auth/resetPassword";
import Features from "../pages/Features";
import Pricing from "../pages/Pricing";
import UserPitchSessionReport from "../pages/Dashboard/User/SessionReports/PitchSessionReport";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { tokenManager } from "@/lib/utils";
import Help from "@/pages/Dashboard/User/help/help";
import SafetyPrivacy from "@/pages/Dashboard/User/help/SafetyPrivacy";
import Chat from "@/pages/Dashboard/User/help/ChatbotPage";
import HelpPage from "@/pages/Dashboard/User/help";

function RequireAuth({ children }: { children: ReactNode }) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);
    const location = useLocation();

    if (!isAuthenticated && !tokenManager.getToken()) {
        return <Navigate replace to="/auth/login" state={{ from: location }} />;
    }

    return children;
}

function UserDashboardRoutes() {
    return (
        <Routes>
            <Route index element={<UserDashboardHome />} />
            <Route path="session-history" element={<UserSessionHistory />} />
            <Route path="session-report/:id" element={<UserPitchSessionReport />} />
            <Route path="analytics" element={<UserAnalytics />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="help" element={<HelpPage/>} >
            <Route index element={<Help/>} />
            <Route path="safety" element={<SafetyPrivacy />} />
            <Route path="message" element={<Chat />} />
            </Route>

            <Route path="*" element={<Navigate replace to="/dashboard/user" />} />
        </Routes>
    );
}

function AdminDashboardRoutes() {
    return (
        <Routes>
            <Route index element={<AdminDashboardHome />} />
            <Route path="session-history" element={<AdminSessionHistory />} />
            <Route path="analytics" element={<UserAnalytics />} />
            <Route path="settings" element={<UserSettings />} />
            <Route path="*" element={<Navigate replace to="/dashboard/admin" />} />
        </Routes>
    );
}

function SessionRoutes() {
    return (
        <Routes>
            <Route path="pitch-practice-session" element={<PitchPracticeSession />} />
            <Route path="*" element={<Navigate replace to="/sessions" />} />
        </Routes>
    );
}

function AuthRoutes() {
    return (
        <Routes>
            <Route path="signup" element={<AuthPage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
            <Route path="tutorial" element={<Tutorial />} />
            <Route path="*" element={<Navigate replace to="/auth/signup" />} />
        </Routes>
    );
}

function MainRoutes() {
    return (
        <>
            <Routes>
                <Route
                    path="dashboard/user/*"
                    element={
                        <DashboardLayout>
                            <UserDashboardRoutes />
                        </DashboardLayout>
                    }
                />
                <Route
                    path="dashboard/admin/*"
                    element={
                        <DashboardLayout>
                            <AdminDashboardRoutes />
                        </DashboardLayout>
                    }
                />
                <Route
                    path="sessions/*"
                    element={
                        <SessionsLayout>
                            <SessionRoutes />
                        </SessionsLayout>
                    }
                />
            </Routes>
        </>
    );
}

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="features" element={<Features />} />
                <Route path="pricing" element={<Pricing />} />
                <Route
                    path="auth/*"
                    element={
                        <UserPlan>
                            <AuthRoutes />
                        </UserPlan>
                    }
                />
                <Route
                    path="/*"
                    element={
                        <RequireAuth>
                            <MainRoutes />
                        </RequireAuth>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center gap-6">
            <h1 className="text-6xl font-bold text-foreground">404</h1>
            <p className="text-xl text-muted-foreground">Oops! Page not found</p>
            <Separator className="my-4 h-1 w-24 rounded bg-primary" />
            <p className="mb-6 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
            <Button asChild size="lg">
                <Link to="/">Go Home</Link>
            </Button>
        </div>
    );
}
