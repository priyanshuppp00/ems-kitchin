import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CDN_URL } from "../utils/contants";
import { useDispatch, useSelector } from "react-redux";
import { addItems } from "../utils/cartSlice";
import { Toaster, toast } from "sonner";
import { useTheme } from "../context/ThemeContext";

const RestaurantMenu = () => {
  const { isDarkMode } = useTheme();
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    // Fetch restaurant data
    fetch(`https://api.example.com/restaurants/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setRestaurant(data);
        setMenuItems(data.menu);
      });
  }, [id]);

  const handleAddToCart = (item) => {
    dispatch(addItems(item));
    toast.success("Item added to cart");
  };

  return (
    <div
      className={`restaurant-menu min-h-screen py-8  ${
        isDarkMode ? "bg-gray-800 text-white " : "bg-gray-50 text-black"
      }`}
    >
      {restaurant && (
        <div className="max-w-4xl p-6 mx-auto mb-8 rounded-lg shadow-md restaurant-info">
          <h1 className="text-3xl font-semibold ">{restaurant.name}</h1>
          <img
            src={CDN_URL + restaurant.imageId}
            alt={restaurant.name}
            className="object-cover w-full h-64 mt-4 rounded-lg"
          />
          <p className="mt-4 text-lg">{restaurant.description}</p>
        </div>
      )}
      <div className="grid grid-cols-1 gap-6 px-4 menu-items sm:grid-cols-2 md:grid-cols-3">
        {menuItems.map((item) => (
          <div key={item.id} className="p-4 rounded-lg shadow-lg menu-item">
            <h2 className="text-xl font-medium menu-item-name">{item.name}</h2>
            <p className="text-lg menu-item-price">₹{item.price / 100}</p>
            <button
              onClick={() => handleAddToCart(item)}
              className="w-full p-2 mt-4 font-semibold text-white transition-all duration-200 bg-purple-500 rounded-lg hover:bg-purple-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
      <Toaster richColors position="top-right" />
    </div>
  );
};

export default RestaurantMenu;
