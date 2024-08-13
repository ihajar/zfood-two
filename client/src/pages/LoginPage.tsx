import React from "react";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/users";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/models/user";
import useUser from "@/hooks/useUser";
import { useAuth } from "@/contexts/AuthContext";
import LoadingButton from "@/components/LoadingButton";
import { toast } from "sonner";



const loginSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const { setUser } = useAuth();
    
    const methods = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    const { register, handleSubmit, formState: {errors, isSubmitting}} = methods;

    // Use useMutation for handling login
    const mutation = useMutation<User, Error, LoginFormValues>({
        mutationFn: (data: LoginFormValues) => login(data),
        onSuccess: (data) => {
            setUser(data);
            navigate('/dashboard');
            console.log('Login Sucessful');
            toast.success('Login successful');
        },
        onError: (err: any) => {
            console.error('Login failed:', err.message);
            toast.error(`Login failed: ${err.message}`);
        }
    });

    const onSubmit: SubmitHandler<LoginFormValues> = (data) => {
        mutation.mutate(data);
    };

    const { data: user, isLoading: userLoading } = useUser();

    if(userLoading) {
      return <div>Loading user data...</div>;
    }
    if(user) {
      navigate('/dashboard');
      return null;
    }
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#122D1D]">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          {/* Wrap form fields with FormProvider */}
          <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Username
                </label>
                <Input
                  id="username"
                  type="text"
                  {...register("username")}
                  className="mt-1 block w-full"
                  aria-invalid={errors.username ? "true" : "false"}
                  aria-describedby="username-error"
                />{" "}
                {errors.username && (
                  <p id="username-error" className="text-red-500 text-sm">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                {" "}
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <Input
                  id="password"
                  type="password"
                  {...register("password")}
                  className="mt-1 block w-full"
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby="password-error"
                />
                {errors.password && (
                  <p id="password-error" className="text-red-500 text-sm">
                    {errors.password.message}
                  </p>
                )}
              </div>
             {mutation.isPending ? <LoadingButton/> : <Button
                type="submit"
                className="mt-4 bg-green-700 text-white w-full"
                disabled={isSubmitting || mutation.isPending}
              >
                {mutation.isPending ? 'Logging in ...' : 'Login'}
              </Button>}
              {mutation.isError && (
                <p className="mt-4 text-red-500">
                  Login failed: {mutation.error?.message}
                </p>
              )}
              {mutation.isSuccess && (
                <p className="mt-4 text-green-500">Login successful!</p>
              )}
            </form>
          </FormProvider>
          <div className="flex flex-row w-full py-4 gap-4">
            <span>Don't have an account?</span>
            <Link to="/signup" className="font-bold underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
};

export default LoginPage;

