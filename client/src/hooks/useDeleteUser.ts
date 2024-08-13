import { deleteUser } from "@/api/users";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useDeleteUser = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (userId: string) => deleteUser(userId),
        onSuccess: () => {
            toast.success('User deleted completely');
            navigate('/login');
        },
        onError: (error: Error) => {
            toast.error(`Delete failed: ${error.message}`);
        }
    })
};

export default useDeleteUser;