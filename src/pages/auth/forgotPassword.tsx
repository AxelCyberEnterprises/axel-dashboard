import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const forgotPasswordSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword: React.FC = () => {
    const navigate = useNavigate();
    const form = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit: SubmitHandler<ForgotPasswordFormValues> = async (data) => {
        console.log("Form Data:", data);
        navigate("../reset-password");
    };

    return (
        <div className="forgot-password-container px-1 md:w-10/12 sm:w-3/5 h-screen sm:mx-auto   flex flex-col justify-center overflow-y-hidden gap-3 max-md:pl-0 max-lg:pl-5">
            <h2 className="text-[30px] text-center font-medium">Forgot Password?</h2>
            <p className="text-center font-[Inter] text-[#667085]">
                We got you. Enter your email to get a link to <br /> reset your password.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full sm:w-[75%] sm:mx-auto">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        className=" rounded-3xl  w-full font-[Inter] md:py-[20px] py-7 text-black border-[#d0d5dd]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-4 font-[Inter] pt-4">
                        <Link
                            to="../login"
                            className="bg-white flex-1 text-black rounded-3xl py-4 md:py-[14px] px-5 border flex items-center justify-center font-semibold"
                        >
                            Back
                        </Link>
                        <Button
                            type="submit"
                            className="text-white flex items-center justify-center flex-[4.5] bg-[#262b3a] hover:bg-[#262b3ada] py-7 md:py-[22px] rounded-3xl"
                        >
                            Get reset link
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ForgotPassword;
