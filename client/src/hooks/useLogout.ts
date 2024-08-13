import { logout } from "@/api/users";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";


const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
        console.log('Logout Successful');
        toast.success('You have logged out successfully');
    },
    onError: (error: Error) => {
        console.error('Logout failed', error.message);
        toast.error(`Logout failed: ${error.message}`);
    },
  });
};

export default useLogout;