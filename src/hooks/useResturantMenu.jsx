import { useEffect, useState } from "react";
import { getMenuUrl, DEFAULT_LOCATION } from "../utils/contants";

const useResturantMenu = (resId, location = DEFAULT_LOCATION) => {
  const [resInfo, setResInfo] = useState(null);

  useEffect(() => {
    fetchData();
  }, [location.lat, location.lng]);

  const fetchData = async () => {
    try {
      const url = getMenuUrl(location.lat, location.lng, resId);
      const data = await fetch(url);
      const json = await data.json();
      setResInfo(json.data);
    } catch (error) {
      console.error("Error fetching menu data:", error);
      setResInfo(null);
    }
  };

  return resInfo;
};

export default useResturantMenu;
