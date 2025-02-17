/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import emptyCartImage from "../assets/EmptyCart.svg";
import deleteItemIcon from "../assets/delete.svg";
import { CDN_URL } from "../utils/contants";
import { addItems, deleteItem, removeItems } from "../utils/cartSlice";
import { applyCoupon, clearCoupon } from "../utils/couponSlice";
import { Toaster, toast } from "sonner";
import { useState, useMemo, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const CartItem = ({ item }) => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();

  const handleRemoveItem = () => {
    dispatch(removeItems(item));
    dispatch(clearCoupon());
  };

  const handleAddItem = () => {
    dispatch(addItems(item));
  };

  const handleDeleteItem = (item) => {
    toast.success("Item removed from cart");
    dispatch(clearCoupon());
    dispatch(deleteItem(item));
  };

  return (
    <div
      className={`flex flex-col p-4 border rounded-lg shadow-md ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-100 text-black"
      }`}
    >
      <div className="flex items-center">
        <img
          src={CDN_URL + item.card.info.imageId}
          alt="dish"
          className="object-cover w-24 h-24 rounded"
        />
        <div className="ml-4">
          <h3 className="text-lg font-semibold">{item.card.info.name}</h3>
          <p className="">₹{(item.card.info.price * item.quantity) / 100}</p>
          <p className="text-sm">{item.card.info.description}</p>
        </div>
      </div>
      <div className="flex items-center justify-between mt-2">
        <div className="flex items-center gap-3 p-2 border rounded-lg">
          <button
            className="p-1 text-red-500 rounded-full hover:bg-red-100 dark:hover:bg-red-700 hover:text-white dark:hover:text-white"
            onClick={() => handleRemoveItem(item)}
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            className="p-1 text-green-500 rounded-full hover:bg-green-100 dark:hover:bg-green-700 hover:text-white dark:hover:text-white"
            onClick={() => handleAddItem(item)}
          >
            +
          </button>
        </div>
        <img
          className="w-6 h-6 cursor-pointer"
          src={deleteItemIcon}
          alt="delete"
          onClick={() => handleDeleteItem(item)}
        />
      </div>
    </div>
  );
};

const Cart = () => {
  const { isDarkMode } = useTheme();
  const cartItems = useSelector((store) => store.cart.items);
  const coupon = useSelector((state) => state.coupon);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Cart items:", cartItems);
  }, [cartItems]);

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setError("Please enter a coupon code");
      toast.error("Please enter a coupon code");
      return;
    }
    if (couponCode !== "SWIGGY") {
      setError("Invalid coupon code");
      toast.error("Invalid coupon code");
      return;
    }
    dispatch(applyCoupon({ code: couponCode }));
    toast.success("Coupon applied successfully!");
    setError("");
  };

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.card.info.price / 100;
      return total + itemPrice * item.quantity;
    }, 0);
  }, [cartItems]);

  const discountedTotal = useMemo(() => {
    const discountAmount = totalPrice * (coupon.discountPercentage / 100);
    return totalPrice - discountAmount;
  }, [totalPrice, coupon]);

  return cartItems.length === 0 ? (
    <div
      className={`flex flex-col items-center justify-center h-full text-center pt-32 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-100 text-black"
      }`}
    >
      <Toaster richColors position="top-right" />
      <img src={emptyCartImage} alt="empty cart" className="w-64 h-64 mb-4" />
      <h3 className="mb-2 text-2xl font-semibold">Your Cart is Empty</h3>
      <p className="mb-4">Looks like you haven’t added anything yet.</p>
      <NavLink to="/home" className="pb-10 text-purple-500 hover:underline">
        Explore Restaurants Near You
      </NavLink>
    </div>
  ) : (
    <div
      className={`flex flex-col items-center p-6 space-y-8 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      }`}
    >
      <Toaster richColors position="top-right" />
      <div className="w-full max-w-4xl">
        <h2 className="mb-4 text-2xl font-bold">My Cart</h2>
        <div className="space-y-4">
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
        <div className="p-4 mt-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="mt-2">
            <p className="flex justify-between">
              Item Total<span className="font-semibold">₹{totalPrice}</span>
            </p>
            <p className="flex justify-between">
              Delivery Fee<span className="font-semibold">₹12</span>
            </p>
            <p className="flex justify-between">
              Platform Fee<span className="font-semibold">₹12</span>
            </p>
            <p className="flex justify-between">
              GST Charges<span className="font-semibold">₹12</span>
            </p>
          </div>
          <div className="flex items-center mt-4 space-x-2">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              className="w-1/2 p-2 border rounded"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            />
            <button
              className="w-1/3 p-2 text-white bg-purple-500 rounded hover:bg-purple-800 dark:bg-purple-700 dark:hover:bg-purple-900"
              onClick={handleApplyCoupon}
            >
              Apply
            </button>
          </div>
          <div className="mt-4">
            <p className="flex justify-between">
              Order Total
              <span className="font-semibold">₹{totalPrice + 36}</span>
            </p>
            {couponCode && (
              <p className="font-semibold text-purple-500">
                Discounted Total: ₹{discountedTotal + 36}
              </p>
            )}
          </div>
          <button className="w-full p-2 mt-6 text-white bg-green-500 rounded hover:bg-green-600">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
