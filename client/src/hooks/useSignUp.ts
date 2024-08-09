import { signUp, SignUpCredentials } from "@/api/users";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/models/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useSignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation<User, Error, SignUpCredentials>({
    mutationFn: signUp,
    onSuccess: (data) => {
      setUser(data);
      navigate("/");
      console.log("Signup sucessful", data);
    },
    onError: (error) => {
      console.error("Signup failed", error.message);
    },
  });
};

export default useSignUp;
