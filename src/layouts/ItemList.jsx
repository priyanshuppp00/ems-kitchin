/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL, ERROR_IMG } from "../utils/contants";
import { addItems, removeItems } from "../utils/cartSlice";
import { useTheme } from "../context/ThemeContext";

const Item = ({ item }) => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find(
    (cartItem) => cartItem.card.info.id === item.card.info.id
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleImageError = (event) => {
    event.target.src = ERROR_IMG;
  };

  return (
    <div
      className={`flex flex-col p-4 transition-all duration-300 rounded-lg shadow-md${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      } `}
      key={item.card.info.id}
    >
      <div className="mb-4">
        <h4 className="text-lg font-semibold">{item.card.info.name}</h4>
        <p className="">
          ₹{(item.card.info.defaultPrice || item.card.info.price) / 100}
        </p>
        <p className="text-sm t">{item.card.info.description}</p>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center">
          {!quantity ? (
            <button
              className="p-2 text-white transition-colors bg-red-500 rounded-md cursor-pointer hover:bg-red-600"
              onClick={() => dispatch(addItems(item))}
            >
              <p>Add</p>
              <p>+</p>
            </button>
          ) : (
            <div className="flex items-center space-x-2">
              <button
                className="px-4 py-1 text-xl font-extrabold text-white bg-purple-100 rounded-full hover:bg-purple-200"
                onClick={() => dispatch(removeItems(item))}
              >
                -
              </button>
              <span className="text-lg font-semibold ">{quantity}</span>
              <button
                className="px-4 py-1 text-xl font-extrabold text-green-400 bg-green-100 rounded-full dark:bg-green-700 hover:bg-green-200"
                onClick={() => dispatch(addItems(item))}
              >
                +
              </button>
            </div>
          )}
        </div>
        <div className="relative w-24 h-24 overflow-hidden">
          <img
            loading="lazy"
            src={CDN_URL + item.card.info.imageId}
            alt={item.card.info.name}
            className="object-cover w-full h-full"
            onError={handleImageError}
          />
        </div>
      </div>
      <p className="mt-2 text-sm">Customizable</p>
    </div>
  );
};

const ItemList = ({ items }) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      <div className="w-full">
        <div className="space-y-6">
          {items.map((item) => (
            <Item key={item.card.info.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemList;
