import hero from "../assets/bg.png";


const Hero = () => {
  return (
    <div className="w-full max-h-screen overflow-hidden relative">
        <img src={hero} className="w-full h-full object-cover" alt="hero" />
    </div>
  );
}

export default Hero;
