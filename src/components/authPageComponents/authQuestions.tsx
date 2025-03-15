import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/index";
import { setTopicQuestion, setSignupData, setSignupFlow } from "../../store/slices/authSlice";
import { welcomeMessage } from "@/components/layouts/userAuth";

const AuthQuestions: React.FC = () => {
    const [selectedOptions, setSelectedOptions] = useState<{
        plan?: string;
        role?: string;
    }>({});
    const signupData = useSelector((state: RootState) => state.auth.signupData);

    const dispatch = useDispatch();

    const questions = useSelector((state: RootState) => state.auth.questions);
    const topicQuestion = useSelector((state: RootState) => state.auth.topicQuestion);

    const filteredQuestions = questions.filter((question) => question.question === topicQuestion);

    const handleInputContent = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedContentId = e.target.value;
        const selectedOption = filteredQuestions[0].content.find(
            (option) => option.contentId === Number(selectedContentId),
        );

        if (selectedOption) {
            if (topicQuestion === "What do you plan on doing?") {
                setSelectedOptions((prev) => ({ ...prev, plan: selectedOption.plan }));

                // Save to Redux state (signupData.planQuestion)
                dispatch(
                    setSignupData({
                        ...signupData,
                        planQuestion: selectedOption.plan || "",
                    }),
                );

                setTimeout(() => {
                    dispatch(setTopicQuestion("What role are you?"));
                }, 800);
            } else if (topicQuestion === "What role are you?") {
                setSelectedOptions((prev) => ({ ...prev, role: selectedOption.role }));

                // Save to Redux state (signupData.roleQuestion)
                dispatch(
                    setSignupData({
                        ...signupData,
                        roleQuestion: selectedOption.role || "",
                    }),
                );

                setTimeout(() => {
                    dispatch(setSignupFlow("signup"));
                }, 400);
            }
        }
    };

    return (
        <div className="  md:flex flex-col md:h-[90vh]  max-lg:p-5 justify-center  h-full">
            {welcomeMessage()}
            <div className="font-[Montserrat] mt-10 w-full md:w-[80%] mx-auto lg:w-full md:mt-5">
                {filteredQuestions.map((item) => (
                    <div key={item.id}>
                        <p className="text-[#344054]">{item.question}</p>
                        <div
                            className={`mt-3 w-full ${
                                topicQuestion === "What do you plan on doing?"
                                    ? "lg:flex-row max-lg:w-full   flex-col max-lg:space-y-4 flex space-x-4"
                                    : "md:flex lg:grid md:flex-row md:justify-between flex-wrap flex-col max-md:space-y-4 flex grid-cols-[repeat(auto-fit,minmax(220px,1fr))] md:gap-5"
                            }`}
                        >
                            {item.content.map((option) => {
                                const isSelected =
                                    topicQuestion === "What do you plan on doing?"
                                        ? selectedOptions.plan === option.plan
                                        : selectedOptions.role === option.role;

                                return (
                                    <label
                                        key={option.contentId}
                                        className={`flex items-center font-normal text-sm px-4  justify-start  md:py-6 py-3 lg:py-4 w-full ${
                                            topicQuestion === "What do you plan on doing?"
                                                ? "lg:w-[180px] "
                                                : "md:w-[160px] lg:w-[220px]"
                                        } ${
                                            isSelected
                                                ? "bg-[#2154cb11] text-[#2154cb]"
                                                : "text-black bg-white border-[#b7b7b7]"
                                        } space-x-2 rounded-[10px] border cursor-pointer`}
                                    >
                                        <input
                                            type="radio"
                                            name={topicQuestion === "What do you plan on doing?" ? "plans" : "roles"}
                                            value={option.contentId} // Use contentId as the value
                                            className="mt-0 mb-0 w-fit accent-[#2154cb]"
                                            checked={isSelected} // Reflect whether the option is selected
                                            onChange={handleInputContent}
                                        />
                                        <span className="text-gray-70">{option.plan || option.role}</span>
                                    </label>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AuthQuestions;
