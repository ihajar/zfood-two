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
import { Link } from "react-router-dom";
import { useState } from "react";

const SidebarNav = () => {
  const [expanded, setExpanded] = useState(true);

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
          <li className="relative items-center py-2 px-3 my-1 cursor-pointer transition-colors rounded-md active:bg-[#D9ED7D] flex flex-row gap-4">
            <Link to="/">
              <HomeIcon className="w-7 h-7 text-[#F8F6F2] active:text-[#090A0B]" />
            </Link>
            {expanded ? (
              <span className="text-[#F8F6F2] font-bold text-xl active:text-[#090A0B]">
                Back Home
              </span>
            ) : (
              ""
            )}
          </li>

          <li className="relative items-center py-2 px-3 my-1 cursor-pointer transition-colors rounded-md active:bg-[#D9ED7D] flex flex-row gap-4">
            <Link to="">
              <Pizza className="w-7 h-7 text-[#F8F6F2] active:text-[#090A0B]" />
            </Link>
            {expanded ? (
              <span className="text-[#F8F6F2] font-bold text-xl active:text-[#090A0B]">
                My Orders
              </span>
            ) : (
              ""
            )}
          </li>

          <li className="relative items-center py-2 px-3 my-1 cursor-pointer transition-colors rounded-md active:bg-[#D9ED7D] flex flex-row gap-4">
            <Link to="">
              <UserRound className="w-7 h-7 text-[#F8F6F2] active:text-[#090A0B]" />
            </Link>
            {expanded ? (
              <span className="text-[#F8F6F2] font-bold text-xl active:text-[#090A0B]">
                {" "}
                My Profile
              </span>
            ) : (
              ""
            )}
          </li>

          <li className="relative items-center py-2 px-3 my-1 cursor-pointer transition-colors rounded-md active:bg-[#D9ED7D] flex flex-row gap-4">
            <Link to="/">
              <Store className="w-7 h-7 text-[#F8F6F2] active:text-[#090A0B]" />
            </Link>
            {expanded ? (
              <span className="text-[#F8F6F2] font-bold text-xl active:text-[#090A0B]">
                My Restaurants
              </span>
            ) : (
              ""
            )}
          </li>
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
