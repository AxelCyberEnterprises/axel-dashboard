import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Question {
    id: number;
    question: string;
    content: { contentId: number; plan?: string; role?: string }[];
}

interface SignupData {
    fullName: string;
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
                { contentId: 3, role: "Executives" },
                { contentId: 4, role: "C-suites" },
                { contentId: 5, role: "Athletes" },
                { contentId: 6, role: "Entrepreneurs" },
                { contentId: 7, role: "Sales Professionals" },
            ],
        },
    ],
    topicQuestion: "What do you plan on doing?",

    signupFlow: "authQuestions",
    routeFromLogin: false,
    signupData: null, // Stores signup details
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setTopicQuestion: (state, action: PayloadAction<string>) => {
            state.topicQuestion = action.payload;
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
    },
});

export const { setTopicQuestion, setSignupFlow, setRouteFromLogin, setSignupData } = authSlice.actions;
export default authSlice.reducer;
