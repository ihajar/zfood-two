import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

type Props = {
  children: React.ReactNode;
};

function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen !bg-[#D9ED7D] ">
      <div className="relative w-full ">
        <Header />
        <Hero />
      </div>
      <div className="container mx-auto flex-1 py-10  z-0">
        {children}
      </div>
      <Footer />
    </div>
  );
}

export default Layout;