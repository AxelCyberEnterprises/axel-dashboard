import React from "react";
import { useNavigate } from "react-router-dom";
import tutorial from "../../assets/images/tutorial-position.png";
import { welcomeMessage } from "@/components/layouts/userAuth";

const Tutorial: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="md:w-10/12 sm:w-3/5 h-screen flex justify-center   sm:mx-auto flex-col   overflow-y-auto gap-2 max-md:pl-0 max-lg:pl-5">
            {welcomeMessage()}
            <div className="flex justify-center items-center mt-0 flex-col">
                <p className="text-[#667085] font-[Montserrat] -mt-3 mb-8">
                    A tutorial walkthrough video by AI Jacqueleen
                </p>
                <div className="mb-4">
                    <img src={tutorial} alt="tutorial" />
                </div>
                <button
                    onClick={() => navigate("../../dashboard/user")}
                    className="font-[Montserrat] w-full lg:max-w-[360px] bg-[#262b3a] hover:bg-[#262b3ada]"
                >
                    Finish up
                </button>
            </div>
        </div>
    );
};

export default Tutorial;
