import { signUp, SignUpCredentials } from "@/api/users";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/models/user";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const useSignUp = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  return useMutation<User, Error, SignUpCredentials>({
    mutationFn: signUp,
    onSuccess: (data) => {
      setUser(data);
      navigate("/dashboard");
      console.log("Signup sucessful", data);
      toast.success("You have created an account successfuly, welcome to ZFood");
    },
    onError: (error) => {
      console.error("Signup failed", error.message);
      toast.error(`Signup failed: ${error.message}`);
    },
  });
};

export default useSignUp;
