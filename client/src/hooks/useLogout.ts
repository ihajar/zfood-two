import { logout } from "@/api/users";
import { useMutation } from "@tanstack/react-query";


const useLogout = () => {
  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
        console.log('Logout Successful');
    },
    onError: (error: Error) => {
        console.error('Logout failed', error.message);
    },
  });
};

export default useLogout;