import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setSignupFlow, setSignupData } from "../../store/slices/authSlice";
import { Link } from "react-router-dom";
import { BackToWebsite, welcomeMessage } from "../layouts/userAuth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RootState } from "@/store";

// Enhanced password validation schema
const passwordSchema = z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character");

const signupSchema = z
    .object({
        fullName: z.string().min(1, "Full name is required"),
        email: z.string().email("Invalid email address").min(1, "Email is required"),
        password: passwordSchema,
        confirmPassword: z.string().min(1, "Confirm password is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

type SignupFormValues = z.infer<typeof signupSchema>;

const Signup: React.FC = () => {
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [passwordStrength, setPasswordStrength] = React.useState("");

    const form = useForm<SignupFormValues>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const signupData = useSelector((state: RootState) => state.auth.signupData);

    const onSubmit: SubmitHandler<SignupFormValues> = (data) => {
        dispatch(
            setSignupData({
                ...signupData,
                fullName: data.fullName,
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
            }),
        );
        dispatch(setSignupFlow("confirmation"));
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const password = e.target.value;
        form.setValue("password", password);
        checkPasswordStrength(password);
    };

    const checkPasswordStrength = (password: string) => {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*.\-_]).{6,}$/;

        const mediumRegex = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/;

        if (strongRegex.test(password)) {
            setPasswordStrength("Strong");
        } else if (mediumRegex.test(password)) {
            setPasswordStrength("Medium");
        } else {
            setPasswordStrength("Weak");
        }
    };

    return (
        <div className="signup-container sm:w-10/12 px-1 sm:mx-auto md:flex flex flex-col justify-center h-screen md:overflow-y-hidden max-md:pl-0 max-lg:pl-5">
            {BackToWebsite()}
            {welcomeMessage()}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex pt-1 sm:w-[75%] sm:mx-auto font-[Montserrat] flex-col gap-5 md:gap-4"
                >
                    <FormField
                        control={form.control}
                        name="fullName"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your full name"
                                        className="rounded-lg font-[Montserrat] text-black py-6 border-[#d0d5dd]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        className="rounded-lg font-[Montserrat]  py-6 text-black border-[#d0d5dd]"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="rounded-lg py-6 pr-12 border font-[Montserrat] text-black border-[#d0d5dd] w-full"
                                            {...field}
                                            onChange={handlePasswordChange}
                                        />
                                        <Button
                                            type="button"
                                            className="absolute right-1 top-1/2 bg-transparent hover:bg-transparent text-[#b7b7b7] transform -translate-y-1/2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                                {passwordStrength && (
                                    <div className="text-sm mt-1">
                                        Password Strength:{" "}
                                        <span
                                            className={`font-semibold ${passwordStrength === "Strong" ? "text-green-500" : passwordStrength === "Medium" ? "text-yellow-500" : "text-red-500"}`}
                                        >
                                            {passwordStrength}
                                        </span>
                                    </div>
                                )}
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            className="rounded-lg py-6 pr-12 font-[Montserrat] text-black border-[#d0d5dd] w-full"
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            className="absolute right-1 top-1/2 bg-transparent hover:bg-transparent text-[#b7b7b7] transform -translate-y-1/2"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        >
                                            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="rounded-lg font-[Montserrat] bg-[#262b3a] hover:bg-[#262b3ada] py-6"
                    >
                        Get Started
                    </Button>
                </form>
            </Form>
            <div className="flex gap-2 w-full text-muted-foreground text-sm justify-center font-[Montserrat] items-center my-2">
                <p>Already have an account?</p>
                <Link
                    to="../login"
                    className="font-semibold bg-transparent hover:underline shadow-none hover:bg-none text-black w-fit p-0"
                >
                    Log in
                </Link>
            </div>
        </div>
    );
};

export default Signup;
