/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { CDN_URL, ERROR_IMG } from "../utils/contants";
import { addItems, removeItems } from "../utils/cartSlice";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";

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

  const handleAddItem = () => {
    dispatch(addItems(item));
    toast.success(`${item.card.info.name} added to cart`);
  };

  const handleIncrement = () => {
    dispatch(addItems(item));
    toast.success(`${item.card.info.name} quantity increased`);
  };

  const handleDecrement = () => {
    if (quantity > 0) {
      dispatch(removeItems(item));
      toast.success(`${item.card.info.name} quantity decreased`);
    }
  };

  return (
    <div
      className={`flex justify-between p-4 transition-colors border-b border-gray-100  ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      } 
    `}
    >
      <div className="flex-1 pr-4">
        <div className="flex items-center gap-2 mb-1">
          {item.card.info.isVeg ? (
            <span className="text-green-600">🟢</span>
          ) : (
            <span className="text-red-600">🔴</span>
          )}
          {item.card.info.isBestseller && (
            <span className="px-2 py-1 text-xs text-yellow-800 bg-yellow-100 rounded">
              Bestseller
            </span>
          )}
        </div>
        <h4 className="font-semibold ">{item.card.info.name}</h4>
        <p className="mt-1 text-sm ">
          ₹{(item.card.info.defaultPrice || item.card.info.price) / 100}
        </p>
        <p className="mt-2 text-sm ">{item.card.info.description}</p>
        {item.card.info.customizable && (
          <p className="mt-2 text-xs text-green-600">Customizable</p>
        )}
      </div>

      <div className="relative w-32 h-32">
        {item.card.info.imageId && (
          <img
            className="object-cover w-full h-full rounded-lg"
            src={CDN_URL + item.card.info.imageId}
            alt={item.card.info.name}
            onError={handleImageError}
          />
        )}
        <div className="absolute bottom-0 right-0 ">
          {!quantity ? (
            <button
              className={`px-4 py-2 font-bold text-green-600 transition-shadow rounded-lg shadow-md cursor-pointer hover:shadow-lg ${
                isDarkMode
                  ? "bg-gray-900 text-white"
                  : "bg-slate-200 text-black"
              }`}
              onClick={handleAddItem}
            >
              ADD
            </button>
          ) : (
            <div
              className={`flex items-center gap-3 px-3 py-1 rounded-full shadow-md ${
                isDarkMode
                  ? "bg-gray-900 text-white"
                  : "bg-slate-200 text-black"
              }`}
            >
              <button
                className="text-lg font-bold text-red-500 cursor-pointer"
                onClick={handleDecrement}
              >
                -
              </button>
              <span className="font-medium ">{quantity}</span>
              <button
                className="text-lg font-bold text-green-500 cursor-pointer"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ItemList = ({ items }) => {
  return (
    <div className={`divide-y divide-gray-300  `}>
      {items.map((item) => (
        <Item key={item.card.info.id} item={item} />
      ))}
    </div>
  );
};

export default ItemList;
