import React from "react";
import SidebarNav from "@/components/SidebarNav";
import Topheader from "@/components/Topheader";
import MobileNav from "@/components/MobileNav";

type Props = {
    children: React.ReactNode;
};

const DashLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <div className="flex flex-1">
                <div className="hidden md:block">
                    <SidebarNav  />
                </div>
                
                <div className="flex-1 flex flex-col">
                    <div className="md:hidden bg-[#122D1D] flex flex-row justify-between p-5">
                        <h2 className="text-[#F8F6F2] text-2xl font-title font-bold">ZFood.</h2>
                        <MobileNav />
                    </div>
                    <div className="hidden md:block">
                        <Topheader />
                    </div>
                    
                    <div className="flex-1 p-4">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashLayout;
