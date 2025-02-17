/* eslint-disable react/prop-types */
/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/display-name */

import { CDN_URL } from "../utils/contants";
import star from "../assets/star.svg";
import yellowstar from "../assets/yellowstar.svg";
import { useTheme } from "../context/ThemeContext";

const RestaurantCard = ({ resData }) => {
  if (!resData?.info) return null; // Ensure resData exists before rendering
  const { isDarkMode } = useTheme();
  const { name, avgRating, cuisines, cloudinaryImageId, locality, sla } =
    resData.info;
  const { slaString } = sla || {};
  const { header, subHeader } = resData?.info?.aggregatedDiscountInfoV3 || {};
  const discountInfo = header && subHeader ? `${header} ${subHeader}` : "";

  return (
    <div
      className={`overflow-hidden transition-all duration-300 rounded-lg shadow-lg hover:shadow-2xl ${
        isDarkMode ? "bg-gray-800 text-white " : "bg-gray-200 text-black "
      }`}
    >
      {/* Restaurant Image with Discount */}
      <div className="relative">
        <img
          className="object-cover w-full h-56"
          loading="lazy"
          src={CDN_URL + cloudinaryImageId}
          alt={name || "Restaurant Image"}
        />
        {discountInfo && (
          <p className="absolute px-2 py-1 text-xs text-white bg-yellow-500 rounded-md top-2 left-2">
            {discountInfo}
          </p>
        )}
      </div>

      {/* Restaurant Details */}
      <div className="p-4">
        <h3 className="text-xl font-semibold ">{name}</h3>
        <div className="flex items-center mt-2 mb-3">
          <img
            src={avgRating >= 4 ? star : yellowstar}
            alt="Rating Star"
            className="w-5 h-5"
          />
          <h4 className="ml-2 text-lg font-medium text-black">
            {avgRating || "N/A"}
          </h4>
          <span className="mx-2 text-black">|</span>
          <h4 className="text-black">{slaString || "N/A"}</h4>
        </div>
        <p className="text-sm text-black">
          {cuisines?.join(", ") || "Unknown Cuisines"}
        </p>
        <p className="mt-1 text-sm text-black">
          {locality || "Unknown Location"}
        </p>
      </div>
    </div>
  );
};

// Higher-Order Component (HOC) to Add a "Top Rated" Badge
export const withTopRatedBadge = (Component) => {
  return (props) => (
    <div className="relative">
      <div className="absolute top-0 left-0 px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-br-lg">
        Top Rated
      </div>
      <Component {...props} />
    </div>
  );
};

export default RestaurantCard;
