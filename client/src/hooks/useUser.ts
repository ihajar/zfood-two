import { getLoggedInUser } from "@/api/users";
import { User } from "@/models/user";
import { useQuery } from "@tanstack/react-query";


const useUser = () => {
    return useQuery<User, Error>({
        queryKey: ["user"],
        queryFn: getLoggedInUser,
        retry: false,
    });
};

export default useUser; 