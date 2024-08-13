import { getLoggedInUser } from "@/api/users";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { USER_QUERY_KEY } from "@/hooks/queryKeys";
import useDeleteUser from "@/hooks/useDeleteUser";
import useUpdate from "@/hooks/useUpdate";
import { User } from "@/models/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { Eye, EyeOff, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod"


const UpdateUserSchema = z.object({
    username: z.string().min(1, "Username is required").optional(),
    email: z.string().email("Invalid email address").optional(),
    password: z.string().optional(),
    profilePic: z.instanceof(File).optional(),
    address: z.string().min(1, "address is required").optional(),
    city: z.string().min(1, "city is required").optional(),
    country: z.string().min(1, "country is required").optional(),
})

type UpdateFormValues = z.infer<typeof UpdateUserSchema>;

const ProfilePage: React.FC= () => {
    const { data: user, isLoading: userLoading } = useQuery<User>({
        queryKey: USER_QUERY_KEY,
        queryFn: getLoggedInUser,
    });

    const methods = useForm<UpdateFormValues>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: user ? {
            username: user.username,
            email: user.email,
            profilePic: undefined,
            address: user.address,
            city: user.city,
            country: user.country,
        } : {},
    });

    const { register, handleSubmit, reset, setValue ,formState: { errors, isSubmitting }} = methods;
    const { mutate: updatedUser, isPending , isSuccess: isUpdateSuccess , isError: isUpdateError, error} = useUpdate();

    const { mutate: deleteUserMutation, isPending: isDeleting, isError: isDelteError  } = useDeleteUser();

    const [initialData, setInitialData] = useState<UpdateFormValues | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if(user) {
            const userData = {
                username: user.username,
                email: user.email,
                profilePic: undefined,
                address: user.address,
                city: user.city,
                country: user.country,
            };
            setInitialData(userData);
            reset(userData);
        }
    }, [user, reset]);


    const onSubmit: SubmitHandler<UpdateFormValues> = async(data) => {
      if(user) {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
          if(value !== undefined && !(value instanceof File)) {
            formData.append(key, value);
          }
        });
       if(data.profilePic instanceof File) {
        formData.append('profilePic', data.profilePic);
       } 
       updatedUser({ userId: user._id, updates: formData });
       } else {
        toast.error('No user data availabe for update')
      }
    }
    
    const handleCancel = () => {
        if(initialData) {
            methods.reset(initialData);
            toast.info('Updates canceled');
        }
    };

    const handleDelete = () => {
        if(user) {
            deleteUserMutation(user._id);
        }
    };

    useEffect(() => {
        if(isUpdateSuccess) {
            toast.success('Profile updated successfully');
        } 
        if(isUpdateError) {
            toast.error(`Update failed: ${error.message}`);
        }
        if(isPending) return
    }, [isUpdateSuccess, isUpdateError, isPending]);

    if(userLoading) {
        return <div>Loading user data...</div>
    }
    
  return (
    <div className="flex justify-center items-center h-full">
      <div className="p-8 rounded-lg w-full">
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 flex flex-col md:flex-row gap-3 items-center justify-between">
                <Label
                  htmlFor="username"
                  className="flex flex-row gap-3 items-center"
                >
                  <span className="text-sm font-medium text-gray-700 ">Profile picture</span>
                  <img src={user?.profilePic} alt="profile-picture" className="w-12 h-12 rounded-full object-cover" />
                </Label>
                <Input
                  id="profile-picture"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if(e.target.files && e.target.files[0]) {
                      setValue("profilePic", e.target.files[0]);
                    }
                  }}
                  className="mt-1 block w-full md:w-2/3"
                />
                {errors.profilePic && (
                  <p id="profilePic-error" className="text-red-500 text-sm">
                    {errors.profilePic.message}
                  </p>
                )}
              </div>
            <div className="mb-4 flex flex-col md:flex-row gap-3 items-center justify-between">
              <Label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </Label>
              <Input
                id="username"
                type="text"
                {...register("username")}
                className="mt-1 block w-full md:w-2/3"
                aria-invalid={errors.username ? "true" : "false"}
                aria-describedby="username-error"
              />
              {errors.username && (
                <p id="username-errror" className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="mb-4 flex flex-col md:flex-row gap-3 items-center justify-between">
              <Label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="mt-1 block w-full md:w-2/3 "
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby="email-error"
              />
              {errors.email && (
                <p id="email-errror" className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4 flex flex-col md:flex-row gap-3 items-center justify-between">
              <Label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </Label>
              <div className="relative mt-1 block w-full md:w-2/3">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="pr-10 "
                  aria-invalid={errors.password ? "true" : "false"}
                  aria-describedby="password-error"
                />
                <div 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
              {errors.password && (
                <p id="password-error" className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full items-center justify-between">
              <div className="mb-4 flex flex-col md:flex-row gap-3 items-center justify-between w-full">
                <Label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </Label>
                <Input
                  id="address"
                  type="text"
                  {...register("address")}
                  className="mt-1 block"
                  aria-invalid={errors.address ? "true" : "false"}
                  aria-describedby="address-error"
                />
                {errors.address && (
                  <p id="address-errror" className="text-red-500 text-sm">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div className="mb-4 flex flex-col md:flex-row gap-3 items-center justify-between w-full">
                <Label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700"
                >
                  City
                </Label>
                <Input
                  id="city"
                  type="text"
                  {...register("city")}
                  className="mt-1 block"
                  aria-invalid={errors.city ? "true" : "false"}
                  aria-describedby="city-error"
                />
                {errors.city && (
                  <p id="city-errror" className="text-red-500 text-sm">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div className="mb-4 flex flex-col md:flex-row gap-3 items-center justify-between w-full">
                <Label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </Label>
                <Input
                  id="country"
                  type="text"
                  {...register("country")}
                  className="mt-1 block "
                  aria-invalid={errors.country ? "true" : "false"}
                  aria-describedby="country-error"
                />
                {errors.country && (
                  <p id="country-errror" className="text-red-500 text-sm">
                    {errors.country.message}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between w-full">
              <div className="">
                <Button variant="outline" className="mr-5" onClick={handleCancel}>
                  Cancel
                </Button>
                {isSubmitting ? (
                  <LoadingButton />
                ) : (
                  <Button
                    type="submit"
                    className="mt-4 bg-green-700 text-white"
                  >
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                )}
              </div>
              <div className="mt-5">
                <Button
                  variant="destructive"
                  className="text-white gap-2 items-center"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  <Trash2 className="w-5 h-5" />
                  {isDeleting ? 'Deleting...': 'Delete account'}
                </Button>
              
              </div>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}

export default ProfilePage