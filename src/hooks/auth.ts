import { apiPost } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login, setEmailForPasswordReset, setSignupFlow } from "@/store/slices/authSlice";

export function useSignup() {
    
    const dispatch = useDispatch();
    return useMutation({
        mutationKey: ["signup"],
        mutationFn: async (data: {first_name:string, last_name:string, email: string, password: string }) => {
            return await apiPost("/users/users/", data);
        },
        onSuccess: async (data) => {
            console.log(data)
            // dispatch(login(data));
            dispatch(setSignupFlow("confirmation"));
        },
        onError: (error) => {
            console.error(error);
        },
    });
}

interface LoginResponse {
    data: { is_admin: boolean,
        token: string,
        email: string,
        first_name: string|null,
        last_name: string|null,
     };
}


export function useLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (data: { email: string; password: string }) => {
            return await apiPost<LoginResponse>("/users/auth/login/", data);
        },
        onSuccess: async (data) => {
            const admin = data.data.is_admin
            console.log(admin)
            dispatch(login(data));
            navigate(admin ? "/dashboard/admin" : "/dashboard/user");
        },
        onError: (error) => {
            console.error(error);
        },
    });
}



export function useForgotPassword() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return useMutation({
        mutationKey: ["forgotPassword"],
        mutationFn: async (data: { email: string }) => {
            dispatch(setEmailForPasswordReset(data.email));
            return await apiPost<{ message: string }>("/users/auth/password-reset/", data);
        },
        onSuccess: () => {
            console.log("Password reset link sent.");
                    navigate("../reset-password");
        },
        onError: (error) => {
            console.error(error || "Failed to send reset link. Please try again.");
        },
    });
}

type ResetPasswordResponse = {
    otp: string;
    email: string;
    new_password: string;
};

import {setSuccessMessage} from "@/store/slices/authSlice";

export function useResetPassword() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return useMutation({
        mutationKey: ["resetPassword"],
        mutationFn: async (data: { otp: string; new_password: string; email: string; }) => {
            return await apiPost<ResetPasswordResponse>("/users/auth/password-reset-confirm/", data);
        },
        onSuccess: () => {
            console.log("Password reset successfully.");
            dispatch(setSuccessMessage("Password reset successfully! Redirecting to login..."));
            setTimeout(() => navigate("../login"), 2000);
        },
        onError: (error) => {
            console.error(error.message);
        },
    });
}
