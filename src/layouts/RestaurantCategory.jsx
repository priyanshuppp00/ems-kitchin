/* eslint-disable react/prop-types */

import ItemList from "./ItemList";
import { CDN_URL } from "../utils/contants";
import { useTheme } from "../context/ThemeContext";

const Icon = ({ open }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className={`${
        open ? "rotate-180" : ""
      } h-5 w-5 transition-all duration-300 ease-in-out`}
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
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`overflow-hidden rounded-lg shadow-sm  ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      } 
    `}
    >
      <div className="p-4">
        <div
          className="flex items-center justify-between cursor-pointer"
          onClick={onClick}
        >
          <div className="flex items-center gap-4">
            {data.imageId && (
              <img
                src={CDN_URL + data.imageId}
                alt={data.title}
                className="object-cover w-12 h-12 rounded-lg"
              />
            )}
            <div>
              <h3 className="text-lg font-bold ">
                {data.title} ({data.itemCards.length})
              </h3>
              {data.description && (
                <p className="mt-1 text-sm ">{data.description}</p>
              )}
            </div>
          </div>
          <span className="">
            <Icon open={showItems} />
          </span>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out ${
            showItems ? "mt-4" : "mt-0"
          }`}
        >
          {showItems && <ItemList items={data.itemCards} />}
        </div>
      </div>
      <div className="border-b border-gray-100"></div>
    </div>
  );
};

export default RestaurantCategory;
