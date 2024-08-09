import { useAuth } from "@/contexts/AuthContext";
import useLogout from "@/hooks/useLogout";
import React from "react";
import { useNavigate } from "react-router-dom";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";


const Topheader: React.FC = () => {
  const { user, isAuthenticated, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const { isPending } = useLogout();


  if(loading) {
    return <div>Loading...</div>
  }

  const handleLogout = async() => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error', error);
      
    }
  }
  return (
    <div className="w-full mx-auto py-5 px-10 border-b flex justify-between">
        <div className="">Search Side </div>
        {isAuthenticated ? (
          <div className="flex flex-row justify-between items-center">
            <span className="font-bold px-3">{user?.username}</span>
            <img src={user?.profilePic} alt="" className="w-10 h-10 rounded-full object-cover" />
            <NavigationMenu className={cn("list-none px-0")}>
              <NavigationMenuItem>
                <NavigationMenuTrigger></NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <ul className={cn("select-none outline-none list-none")}>
                    <Button variant="ghost" onClick={handleLogout} disabled={isPending}>
                      {isPending ? 'Logging Out...' : 'Logout'}
                    </Button>
                    </ul>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenu>
          </div>
        ) : ("")}
    </div>
  )
}

export default Topheader;
