import { CookingPot, LogIn, LogOutIcon, Pizza, Settings  } from "lucide-react";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import useLogout from "@/hooks/useLogout";

const MobileNav: React.FC = () => {
    const { user, isAuthenticated, loading, signOut } = useAuth();
    const navigate = useNavigate();
    const { isPending } = useLogout();

    if(loading) {
        return <div className="text-white">Loading...</div>
    }
    const handleLoginClick = () => {
        if(!isAuthenticated) {
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
            console.error('Logout error', error);
        }
    }

  return (
    <Sheet >
        <SheetTrigger>
            <CookingPot className="w-8 h-8 text-white z-100 "/>
        </SheetTrigger>
        <SheetContent className="bg-[#122D1D] text-[#F8F6F2] space-y-20 ">
            <SheetTitle className="">
                <span className="font-title text-4xl font-extrabold text-[#F8F6F2] ">ZFood.</span>
            </SheetTitle>
            <SheetDescription className="flex flex-col space-y-7 items-center">
                {isAuthenticated ? (<div className="flex flex-col gap-4 justify-between">
                    <div className="flex flex-row gap-5 items-center">
                        <img src={user?.profilePic} alt="" className="w-6 h-6 rounded-full object-cover" />
                        <span className="font-bold text-[#F8F6F2]">{user?.username}</span>
                    </div>
                    <Button variant='ghost' className="font-bold border-none outline-none flex flex-row gap-5 text-[#F8F6F2] hover:bg-[#D9ED7D]" onClick={() => {navigate('/signup')}}>
                        <Pizza  className="w-6 h-6" />
                        Order status
                    </Button>
                    
                    {/* Edit Profile */}
                    <Button variant='ghost' className="font-bold border-none outline-none flex flex-row gap-5 text-[#F8F6F2] hover:bg-[#D9ED7D]" onClick={() => {navigate('/')}}>
                        <Settings  className="w-6 h-6" />
                        Profile
                    </Button>
                    {/* Logout */}
                    <Button variant='ghost' className="font-bold border-none outline-none flex flex-row gap-5 text-[#F8F6F2] hover:bg-[#D9ED7D]" onClick={handleLogout}>
                        <LogOutIcon  className="w-6 h-6  " />
                        { isPending ? 'Logging out...' :'Logout'}
                    </Button>
                </div>) : (
                    <Button variant='ghost' className="font-bold border-none outline-none flex flex-row gap-5 text-[#F8F6F2] hover:bg-[#D9ED7D]" onClick={handleLoginClick}>
                        <LogIn  className="w-6 h-6  " />
                        Login
                    </Button>
                )}
               
            </SheetDescription>
        </SheetContent>
       
    </Sheet>
  )
};

export default MobileNav;