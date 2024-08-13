import { updateUser } from "@/api/users"
import { User } from "@/models/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { USER_QUERY_KEY } from "@/hooks/queryKeys";



type UpdateUserInput = {
    userId: string;
    updates: FormData;
};


const useUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, UpdateUserInput>({
    mutationFn: ({ userId, updates }) => updateUser(userId, updates),
    onSuccess: (data) => {
        // toast.success('Profile updated successfully');
        console.log('Profile updated successfully');
        queryClient.invalidateQueries({
            queryKey: [...USER_QUERY_KEY, data._id]
        });
    },
    onError: (error) => {
        toast.error(`Update failed: ${error.message}`);
    }
  })
}

export default useUpdate