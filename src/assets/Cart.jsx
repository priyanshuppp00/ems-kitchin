import { useTheme } from "../context/ThemeContext"; // Ensure correct import path

const Cart = () => {
  const { isDarkMode } = useTheme(); // Get dark mode state
  const strokeColor = isDarkMode ? "white" : "black";

  return (
    <div className="flex items-center justify-center">
      <svg
        width="30"
        height="45"
        viewBox="0 0 19 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-all duration-300 hover:stroke-red-600 active:stroke-red-800 hover:scale-110" // Smooth transition, hover & active effect
      >
        <g clipPath="url(#clip0_211_55)">
          <path
            d="M7.12501 18.3333C7.56224 18.3333 7.91668 17.9602 7.91668 17.5C7.91668 17.0398 7.56224 16.6667 7.12501 16.6667C6.68778 16.6667 6.33334 17.0398 6.33334 17.5C6.33334 17.9602 6.68778 18.3333 7.12501 18.3333Z"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.8333 18.3333C16.2705 18.3333 16.625 17.9602 16.625 17.5C16.625 17.0398 16.2705 16.6667 15.8333 16.6667C15.3961 16.6667 15.0417 17.0398 15.0417 17.5C15.0417 17.9602 15.3961 18.3333 15.8333 18.3333Z"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M0.791656 0.833336H3.95832L6.07999 11.9917C6.15238 12.3753 6.35067 12.72 6.64013 12.9653C6.92959 13.2105 7.29179 13.3408 7.66332 13.3333H15.3583C15.7299 13.3408 16.0921 13.2105 16.3815 12.9653C16.671 12.72 16.8693 12.3753 16.9417 11.9917L18.2083 5H4.74999"
            stroke={strokeColor}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_211_55">
            <rect width="19" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
};

export default Cart;
