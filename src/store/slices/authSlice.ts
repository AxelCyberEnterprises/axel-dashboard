import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { tokenManager } from "@/lib/utils";

interface Question {
    id: number;
    question: string;
    content: { contentId: number; plan?: string; role?: string }[];
}

interface SignupData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    planQuestion: string;
    roleQuestion: string;
}

interface AuthState {
    questions: Question[];
    topicQuestion: string;
    signupFlow: string;
    routeFromLogin: boolean;
    signupData: SignupData | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user: any | null;
    isAuthenticated: boolean;
    hasCheckedAuth: boolean;
    emailForPasswordReset: string;
}

const initialState: AuthState = {
    questions: [
        {
            id: 1,
            question: "What do you plan on doing?",
            content: [
                { contentId: 1, plan: "Pitch" },
                { contentId: 2, plan: "Present" },
                { contentId: 3, plan: "Speak" },
            ],
        },
        {
            id: 2,
            question: "What role are you?",
            content: [
                { contentId: 1, role: "Early Career Professional" },
                { contentId: 2, role: "Mid-level Professionals" },
                { contentId: 3, role: "Sales Professionals" },
                { contentId: 4, role: "C-suites" },
                { contentId: 5, role: "Entrepreneurs" },
                { contentId: 6, role: "Major League Sports Athlete" },
                { contentId: 7, role: "Major League Sports Executive" },
            ],
        },
    ],
    topicQuestion: "What do you plan on doing?",

    signupFlow: "signup",
    routeFromLogin: false,
    signupData: null, // Stores signup details
    user: null,
    isAuthenticated: true,
    hasCheckedAuth: false,
    emailForPasswordReset: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTopicQuestion: (state, action: PayloadAction<string>) => {
            state.topicQuestion = action.payload;
        },
        setEmailForPasswordReset: (state, action: PayloadAction<string>) => {
            state.emailForPasswordReset = action.payload;
        },
        setSignupFlow: (state, action: PayloadAction<string>) => {
            state.signupFlow = action.payload;
        },
        setRouteFromLogin: (state, action: PayloadAction<boolean>) => {
            state.routeFromLogin = action.payload;
        },
        setSignupData: (state, action: PayloadAction<Partial<SignupData>>) => {
            state.signupData = { ...state.signupData!, ...action.payload };
        },
        logout: (state) => {
            tokenManager.clearToken();
            state.user = null;
            state.isAuthenticated = false;
            state.hasCheckedAuth = true;
        },
        login: (state, data) => {
            const { token, email } = data.payload.data;
            if (!token || !email) {
                throw new Error("Invalid data");
            }

            try {
                tokenManager.setToken(token);
                state.isAuthenticated = true;
                state.user = true;
            } catch (error) {
                console.error("Failed to set tokens:", error);
                state.user = null;
                state.isAuthenticated = false;
            }
        },
    },
});

export const checkAuth = createAsyncThunk("auth/checkAuth", async (_, { dispatch }) => {
    const accessToken = tokenManager.getToken();
    if (!accessToken) {
        dispatch(authSlice.actions.logout()); // Dispatch logout if no token
        return false;
    }
    return true;
});

export const { setTopicQuestion, setSignupFlow, setRouteFromLogin, setSignupData, logout, login, setEmailForPasswordReset } = authSlice.actions;
export default authSlice.reducer;
