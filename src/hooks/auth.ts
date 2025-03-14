import { apiPost } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "@/store/slices/authSlice";

export function useRegister() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["register"],
        mutationFn: async (data) => {
            return await apiPost("/auth/register", data);
        },
        onSuccess: async (data) => {
            dispatch(login(data));
            navigate("/");
        },
        onError: (error) => {
            console.error(error);
        },
    });
}

export function useLogin() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    return useMutation({
        mutationKey: ["login"],
        mutationFn: async (data) => {
            return await apiPost("/auth/login", data);
        },
        onSuccess: async (data) => {
            console.log(data);
            dispatch(login(data));
            navigate("/");
        },
        onError: (error) => {
            console.error(error);
        },
    });
}
