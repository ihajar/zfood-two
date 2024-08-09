import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import useSignUp from "@/hooks/useSignUp";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";



const signUpSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Invalid email').min(1, 'Email is required'),
  password: z.string().min(1, 'Password is reuired'),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignupPage: React.FC = () => {
  const methods = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  })
  const { register, handleSubmit, formState: { errors }} = methods;
  const mutation = useSignUp();

  const onSubmit: SubmitHandler<SignUpFormValues> = (data) => {
    mutation.mutate(data);
  };

  return (
     <div className="flex justify-center items-center min-h-screen bg-[#122D1D]">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
                <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                            <Input
                                id="username"
                                type="text"
                                {...register('username')}
                                className="mt-1 block w-full"
                                aria-invalid={errors.username ? 'true' : 'false'}
                                aria-describedby="username-error"
                            />
                            {errors.username && (
                                <p id="username-error" className="text-red-500 text-sm">{errors.username.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <Input
                                id="email"
                                type="email"
                                {...register('email')}
                                className="mt-1 block w-full"
                                aria-invalid={errors.email ? 'true' : 'false'}
                                aria-describedby="email-error"
                            />
                            {errors.email && (
                                <p id="email-error" className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                            <Input
                                id="password"
                                type="password"
                                {...register('password')}
                                className="mt-1 block w-full"
                                aria-invalid={errors.password ? 'true' : 'false'}
                                aria-describedby="password-error"
                            />
                            {errors.password && (
                                <p id="password-error" className="text-red-500 text-sm">{errors.password.message}</p>
                            )}
                        </div>
                        <Button
                            type="submit"
                            className="mt-4 bg-green-700 text-white w-full"
                            disabled={mutation.isPending}
                        >
                            {mutation.isPending ? 'Signing Up...' : 'Sign Up'}
                        </Button>
                        {mutation.isError && (
                            <p className="mt-4 text-red-500">Signup failed: {mutation.error?.message}</p>
                        )}
                        {mutation.isSuccess && (
                            <p className="mt-4 text-green-500">Signup successful!</p>
                        )}
                    </form>
                </FormProvider>
                <div className="flex flex-row w-full py-4 gap-4">
                    <span>Already have an account?</span>
                    <Link to="/login" className="font-bold underline">Login</Link>
                </div>
            </div>
        </div>
  )
};

export default SignupPage;
