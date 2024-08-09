import pickImage from "../assets/pick.png";
import orderImage from "../assets/delivery.png";
import foodImage from "../assets/food.png";

const HomePage = () => {
  return (
    <div className="flex flex-col gap-12 items-center">
      <div className="bg-[#F8F6F2]/60 backdrop-blur-sm rounded-lg shadow-md p-8 flex flex-col gap-5 text-center mx-20 absolute top-20 md:top-40 w-auto  ">
        <h1 className="text-2xl md:text-5xl font-bold tracking-tight text-[#090A0B]">
          Get the Best Recipes Delivered Instantly
        </h1>
        <span className="text-md md:text-xl">Hungry? We’ve Got You Covered!</span>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10 mx-auto  mt-[50px] md:mt-[0px]">
        <div className="flex flex-col items-center justify-between gap-4 text-center bg-[#F5FBDA] p-7 rounded-3xl">
          <img src={pickImage} alt="" />
          <span className="font-bold text-3xl tracking-tighter">
            Order your food
          </span>
          <span>
          You can just order by clicking on 3 simple steps and you will receive your favorite meals right at your doorstep.
          </span>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 text-center bg-[#F0F9C8] p-5 rounded-3xl">
          <img src={orderImage} alt="" />
          <span className="font-bold text-3xl tracking-tighter">
            Delivery & Pickup
          </span>
          <span>
          Get your food delivered fast and fresh, or choose the pickup option for a quick and convenient way to grab your meal.
          </span>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 text-center bg-[#F5FBDA] p-5 rounded-3xl">
          <img src={foodImage} alt="" />
          <span className="font-bold text-3xl tracking-tighter">
            Delicious recipes
          </span>
          <span>
          Discover a variety of mouth-watering recipes that are sure to satisfy your cravings and delight your taste buds.
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomePage;