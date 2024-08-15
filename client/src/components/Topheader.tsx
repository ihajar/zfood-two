import { useAuth } from "@/contexts/AuthContext";
import useLogout from "@/hooks/useLogout";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { ChevronDown, ChevronUp, LogOut } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


const Topheader: React.FC = () => {
  const { user, isAuthenticated, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { isPending } = useLogout();
  const [expanded, setExpanded] = useState(false);

  if(loading) {
    return <div>Loading...</div>
  }

  const handleLogout = async() => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      // console.error('Logout error', error);
      toast.error(`Log out failed: ${error}`);
    }
  }

  const handleToggle = () => {
    setExpanded((prev) => !prev);
  }
  return (
    <div className="w-full mx-auto py-5 px-10 border-b flex justify-between">
        <div className="">Search Side </div>
        {isAuthenticated ? (
          <div className="flex flex-row justify-between items-center">
            <span className="font-bold px-3">{user?.username}</span>
            <img src={user?.profilePic} alt="profile-picture" className="w-10 h-10 rounded-full object-cover" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" onClick={handleToggle} className="cursor-pointer">
                  {expanded ? (<ChevronUp className="w-5 h-5 transition duration-300" />) : (<ChevronDown className="w-5 h-5 transition duration-300 group-data-[state=close]:rotate-180"/>)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 mr-10">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} disabled={isPending} className="cursor-pointer">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{isPending ? "Logging out..." : "Log out"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : ("")}
        
    </div>
  )
}

export default Topheader;
