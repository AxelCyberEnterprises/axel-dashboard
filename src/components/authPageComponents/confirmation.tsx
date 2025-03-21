import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { setSignupFlow } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useEmailConfirmation } from "@/hooks/auth";

const verificationSchema = z.object({
    code: z.string().min(6, "Verification code must be 6 characters").max(6),
});

type VerificationFormValues = z.infer<typeof verificationSchema>;

const Confirmation: React.FC = () => {
    const dispatch = useDispatch();
    const [apiError, setApiError] = React.useState<string | null>(null);
    const signupData = useSelector((state: RootState) => state.auth.signupData);
    const successMessage = useSelector((state: RootState) => state.auth.successMessage);
    
    const form = useForm<VerificationFormValues>({
        resolver: zodResolver(verificationSchema),
        defaultValues: { code: "" },
    });

    const {mutate: emailConfirmation, isPending, error} = useEmailConfirmation();

    const onSubmit = async (data: VerificationFormValues) => {
        setApiError(null);


        if (signupData?.email) {
            console.log(signupData.email)
            emailConfirmation({ verification_code: data.code, email: signupData.email });
        } else {
            setApiError("Email is missing. Please try again.");
        }
       
    };

     useEffect(() => {
            if (error) {
                form.setError("code", {
                    type: "manual",
                    message: (error.message || "Verification failed. Please try again."),
                });
            }
        }, [error]);


        const watchValues = form.watch(); 



    const handleResendLink = async () => {
        if (signupData?.email) {
            console.log(signupData.email)
            emailConfirmation({ verification_code: watchValues.code, email: signupData.email });
        } else {
            setApiError("Email is missing. Please try again.");
        }
    };

    return (
        <div className="md:w-10/12 sm:w-3/5 sm:mx-auto flex flex-col justify-center h-screen overflow-y-hidden gap-3 max-md:pl-0 max-lg:pl-5">
            <h2 className="text-3xl text-center">We sent you a verification code</h2>
            <p className="text-center font-[Montserrat] text-sm text-[#667085]">
                We've sent a 6-digit verification code to your email. <br /> Please enter it below.
            </p>
            
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="sm:w-[75%] sm:mx-auto flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="text"
                                        placeholder="Enter 6-digit code"
                                        maxLength={6}
                                        {...field}
                                        className="rounded-lg py-6 font-[Montserrat] text-lg focus:border-0 text-black border-[#d0d5dd]"
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    
                    <div className="flex w-full sm:w-[75%] sm:mx-auto gap-4 font-[Montserrat] pt-2">
                        <Button
                            type="button"
                            onClick={() => dispatch(setSignupFlow("signup"))}
                            className="bg-white flex-2/6 md:w-[100px] hover:bg-transparent text-black rounded-lg py-6 border font-semibold"
                        >
                            Back
                        </Button>
                        <Button
                            type="submit"
                            isLoading={isPending}
                            className="text-white flex-4/6 py-6 bg-[#262b3a] hover:bg-[#262b3ada] rounded-lg"
                        >
                            Verify
                        </Button>
                    </div>
                </form>
            </Form>
            
            <p className="text-sm mx-auto font-[Montserrat] flex items-center mt-2 gap-1 text-[#475467]">
                Didn't receive any link? 
                <Button
                    onClick={handleResendLink}
                    className="font-semibold text-[#262B3A] bg-white p-0 m-0 hover:bg-white"
                >
                    Click here
                </Button>
            </p>
            
            {apiError && <p className="text-sm text-center text-red-600">{apiError}</p>}
            {successMessage && <p className="text-sm text-center text-green-600">{successMessage}</p>}
        </div>
    );
};

export default Confirmation;