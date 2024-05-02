import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type RegisterFormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const Register = () => {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { showToast } = useAppContext();

    const { 
        register, 
        watch, 
        handleSubmit, 
        formState: { errors }
    } = useForm<RegisterFormData>();

    const mutation = useMutation(apiClient.register, {
        onSuccess: async () => {
            showToast({message: "Registration Successful!", type: "SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/");
        },
        onError: (error: Error) => {
            showToast({message:error.message, type: "ERROR"})
        }
    });

    const onSubmit = handleSubmit((data) => {
        mutation.mutate(data);
    })

    return (
        <form className="flex flex-col gap-5 py-6" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold text-slate-700">Create an Account</h2>
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-md font-bold flex-1">
                    First Name
                    <input className="border rounded w-full py-1 px-2 font-normal" {...register("firstName", { required: "This field is required!" })}></input>
                    {errors.firstName && (
                        <span className="text-red-600 text-sm">
                            {errors.firstName.message}
                        </span>
                    )}
                </label>
                <label className="text-gray-700 text-md font-bold flex-1">
                    Last Name
                    <input className="border rounded w-full py-1 px-2 font-normal" {...register("lastName", { required: "This field is required!" })}></input>
                    {errors.lastName && (
                        <span className="text-red-600 text-sm">
                            {errors.lastName.message}
                        </span>
                    )}
                </label>
            </div>
            <label className="text-gray-700 text-md font-bold flex-1">
                Email
                <input type="email" className="border rounded w-full py-1 px-2 font-normal" {...register("email", { required: "This field is required!" })}></input>
                {errors.email && (
                        <span className="text-red-600 text-sm">
                            {errors.email.message}
                        </span>
                    )}
            </label>
            <label className="text-gray-700 text-md font-bold flex-1">
                Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("password", 
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
            <label className="text-gray-700 text-md font-bold flex-1">
                Confirm Password
                <input type="password" className="border rounded w-full py-1 px-2 font-normal" {...register("confirmPassword", 
                    { validate:(val)=> {
                        if(!val) {
                            return "This field is required.";
                        } else if(watch("password") !== val) {
                            return "Your passwords do not match.";
                        }
                    }
                    })}></input>
                    {errors.confirmPassword && (
                        <span className="text-red-600 text-sm">
                            {errors.confirmPassword.message}
                        </span>
                    )}
            </label>
            <span className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-700">
                    Already have an account? <Link to="/sign-in" className="underline underline-offset-2 text-rose-700">Log in here.</Link>
                </span>
                <button type="submit" className="bg-rose-700 text-white px-3 py-1 font-bold hover:bg-rose-600 text-sm cursor-pointer rounded-sm border-none shadow-sm">Register</button>
            </span>
        </form>
    )
}

export default Register;