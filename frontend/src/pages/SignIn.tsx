import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
    email: string;
    password: string;
}

const SignIn = () => {
    const queryClient = useQueryClient();
    const { showToast } = useAppContext();
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm<SignInFormData>();
    const mutation = useMutation(apiClient.signIn, {
        onSuccess: async() => {
            showToast({
                message: "Sign in Succesful!",
                type: "SUCCESS",
            });
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({
                message: error.message,
                type: "ERROR",
            });
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

    return (
        <form className="flex flex-col gap-5 py-10" onSubmit={onSubmit}>
            <h2 className="text-4xl font-bold text-slate-700 mb-3">Sign In</h2>
            <label className="text-gray-700 text-md font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-medium text-rose-800" {...register("email", { required: "This field is required!" })}></input>
                {errors.email && (
                        <span className="text-red-600 text-sm">
                            {errors.email.message}
                        </span>
                    )}
            </label>
            <label className="text-gray-700 text-md font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full py-1 px-2 font-medium text-rose-800" {...register("password", 
                    { required: "This field is required!", 
                    minLength: { 
                        value: 6, message: "Password must be at least 6 characters." 
                    } })}></input>
                    {errors.password && (
                        <span className="text-red-600 text-sm">
                            {errors.password.message}
                        </span>
                    )}
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                    Not Registered? <Link to="/register" className="underline underline-offset-2 text-rose-800">Create an account here.</Link>
                </span>
                <button type="submit" className="bg-rose-800 text-white px-3 py-1 font-bold hover:bg-rose-600 text-sm cursor-pointer rounded-sm border-none shadow-sm">Login</button>
            </span>
        </form>
    )
}

export default SignIn;