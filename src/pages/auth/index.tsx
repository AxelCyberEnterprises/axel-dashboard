import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/index"; // Adjust the path as needed
import Signup from "@/components/authPageComponents/signup";
import Confirmation from "@/components/authPageComponents/confirmation";
import AuthQuestions from "@/components/authPageComponents/authQuestions";
const AuthPage: React.FC = () => {
    const signupFlow = useSelector((state: RootState) => state.auth.signupFlow);
    const signupData = useSelector((state: RootState) => state.auth.signupData);
    useEffect(() => {
        console.log(signupData);
    }, [signupData]);
    return (
        <div>
            {signupFlow === "authQuestions" && <AuthQuestions />}
            {signupFlow === "signup" && <Signup />}
            {signupFlow === "confirmation" && <Confirmation />}
        </div>
    );
};

export default AuthPage;
