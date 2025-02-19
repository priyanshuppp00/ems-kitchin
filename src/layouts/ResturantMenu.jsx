/* eslint-disable no-unsafe-optional-chaining */
import { useParams } from "react-router-dom";
import { CDN_URL, MENU_TYPE } from "../utils/contants";
import { useState } from "react";
import MenuShimmer from "../components/Shimmer/MenuShimmer";
import useResturantMenu from "../hooks/useResturantMenu";
import star from "../assets/star.svg";
import yellowstar from "../assets/yellowstar.svg";
import RestaurantCategory from "./RestaurantCategory";
import rupee from "../assets/rupee.svg";
import time from "../assets/time.svg";
import { useTheme } from "../context/ThemeContext";

const ResturantMenu = () => {
  const { isDarkMode } = useTheme();
  const { resId } = useParams();
  const [showIndex, setShowIndex] = useState(null);

  const resInfo = useResturantMenu(resId);

  if (!resInfo) return <MenuShimmer />;

  const {
    name,
    cuisines,
    avgRating,
    costForTwoMessage,
    locality,
    totalRatingsString,
    cloudinaryImageId,
  } = resInfo?.data?.cards[2]?.card?.card?.info;

  const { slaString, lastMileTravelString } =
    resInfo?.data?.cards?.[2]?.card?.card?.info?.sla;

  const categories =
    resInfo?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) => c.card?.card?.["@type"] === MENU_TYPE
    );

  return (
    <div
      className={`max-w-3xl p-4 mx-auto pb-20  ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      } 
    `}
    >
      {/* Restaurant Details */}
      <div
        className={`flex flex-col gap-5 p-6 rounded-lg shadow-lg mt-28 md:flex-row 
    `}
      >
        <img
          className="object-cover w-32 h-32 border rounded-lg"
          src={CDN_URL + cloudinaryImageId}
          alt={name}
        />
        <div className="flex-1">
          <h1 className="text-2xl font-bold ">{name}</h1>
          <p className="mt-1">{cuisines.join(", ")}</p>
          <p className="mt-2 text-sm ">
            {locality}, {lastMileTravelString}
          </p>
        </div>
        <div className="text-center">
          <div className="flex items-center justify-center gap-1.5">
            <img
              src={avgRating >= 4 ? star : yellowstar}
              alt="Rating Star"
              className="w-6 h-6"
            />
            <p
              className={`font-bold text-lg ${
                avgRating >= 4 ? "text-green-600" : "text-yellow-600"
              }`}
            >
              {avgRating}
            </p>
          </div>
          <p className="mt-1 text-xs">{totalRatingsString}</p>
        </div>
      </div>

      {/* Cost & Time */}
      <div className={`flex justify-between p-4 mt-4 rounded-lg `}>
        <p className="flex items-center gap-2 ">
          <img src={time} alt="Time" className="w-5 h-5" /> {slaString}
        </p>
        <p className="flex items-center gap-2">
          <img src={rupee} alt="Rupee" className="w-5 h-5" />{" "}
          {costForTwoMessage}
        </p>
      </div>

      {/* Menu Categories */}
      <div
        className={`mt-6 space-y-6
    `}
      >
        {categories.map((category, index) => (
          <div key={index} className="rounded-lg shadow-sm ">
            <RestaurantCategory
              data={category?.card?.card}
              showItems={index === showIndex}
              onClick={() => setShowIndex(index === showIndex ? null : index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResturantMenu;
