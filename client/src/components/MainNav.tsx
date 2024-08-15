import React from "react";
import { Button } from "./ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Link, useNavigate} from "react-router-dom";
import useLogout from "@/hooks/useLogout";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuTrigger } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


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
            <Link to="/dashboard/orders" className="font-bold">
              Order Status
            </Link>
          </Button>
          <span className="font-bold text-white">{user?.username}</span>
          <img src={user?.profilePic} alt="profile-picture" className="w-10 h-10 rounded-full object-cover" />
          <NavigationMenu className={cn("list-none mx-0 right-0")}>
            <NavigationMenuItem className={cn("mr-4 ")}>
              <NavigationMenuTrigger className={cn("outline-none border-none bg-transparent text-white ")}></NavigationMenuTrigger>
              <NavigationMenuContent className={cn("flex flex-col gap-3 p-4 border-none outline-none")}>
                <NavigationMenuLink className={cn("hover:bg-[#F4FADB] p-2 rounded-md")}>
                  <Link to='/dashboard' className="">Dashboard</Link>
                </NavigationMenuLink>
                <NavigationMenuLink className={cn("hover:bg-[#F4FADB] p-2 rounded-md")}>
                  <Link to='/dashboard/profile' className="">Profile</Link>
                </NavigationMenuLink>
                <NavigationMenuLink className={cn("hover:bg-[#F4FADB] p-2 rounded-md")}>
                  <Link to='/dashboard/restaurants'>Restaurants</Link>
                </NavigationMenuLink>
                <NavigationMenuLink className={cn("hover:bg-[#F4FADB] p-2 rounded-md")}>
                  <Link to='' onClick={handleLogout}>
                    {isPending ? 'Logging out...' : 'Logout'}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenu>
       
        </div>
      ) : (<Button variant="outline" className="font-bold rounded-full z-100 p-4 text-1xl" onClick={handleLoginClick}>
        LOGIN
    </Button>)}
    </div>

    
  )
}

export default MainNav;
