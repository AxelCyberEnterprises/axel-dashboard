import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setRouteFromLogin, setSignupFlow, setTopicQuestion } from "../../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import { welcomeMessage } from "../../components/layouts/userAuth";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";

const loginSchema = z.object({
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = React.useState(false);

    const form = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
        console.log("Form Data:", data);
        dispatch(setRouteFromLogin(true));
        navigate("../../dashboard/user");
    };

    return (
        <div className="login-container font-[Inter] sm:w-10/12 px-1 sm:mx-auto flex flex-col justify-center h-screen md:overflow-y-hidden max-md:pl-0 max-lg:pl-5">
            {welcomeMessage()}
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="pt-10 md:w-[75%] md:mx-auto flex flex-col gap-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }: { field: any }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        placeholder="Enter your email"
                                        className="rounded-3xl py-7 md:py-[23px] font-[Inter] max-md:w-full text-lg focus:border-0 text-black border-[#d0d5dd]"
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
                        render={({ field }: { field: any }) => (
                            <FormItem className="relative border-0">
                                <FormControl className="relative border-0">
                                    <div className="relative border-0">
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Enter your password"
                                            className="rounded-3xl font-[Inter] py-7 md:py-[23px] pr-12 border text-black outline-0 border-[#d0d5dd] shadow-0 focus:outline-0  focus:border-0    w-full"
                                            {...field}
                                        />
                                        <Button
                                            type="button"
                                            className="absolute  right-1 top-1/2 bg-transparent hover:bg-transparent  rounded-none shadow-none text-[#b7b7b7]  transform -translate-y-1/2"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="py-7 md:py-[23px] font-[Inter] bg-[#262b3a] hover:bg-[#262b3ada] rounded-3xl">
                        Login
                    </Button>
                </form>
            </Form>

            <section className="flex sm:w-[75%] sm:mx-auto justify-between items-center pt-1.5">
                <div>
                    <label className="flex gap-2 justify-start items-center text-sm text-nowrap" htmlFor="remember">
                        <Checkbox
                            className=" border-2  p-2 border-gray-300 rounded-md checked:bg-transparent   bg-transparent  data-[state=checked]:bg-transparent data-[state=checked]:text-black  "
                            name="remember"
                            id="remember"
                        />
                        Remember for 30 days
                    </label>
                </div>

                <Link
                    to="../forgot-password"
                    className="font-semibold hover:bg-transparent p-2 bg-transparent shadow-none rounded-lg text-sm text-[#262b3a]"
                >
                    Forgot Password
                </Link>
            </section>

            <div className="w-full mt-1">
                <p className="flex items-center text-sm text-muted-foreground gap-1 justify-center">
                    Don't have an account?{" "}
                    <Link
                        to="../signup"
                        onClick={() => {
                            dispatch(setSignupFlow("authQuestions"));
                            dispatch(setTopicQuestion("What do you plan on doing?"));
                        }}
                        className="text-[#262b3a] hover:bg-transparent  hover:underline shadow-none font-semibold bg-transparent p-0"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
