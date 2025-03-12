import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Password:", password);
        console.log("Confirm Password:", confirmPassword);

        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        navigate("../login");
    };

    return (
        <div className="forgot-password-container md:w-10/12 sm:w-3/5 sm:mx-auto flex flex-col justify-center h-screen overflow-y-hidden max-md:pl-0 gap-3 max-lg:pl-5">
            <h2 className="text-[30px] text-center font-medium">Reset Password</h2>
            <p className="text-center font-[Inter] text-[#667085]">
                Your new password must be different from <br /> the previous one.
            </p>
            <form className="max-md:w-full px-1 sm:w-[75%] sm:mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="form-group max-md:w-full flex-col flex gap-3">
                    <div className="relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter new password"
                            id="password"
                            className="rounded-3xl font-[Inter] py-7 md:py-[20px] pr-12 border text-black border-[#d0d5dd] w-full"
                            required
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                console.log("New Password Input:", e.target.value);
                            }}
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
                            className="rounded-3xl font-[Inter] pr-12 w-full text-black py-7 md:py-[20px] border-[#d0d5dd]"
                            id="confirmPassword"
                            required
                            value={confirmPassword}
                            onChange={(e) => {
                                setConfirmPassword(e.target.value);
                                console.log("Confirm Password Input:", e.target.value);
                            }}
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
                    className="text-white lg:w-full font-[Inter] bg-[#262b3a] hover:bg-[#262b3ada] py-7 md:py-[20px] max-md:w-full rounded-3xl"
                >
                    Reset password
                </Button>
            </form>
            {error && <p className="text-center font-[Inter] text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default ResetPassword;
