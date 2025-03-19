import React, { useState } from "react";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ResetPassword: React.FC = () => {
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const emailForPasswordReset =  useSelector((state: RootState) => state.auth.emailForPasswordReset);

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Reset previous messages
        setError("");
        setSuccessMessage("");

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_URL}/users/auth/password-reset-confirm/`,
                {
                    email: emailForPasswordReset,
                    otp: otp,
                    new_password: password,
                },
                { headers: { "Content-Type": "application/json" } }
            );

            console.log("Success:", response.data);
            setSuccessMessage("Password reset successfully! Redirecting to login...");

            setTimeout(() => {
                navigate("../login");
            }, 2000);
        } catch (error: any) {
            console.error("Error:", error);

            if (error.response) {
                setError(error.response.data?.message || "Failed to reset password. Try again.");
            } else if (error.request) {
                setError("No response from server. Check your internet connection.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="forgot-password-container md:w-10/12 sm:w-3/5 sm:mx-auto flex flex-col justify-center h-screen overflow-y-hidden max-md:pl-0 gap-3 max-lg:pl-5">
            <h2 className="text-3xl text-center">Reset Password</h2>
            <p className="text-center font-[Inter] text-[#667085]">
                Your new password must be different from <br /> the previous one.
            </p>
            <form className="max-md:w-full px-1 sm:w-[75%] sm:mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="form-group max-md:w-full flex-col flex gap-3">
                    <div className="relative">
                        <Input
                            type="text"
                            placeholder="Enter OTP"
                            id="otp"
                            className="rounded-lg font-[Inter] py-6 border text-black border-[#d0d5dd] w-full"
                            required
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                        />
                    </div>
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            id="password"
                            className="rounded-lg font-[Inter] py-6 pr-12 border text-black border-[#d0d5dd] w-full"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute -right-1 w-fit p-7 top-1/2 bg-transparent text-[#b7b7b7] transform -translate-y-1/2"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <div className="relative">
                        <Input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm new password"
                            className="rounded-lg font-[Inter] pr-12 w-full text-black py-6 border-[#d0d5dd]"
                            id="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            type="button"
                            className="absolute -right-1 w-fit p-7 top-1/2 bg-transparent text-[#b7b7b7] transform -translate-y-1/2"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </div>
                <Button
                    type="submit"
                    className="text-white lg:w-full font-[Inter] bg-[#262b3a] hover:bg-[#262b3ada] py-6 max-md:w-full rounded-lg"
                    disabled={loading}
                >
                    {loading ? "Resetting..." : "Reset password"}
                </Button>
            </form>
            {error && <p className="text-center font-[Inter] text-red-500 text-sm">{error}</p>}
            {successMessage && <p className="text-center font-[Inter] text-green-500 text-sm">{successMessage}</p>}
        </div>
    );
};

export default ResetPassword;
