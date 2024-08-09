import { CookingPot, LogIn, Pizza, Settings  } from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import { useAuth } from "@/contexts/AuthContext";

const MobileNav: React.FC = () => {
    const { user, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    if(loading) {
        return <div>Loading...</div>
    }
    const handleLoginClick = () => {
        if(!isAuthenticated) {
            navigate('/login');
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
            <SheetDescription className="flex flex-col gap-10 items-center">
                {isAuthenticated ? (<div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-5 items-center">
                    <img src={user?.profilePic} alt="" className="w-6 h-6 rounded-full object-cover" />
                    <span className="font-bold text-[#F8F6F2]">{user?.username}</span>
                    </div>
                    <span className="flex flex-row gap-5 items-center">
                        <Link to="/"><Pizza className="w-6 h-6 text-[#F8F6F2]"/></Link>
                        <Link to='/' className="font-bold text-[#F8F6F2]">Order status</Link>
                    </span>
                    {/* Edit Profile */}
                    <span className="flex flex-row gap-5 items-center">
                    <Link to="/"><Settings className="w-6 h-6 text-[#F8F6F2]"/></Link>
                    <Link to="" className="font-bold text-[#F8F6F2]">Profile</Link>
                    </span>      
                </div>) : (
                    <Button variant='ghost' className="font-bold border-none outline-none" onClick={handleLoginClick}>
                        <LogIn  className="w-6 h-6 text-[#F8F6F2]" />
                    </Button>
                )}
               
            </SheetDescription>
        </SheetContent>
    </Sheet>
  )
};

export default MobileNav;