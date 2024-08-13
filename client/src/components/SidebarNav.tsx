import {
  ChevronFirst,
  ChevronLast,
  HomeIcon,
  LogOutIcon,
  Pizza,
  Store,
  UserRound,
} from "lucide-react";
import { Button } from "./ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

const SidebarNav = () => {
  const [expanded, setExpanded] = useState(true);
  // const [selectedSection, setSelectedSection] = useState<string | null>(null);
  // const navigate = useNavigate();

  // const handleSectionClick = (section: string) => {
  //   setSelectedSection(section);
  //   window.location.hash = `#${section}`;
  // }
  return (
    <aside className="h-screen ">
      <nav className="h-full flex-col bg-[#122D1D] border-r shadow-sm p-4 pb-2 flex justify-between items-center">
        {expanded ? (
          <h2 className="font-title font-bolder text-[#F8F6F2] text-2xl md:text-4xl">
            ZFood.
          </h2>
        ) : (
          <h2 className="font-title font-bolder text-[#F8F6F2] text-2xl md:text-4xl">
            ZF
          </h2>
        )}

        <ul className="flex flex-col gap-10 px-3">
          <NavLink to="/dashboard/home" className={({ isActive }) => 
            `relative items-center py-2 px-3 my-1 cursor-pointer transition-colors flex flex-row gap-3 rounded-md ${isActive ? "bg-[#D9ED7D]" : ""}`}>
            <HomeIcon className="w-7 h-7 text-[#F8F6F2]" />
            {expanded && <span className="font-bold text-xl text-[#F8F6F2]" >Home</span>}
          </NavLink>

          <NavLink to="/dashboard/orders" className={({ isActive }) => 
            `relative items-center py-2 px-3 my-1 cursor-pointer transition-colors flex flex-row gap-3 rounded-md ${isActive ? "bg-[#D9ED7D]" : ""}`}>
            <Pizza className="w-7 h-7 text-[#F8F6F2]" />
            {expanded && <span className="font-bold text-xl text-[#F8F6F2]" >Orders</span>}
          </NavLink>

          <NavLink to="/dashboard/profile" className={({ isActive }) => 
            `relative items-center py-2 px-3 my-1 cursor-pointer transition-colors flex flex-row gap-3 rounded-md ${isActive ? "bg-[#D9ED7D]" : ""}`}>
            <UserRound className="w-7 h-7 text-[#F8F6F2]" />
            {expanded && <span className="font-bold text-xl text-[#F8F6F2]">Profile</span>}
          </NavLink>

          <NavLink to="/dashboard/restaurants" className={({ isActive }) => 
            `relative items-center py-2 px-3 my-1 cursor-pointer transition-colors flex flex-row gap-3 rounded-md ${isActive ? "bg-[#D9ED7D]" : ""}`}>
            <Store className="w-7 h-7 text-[#F8F6F2]" />
            {expanded && <span className="font-bold text-xl text-[#F8F6F2]">Restaurants</span>}
          </NavLink>
        </ul>
        <Button
          onClick={() => setExpanded((curr) => !curr)}
          variant="ghost"
          className="rounded-lg mb-5 text-[#F8F6F2] hover:bg-[#D9ED7D] active:text-[#D9ED7D]"
        >
          {expanded ? (
            <ChevronFirst className="w-7 h-7 " />
          ) : (
            <ChevronLast className="w-7 h-7 " />
          )}
        </Button>
      </nav>
    </aside>
  );
};

export default SidebarNav;
