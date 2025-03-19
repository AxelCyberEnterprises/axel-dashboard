import { apiPost } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login, setSignupFlow } from "@/store/slices/authSlice";

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
            // dispatch(setApiError(error.message));
        },
    });
}
