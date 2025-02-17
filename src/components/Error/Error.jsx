import { NavLink } from "react-router-dom";
import { useEffect } from "react";
import anime from "animejs";
import { useTheme } from "../../context/ThemeContext";

const Error = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    anime({
      targets: ".row svg",
      translateY: 10,
      autoplay: true,
      loop: true,
      easing: "easeInOutSine",
      direction: "alternate",
    });

    anime({
      targets: "#zero",
      translateX: 10,
      autoplay: true,
      loop: true,
      easing: "easeInOutSine",
      direction: "alternate",
      scale: [{ value: 1 }, { value: 1.2 }, { value: 1, delay: 250 }],
      rotateY: { value: "+=180", delay: 200 },
    });
  }, []);

  return (
    <div
      className={`error-container w-full min-h-screen flex items-center justify-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="flex flex-col items-center px-6 text-center">
        <svg
          width="100%"
          style={{ maxHeight: "350px" }}
          viewBox="0 0 636 324"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Add your SVG content here */}
        </svg>
        <p className="max-w-lg mt-6 text-lg">
          Looks like this page is taking a 🍔 lunch break. Our chefs are cooking
          up something tasty 🍕elsewhere, head back to the homepage.
        </p>
        <p className="mt-3 text-2xl italic font-semibold">
          We'll be back with a full plate soon! 🍽️
        </p>
        <NavLink
          to="/"
          className="px-5 py-3 mt-6 text-lg font-medium text-white transition duration-300 bg-purple-500 rounded-lg shadow-md hover:scale-105 hover:bg-purple-600"
        >
          Return to Home
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
