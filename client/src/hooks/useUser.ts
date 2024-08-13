import { getLoggedInUser } from "@/api/users";
import { User } from "@/models/user";
import { useQuery } from "@tanstack/react-query";
import { USER_QUERY_KEY } from "./queryKeys";



const useUser = () => {
    return useQuery<User, Error>({
        queryKey: [USER_QUERY_KEY],
        queryFn: getLoggedInUser,
        retry: false,
    });
}; 

export default useUser; 