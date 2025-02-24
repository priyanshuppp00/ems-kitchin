import { NavLink } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import { assets } from "../assets/home/asstes";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const HeroLeft = () => {
  const container1 = useRef();
  useGSAP(
    () => {
      gsap.from("#L-text", {
        y: 290,
        duration: 1.4,
        stagger: 0.3,
        opacity: 0,
      });
    },
    { scope: container1 }
  );

  return (
    <div
      ref={container1}
      className="w-full sm:w-[80%] lg:w-[50%] mt-12 px-4 transition duration-300 animate-fadeIn flex flex-col lg:flex-col"
    >
      <p
        id="L-text"
        className="text-sm sm:text-base inline-flex items-center gap-2.5 mb-4 bg-slogan py-1.5 px-2.5 rounded-full"
      >
        <img src={assets.heart} alt="heart image" className="w-5" />
        People Trust Us
      </p>
      <h1
        id="L-text"
        className="relative mb-5 text-3xl font-semibold leading-tight sm:text-5xl"
      >
        We're <span className="text-red-600 text-heading-text">Serious</span>
        For
        <span className="text-red-600 text-heading-text"> Food</span> &
        Delivery.
      </h1>
      <p id="L-text" className="text-base">
        Best cooks and best delivery guys all at your service. Hot tasty food
        will reach you in 60 minutes.
      </p>
      <NavLink
        to="/home"
        className="inline-block p-3 mt-6 text-sm text-white transition duration-300 bg-red-500 rounded-lg shadow-md hover:bg-red-700 hover:scale-105 text-center sm:text-base w-full sm:w-[50%] md:w-[40%] lg:w-[30%] xl:w-[20%]"
      >
        Order Now
      </NavLink>
    </div>
  );
};

const HeroRight = () => {
  const container2 = useRef();
  useGSAP(
    () => {
      gsap.from(".food-img", {
        y: 100,
        duration: 1.3,
        stagger: 0.3,
        opacity: 0,
        ease: "power3.out",
      });
    },
    { scope: container2 }
  );

  return (
    <div
      ref={container2}
      className="relative w-full sm:w-[80%] lg:w-[50%] flex flex-col-reverse lg:flex-row justify-center items-center mt-12"
    >
      <img
        src={assets.hero1}
        alt="hero image"
        className="w-full max-w-[400px] rounded-xl object-cover"
      />
      <img
        src={assets.food1}
        alt="food 1"
        className="food-img absolute top-[25%] left-[10%] translate-x-[-50%] w-[22%] sm:w-[18%] lg:w-[20%] max-w-[100px] rounded-full transition-transform transform hover:scale-110"
      />
      <img
        src={assets.food2}
        alt="food 2"
        className="food-img absolute top-[65%] left-[10%] translate-x-[-50%] w-[22%] sm:w-[18%] lg:w-[20%] max-w-[100px] rounded-full transition-transform transform hover:scale-110"
      />
      <img
        src={assets.food3}
        alt="food 3"
        className="food-img absolute top-[80%] left-[45%] translate-x-[-50%] w-[22%] sm:w-[18%] lg:w-[20%] max-w-[100px] rounded-full transition-transform transform hover:scale-110"
      />
      <img
        src={assets.food4}
        alt="food 4"
        className="food-img absolute top-[35%] right-[10%] w-[22%] sm:w-[18%] lg:w-[20%] max-w-[100px] rounded-full shadow-md transition-transform transform hover:scale-110"
      />
      <img
        src={assets.food6}
        alt="food 6"
        className="food-img absolute top-[-10%] right-[10%] w-[22%] sm:w-[18%] lg:w-[20%] max-w-[100px] rounded-full shadow-md transition-transform transform hover:scale-110"
      />
    </div>
  );
};

const HContainerContent = () => {
  return (
    <div className="flex flex-wrap items-center justify-between w-full px-4 py-8 rounded-lg sm:px-8 lg:px-24">
      <img
        src={assets.hero2}
        alt="hero image 2"
        className="w-full sm:w-[40%] rounded-xl order-2 sm:order-1 mb-4 sm:mb-0"
      />
      <div className="w-full sm:w-[55%] order-1 sm:order-2">
        <h2 className="mb-4 text-xl font-bold sm:text-2xl">
          We are <span className="text-red-600">more</span> than
          <span className="text-red-600">multiple</span> service
        </h2>
        <p className="mb-4 text-sm sm:text-base">
          This is a type of restaurant which typically serves food and drink, in
          addition to light refreshments such as baked goods or snacks.
        </p>
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-3">
            <p className="flex items-center">
              <img src={assets.order} alt="" className="w-5 mr-2" /> Online
              Order
            </p>
            <p className="flex items-center">
              <img src={assets.reservation} alt="" className="w-5 mr-2" />{" "}
              Pre-Reservation
            </p>
            <p className="flex items-center">
              <img src={assets.reservation} alt="" className="w-5 mr-2" /> Super
              Chef
            </p>
          </div>
          <div className="space-y-3">
            <p className="flex items-center">
              <img src={assets.time} alt="" className="w-5 mr-2" /> 24/7 Service
            </p>
            <p className="flex items-center">
              <img src={assets.reservation} alt="" className="w-5 mr-2" />{" "}
              Organized Food Place
            </p>
            <p className="flex items-center">
              <img src={assets.reservation} alt="" className="w-5 mr-2" /> Clean
              Kitchen
            </p>
          </div>
        </div>
        <NavLink
          to="/about"
          className="inline-block p-2 mt-4 text-sm transition duration-300 bg-red-500 rounded-lg text- shadow-m hover:bg-red-700 sm:text-base hover:scale-105"
        >
          About Us
        </NavLink>
      </div>
    </div>
  );
};

const H2ContainerContent = () => (
  <div className="flex flex-wrap items-center justify-center p-8 space-y-6 md:justify-between md:space-y-0">
    <div className="w-full sm:w-[80%] md:w-[50%] text-center md:text-left">
      <h2 className="mb-4 text-xl font-bold sm:text-2xl">
        It’s Now <span className="text-red-600">More Easy</span> to Order by Our
        Mobile <span className="text-red-600">App</span>
      </h2>
      <p className="mb-4 text-sm sm:text-base">
        All you need to do is download one of the best delivery apps, and most
        companies are opting for mobile app development for food delivery.
      </p>
      <div className="flex justify-center md:justify-start gap-x-6">
        <img
          className="w-24 transition-transform sm:w-32 hover:scale-110"
          src={assets.googlestore}
          alt="Google Play Store"
        />
        <img
          className="w-24 transition-transform sm:w-32 hover:scale-110"
          src={assets.appstore}
          alt="App Store"
        />
      </div>
    </div>
    <img
      src={assets.hero3}
      alt="hero 3"
      className="w-full sm:w-[80%] md:w-[40%] rounded-md"
    />
  </div>
);

const Home = () => {
  const { isDarkMode } = useTheme(); // Get isDarkMode from context

  const container = useRef();

  return (
    <div
      ref={container}
      className={`w-full px-4 pt-16 sm:px-8 lg:px-10 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="flex flex-col-reverse flex-wrap items-center justify-between lg:flex-row-reverse">
        <HeroRight />
        <HeroLeft />
        <div className="hidden slider">
          This element is required for GSAP animation
        </div>
      </div>
      <div className="w-full">
        <HContainerContent />
        <H2ContainerContent />
      </div>
    </div>
  );
};

export default Home;
