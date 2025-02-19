import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { RES_API } from "../utils/contants";
import ResturantCard, { topRated } from "./ResturantCard";
import Shimmer from "../components/Shimmer/Shimmer";
import useOnlineStatus from "../hooks/useOnlineStatus";
import NoInternet from "../components/NoInternet/NoInternet";
import { useTheme } from "../context/ThemeContext";

const Body = () => {
  const { isDarkMode } = useTheme();
  const [listOfResturant, setListOfResturant] = useState([]);
  const [filteredResturant, setFilteredResturant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const TopRatedResturant = topRated(ResturantCard);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(RES_API);
      const json = await data.json();
      const restaurants =
        json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];
      setListOfResturant(restaurants);
      setFilteredResturant(restaurants);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const options = [
    { value: "veg", label: "Pure Veg" },
    { value: "nonveg", label: "Non Veg" },
    { value: "ratings45", label: "Rating 4.5+" },
    { value: "ratings35", label: "Ratings 3.5+" },
    { value: "delivery", label: "Fast delivery" },
  ];

  const handleFilter = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    let filteredList = listOfResturant;

    switch (value) {
      case "veg":
        filteredList = listOfResturant.filter((res) => res.info?.veg === true);
        break;
      case "nonveg":
        filteredList = listOfResturant.filter((res) => res.info?.veg !== true);
        break;
      case "ratings45":
        filteredList = listOfResturant.filter(
          (res) => parseFloat(res.info?.avgRatingString) >= 4.5
        );
        break;
      case "ratings35":
        filteredList = listOfResturant.filter(
          (res) =>
            parseFloat(res.info?.avgRatingString) >= 3.5 &&
            parseFloat(res.info?.avgRatingString) < 4.5
        );
        break;
      case "delivery":
        filteredList = listOfResturant.filter(
          (res) =>
            res.info?.sla?.lastMileTravel !== undefined &&
            res.info.sla.lastMileTravel <= 2
        );
        break;
      default:
        filteredList = listOfResturant;
        break;
    }

    setFilteredResturant(filteredList);
  };

  const onlineStatus = useOnlineStatus();

  if (!onlineStatus) return <NoInternet />;

  return (
    <div
      className={`min-h-[calc(100vh-67px)] p-6 md:p-10 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      }`}
    >
      {/* Search & Filter Section */}
      <div className="flex flex-col items-center justify-center gap-4 mb-6 p-14 md:flex-row">
        <input
          className={`w-full p-3 border rounded-lg md:w-1/3 focus:outline-none focus:ring-purple-500 focus:ring-2 ${
            isDarkMode
              ? "bg-gray-900 text-white border-gray-700 "
              : "bg-gray-200 text-black border-gray-300"
          }`}
          type="text"
          placeholder="Enter restaurant name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="w-full p-3 text-purple-500 border border-purple-300 rounded-lg focus:outline-none md:w-1/4"
          value={selectedOption}
          onChange={handleFilter}
        >
          <option value="">Select an option</option>
          {options.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Restaurant Listing */}
      {listOfResturant.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="grid grid-cols-1 gap-6 px-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredResturant
            .filter(
              (item) =>
                searchText.trim() === "" ||
                item.info?.name
                  ?.toLowerCase()
                  ?.includes(searchText.toLowerCase())
            )
            .map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={`resturant/${restaurant.info.id}`}
                className="block transition-transform transform hover:scale-[1.02]"
              >
                <div className="relative overflow-hidden transition-all rounded-lg shadow-lg hover:shadow-[0px_0px_15px_rgba(128,0,128,0.8)] min-h-[250px] h-full flex flex-col ">
                  {restaurant.info?.avgRatingString >= 4 ? (
                    <TopRatedResturant resData={restaurant} />
                  ) : (
                    <ResturantCard resData={restaurant} />
                  )}
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default Body;
