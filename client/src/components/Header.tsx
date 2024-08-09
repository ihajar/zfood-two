import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";
import { useEffect, useState } from "react";

const Header = () => {
    const [navbar, setNavbar] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setNavbar(window.scrollY > 40)
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll)
    }, []);

  return (
    <div className={`fixed top-0 left-0 w-full z-10 py-6  transition-colors duration-300 ${navbar ? 'bg-[#122D1D]/70 backdrop-blur-md' : 'bg-[#122D1D]/10 backdrop-blur-md'}`}>
        <div className="container mx-auto flex justify-between items-center " >
            <Link to="/" className="text-4xl font-title font-bold tracking-tight text-white">
                ZFood.
            </Link>
            <div className="md:hidden">
                <MobileNav />
            </div>
            <div className="hidden md:block">
                <MainNav />
            </div>
        </div>
    </div>
  )
}

export default Header;