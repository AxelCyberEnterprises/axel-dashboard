import React from "react";
import { setSignupFlow } from "../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Confirmation: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleResendLink = () => {};

    return (
        <div className="md:w-10/12 sm:w-3/5  sm:mx-auto flex  flex-col justify-center h-screen overflow-y-hidden gap-3 max-md:pl-0 max-lg:pl-5">
            <h2 className="text-[166%] text-center font-medium">We sent you a confirmation link</h2>
            <p className="text-center font-[Montserrat] text-sm text-[#667085]">
                Click on the link sent to finish signing up. <br /> Link lasts for only 1 minute
            </p>
            <div className="flex w-full sm:w-[75%] sm:mx-auto gap-4 font-[Montserrat] pt-2">
                <button
                    onClick={() => dispatch(setSignupFlow("signup"))}
                    className="bg-white flex-[0.3] md:w-[100px] text-black rounded-[20px] h-[50px] border font-semibold"
                >
                    Back
                </button>
                <button
                    onClick={() => navigate("../tutorial")}
                    className=" text-white flex-[30] h-[50px] bg-[#262b3a] hover:bg-[#262b3ada] md:w-[240px] rounded-[20px]"
                    type="submit"
                >
                    Go to mail
                </button>
            </div>
            <p className="text-sm mx-auto font-[Montserrat] flex  items-center  mt-2 gap-1 text-[#475467]">
                Didn't recieve any link?{" "}
                <button onClick={handleResendLink} className="font-semibold text-[#262B3A] bg-white p-0 m-0">
                    Click here
                </button>
            </p>
        </div>
    );
};

export default Confirmation;
