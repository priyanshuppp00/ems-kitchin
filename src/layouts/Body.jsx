import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRestaurantsUrl, DEFAULT_LOCATION } from "../utils/contants";
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
  const [locationSearch, setLocationSearch] = useState("");
  const [userLocation, setUserLocation] = useState(DEFAULT_LOCATION);
  const [locationError, setLocationError] = useState(null);

  const TopRatedResturant = topRated(ResturantCard);

  useEffect(() => {
    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          setLocationError(error.message);
          console.error("Error getting location:", error);
        }
      );
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (userLocation !== DEFAULT_LOCATION) {
      fetchData();
    }
  }, [userLocation]);

  const fetchData = async () => {
    try {
      const url = getRestaurantsUrl(userLocation.lat, userLocation.lng);
      const data = await fetch(url);
      const json = await data.json();
      const restaurants =
        json?.data?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants || [];

      // Add distance to each restaurant
      const restaurantsWithDistance = restaurants.map((restaurant) => {
        const restaurantLocation = restaurant.info?.location || {};
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          restaurantLocation.latitude,
          restaurantLocation.longitude
        );
        return {
          ...restaurant,
          distance: distance.toFixed(1), // Distance in km with 1 decimal
        };
      });

      setListOfResturant(restaurantsWithDistance);
      setFilteredResturant(restaurantsWithDistance);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Haversine formula to calculate distance between two coordinates
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
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
          className={`w-full p-3 border rounded-lg md:w-1/3 focus:outline-none focus:ring-red-400 focus:ring-2 ${
            isDarkMode
              ? "bg-gray-900 text-white border-gray-700 "
              : "bg-gray-200 text-black border-gray-300"
          }`}
          type="text"
          placeholder="Enter location"
          value={locationSearch}
          onChange={(e) => setLocationSearch(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              const filtered = listOfResturant.filter((item) => {
                const locationMatch =
                  item.info?.locality
                    ?.toLowerCase()
                    ?.includes(locationSearch.toLowerCase()) ||
                  item.info?.areaName
                    ?.toLowerCase()
                    ?.includes(locationSearch.toLowerCase());
                return locationMatch;
              });
              setFilteredResturant(filtered);
            }
          }}
        />
        <input
          className={`w-full p-3 border rounded-lg md:w-1/3 focus:outline-none focus:ring-red-400 focus:ring-2 ${
            isDarkMode
              ? "bg-gray-900 text-white border-gray-700 "
              : "bg-gray-200 text-black border-gray-300"
          }`}
          type="text"
          placeholder="Enter restaurant name"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          className="w-full p-3 text-red-400 border border-red-300 rounded-lg focus:outline-none md:w-1/4"
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
            .filter((item) => {
              const matchesSearch =
                searchText.trim() === "" ||
                item.info?.name
                  ?.toLowerCase()
                  ?.includes(searchText.toLowerCase());

              const matchesLocation =
                locationSearch.trim() === "" ||
                item.info?.locality
                  ?.toLowerCase()
                  ?.includes(locationSearch.toLowerCase()) ||
                item.info?.areaName
                  ?.toLowerCase()
                  ?.includes(locationSearch.toLowerCase());

              return matchesSearch && matchesLocation;
            })
            .map((restaurant) => (
              <Link
                key={restaurant.info.id}
                to={`resturant/${restaurant.info.id}`}
                className="block transition-transform transform hover:scale-[1.02]"
              >
                <div className="relative overflow-hidden  text-gray-300 transition-transform duration-300 rounded-md cursor-pointer group bg-gradient-to-r from-slate-600 to-red-800 hover:scale-105 hover:shadow-lg hover:shadow-red-500 w-fitmin-h-[250px] h-full flex flex-col ">
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
