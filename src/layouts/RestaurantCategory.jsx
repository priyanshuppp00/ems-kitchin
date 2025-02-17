/* eslint-disable react/prop-types */
import { useTheme } from "next-themes"; // Using theme context
import ItemList from "./ItemList";

const Icon = ({ open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`h-5 w-5 transform transition-transform duration-300 ease-in-out ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 8.25l-7.5 7.5-7.5-7.5"
      />
    </svg>
  );
};

const RestaurantCategory = ({ data, showItems, onClick }) => {
  const { isDarkMode } = useTheme(); // Get the current theme

  return (
    <div
      className={`mb-8 border-b ${
        isDarkMode ? "bg-gray-900 text-white " : "bg-gray-200 text-black "
      }`}
    >
      <button
        className={`flex items-center justify-between w-full p-3 mt-4 mb-4 transition-all duration-200 rounded-md 
        `}
        onClick={onClick}
        aria-expanded={showItems}
      >
        <span className="text-lg font-bold">
          {data.title} ({data.itemCards.length})
        </span>
        <Icon open={showItems} />
      </button>
      {showItems && <ItemList items={data.itemCards} />}
      <div className="border-b-8 border-gray-800 mb-7"></div>
    </div>
  );
};

export default RestaurantCategory;
