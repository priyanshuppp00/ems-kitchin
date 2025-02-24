import { CDN_URL } from "../utils/contants";
import star from "../assets/star.svg";
import yellowstar from "../assets/yellowstar.svg";
import { useTheme } from "../context/ThemeContext";
import rupee from "../assets/rupee.svg";
import time from "../assets/time.svg";

const ResturantCard = ({ resData }) => {
  const { isDarkMode } = useTheme();
  const { name, avgRating, cuisines, cloudinaryImageId, locality, costForTwo } =
    resData?.info;
  const { slaString, lastMileTravel } = resData?.info?.sla;
  const { header, subHeader } = resData?.info?.aggregatedDiscountInfoV3 || {};
  const discountInfo = header && subHeader ? `${header} ${subHeader}` : "";
  const distance = resData?.distance || 0;

  return (
    <div
      className={`flex flex-col h-full overflow-hidden rounded-lg shadow-lg res-card 
    ${isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"} 
    `}
    >
      <div className="relative">
        <img
          loading="lazy"
          src={CDN_URL + cloudinaryImageId}
          className="object-cover w-full h-48"
          alt={name}
        />
        {discountInfo && (
          <p className="absolute px-3 py-1 text-xl font-bold text-white rounded-lg shadow-md bottom-2 left-2 bg-black/50">
            {discountInfo}
          </p>
        )}
      </div>

      <div
        className={`flex flex-col flex-grow p-2 ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-slate-300 text-black"
        }`}
      >
        <h3 className="text-lg font-semibold text-red-400">{name}</h3>

        <div className="flex items-center gap-2 mt-1 font-stretch-200% rating">
          <img
            src={avgRating >= 4 ? star : yellowstar}
            alt="Rating Star"
            className="w-4 h-4"
          />
          <h4 className="text-sm font-semibold">{avgRating}</h4>
          <span className="mx-1 ">•</span>
          <h4 className="text-sm">{slaString}</h4>
        </div>

        <p className="mt-2 text-sm font-extralight">{cuisines.join(", ")}</p>

        <p className="text-sm font-extralight">{locality}</p>

        <div className="flex items-center gap-4 mt-2 text-sm">
          <div className="flex items-center gap-1">
            <img src={rupee} alt="Rupee" className="w-4 h-4" />
            <span>{costForTwo}</span>
          </div>
          <div className="flex items-center gap-1">
            <img src={time} alt="Time" className="w-4 h-4" />
            <span>
              {lastMileTravel} km • {distance} km away
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-3">
          <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-lg cursor-pointer hover:bg-red-700">
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export const topRated = (ResturantCard) => {
  return (props) => (
    <div className="relative h-full top-rated">
      <div className="absolute top-3 right-[-30px] px-10 py-[8px] text-xs text-white bg-gray-700 rounded-br-lg rotate-[40deg] shadow-md z-10">
        Top Rated
      </div>
      <ResturantCard {...props} />
    </div>
  );
};

export default ResturantCard;
