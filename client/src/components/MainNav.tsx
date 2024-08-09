import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate} from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import useLogout from "@/hooks/useLogout";


const MainNav: React.FC = () => {
  const { user, isAuthenticated, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { isPending } = useLogout();


  if(loading) {
    return <div className="text-white">Loading...</div>;
  }

  const handleLoginClick = () => {
    if(!isAuthenticated){
      navigate('/login');
    } else {
      navigate('/');
    }
  }

  const handleLogout = async() => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
  
  return (
    <div className="flex items-center">
      {isAuthenticated ? (
        <div className="flex items-center space-x-4">
          <Button variant="outline" className="p-2 text-sm">
            <Link to="/" className="font-bold">
              Order Status
            </Link>
          </Button>
          <span className="font-bold text-white">{user?.username}</span>
          <img src={user?.profilePic} alt="" className="w-10 h-10 rounded-full object-cover" />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <ChevronDown className="w-6 h-6 text-[#F8F6F2]" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Orders</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout} disabled={isPending}>
                {isPending ? 'Logging out...' : 'Logout'}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ) : (<Button variant="outline" className="font-bold rounded-full z-100 p-4 text-1xl" onClick={handleLoginClick}>
        LOGIN
    </Button>)}
    </div>

    
  )
}

export default MainNav;