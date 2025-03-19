import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import axios from "axios";
import { setSignupFlow } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "../../components/ui/input"; // Shadcn Input component
import { Button } from "../../components/ui/button"; // Shadcn Button component
import { ClipLoader } from "react-spinners"; // For loading state
import { RootState } from "@/store";

// Zod schema for validation
const verificationSchema = z.object({
    code: z.string().min(6, "Verification code must be 6 characters").max(6),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

const Confirmation: React.FC = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = React.useState(false);
    const [apiError, setApiError] = React.useState<string | null>(null);
    const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
    const signupData = useSelector((state: RootState) => state.auth.signupData);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<VerificationFormValues>({
        resolver: zodResolver(verificationSchema),
    });

    // Handle form submission
    const onSubmit: SubmitHandler<VerificationFormValues> = async (data) => {
        setIsLoading(true);
        setApiError(null);
        console.log(signupData?.email);

        try {
            // Simulate API call to verify the code
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/users/auth/verify-email/`, {
                code: data.code,
                email: signupData?.email,
            });

            console.log("Verification successful:", response.data);
            setSuccessMessage("Email verified successfully! Redirecting...");

            // Redirect to the next step (e.g., authQuestions)
            setTimeout(() => {
                dispatch(setSignupFlow("authQuestions"));
            }, 2000);
        } catch (error: any) {
            console.error("Verification failed:", error.response ? error.response.data : error.message);
            setApiError(error.response?.data?.message || "Verification failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle resend link
    const handleResendLink = async () => {
        try {
            // Simulate API call to resend the verification code
            const response = await axios.post("/api/resend-verification-code");

            console.log("Code resent:", response.data);
            setSuccessMessage("A new verification code has been sent to your email.");
        } catch (error: any) {
            console.error("Resend failed:", error.response ? error.response.data : error.message);
            setApiError(error.response?.data?.message || "Failed to resend the code. Please try again.");
        }
    };

    return (
        <div className="md:w-10/12 sm:w-3/5 sm:mx-auto flex flex-col justify-center h-screen overflow-y-hidden gap-3 max-md:pl-0 max-lg:pl-5">
            <h2 className="text-3xl text-center">We sent you a verification code</h2>
            <p className="text-center font-[Montserrat] text-sm text-[#667085]">
                We've sent a 6-digit verification code to your email. <br /> Please enter it below.
            </p>

            {/* Verification Code Input */}
            <form onSubmit={handleSubmit(onSubmit)} className="sm:w-[75%] sm:mx-auto flex flex-col gap-4">
                <Input
                    type="text"
                    placeholder="Enter 6-digit code"
                    {...register("code")}
                    className="rounded-lg py-6 font-[Montserrat] text-lg focus:border-0 text-black border-[#d0d5dd]"
                    maxLength={6}
                />
                {errors.code && (
                    <p className="text-sm text-red-600">{errors.code.message}</p>
                )}

<div className="flex w-full sm:w-[75 sm:mx-auto gap-4 font-[Montserrat] pt-2">
                <Button
                    onClick={() => dispatch(setSignupFlow("signup"))}
                    className="bg-white flex-2/6 md:w-[100px] hover:bg-transparent text-black rounded-lg py-6 border font-semibold"
                >
                    Back
                </Button>

                <Button
                    type="submit"
                    disabled={isLoading}
                    className="text-white flex-4/6 py-6 bg-[#262b3a] hover:bg-[#262b3ada] rounded-lg"
                >
                    {isLoading ? <ClipLoader size={20} color="#ffffff" /> : "Verify"}
                </Button>
                </div>
            </form>

            {/* Back and Go to Mail Buttons */}
{/*            
                <Button
                    onClick={() => {
                        dispatch(setSignupFlow("authQuestions"));
                    }}
                    className="text-white flex-[30] py-6 bg-[#262b3a] hover:bg-[#262b3ada] md:w-[240px] rounded-lg"
                >
                    Go to mail
                </Button> */}
            {/* Resend Link */}
            <p className="text-sm mx-auto font-[Montserrat] flex items-center mt-2 gap-1 text-[#475467]">
                Didn't receive any link?{" "}
                <Button
                    onClick={handleResendLink}
                    className="font-semibold text-[#262B3A] bg-white p-0 m-0 hover:bg-white"
                >
                    Click here
                </Button>
            </p>

            {/* Error and Success Messages */}
            {apiError && (
                <p className="text-sm text-center text-red-600">{apiError}</p>
            )}
            {successMessage && (
                <p className="text-sm text-center text-green-600">{successMessage}</p>
            )}
        </div>
    );
};

export default Confirmation;