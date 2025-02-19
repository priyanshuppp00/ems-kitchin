/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import emptyCartImage from "../assets/EmptyCart.svg";
import deleteItemIcon from "../assets/delete.svg";
import { CDN_URL } from "../utils/contants";
import { addItems, deleteItem, removeItems } from "../utils/cartSlice";
import { useState, useMemo, useCallback } from "react";
import { applyCoupon, clearCoupon } from "../utils/couponSlice";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const CartItem = ({ item }) => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const toggleDescription = useCallback(() => {
    setShowFullDescription(!showFullDescription);
  }, [showFullDescription]);

  const handleRemoveItem = useCallback(() => {
    dispatch(removeItems(item));
    dispatch(clearCoupon());
  }, [dispatch, item]);

  const handleAddItem = useCallback(() => {
    dispatch(addItems(item));
  }, [dispatch, item]);

  const handleDeleteItem = useCallback(() => {
    toast.success("Item removed from cart", {
      position: "top-center",
      duration: 2000,
      style: {
        margin: "1rem",
        padding: "1rem",
        borderRadius: "0.5rem",
        fontSize: "0.875rem",
        maxWidth: "90%",
        width: "fit-content",
      },
    });
    dispatch(clearCoupon());
    dispatch(deleteItem(item));
  }, [dispatch, item]);

  return (
    <div
      className={`flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 mb-4 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      } w-full  mx-auto`}
    >
      <div className="flex items-center w-full gap-4 sm:w-auto">
        <img
          src={CDN_URL + item.card.info.imageId}
          alt="dish image"
          className="object-cover w-20 h-20 rounded-lg"
        />
        <div className="flex-1">
          <h3 className="text-sm font-semibold sm:text-base">
            {item.card.info.name}
          </h3>
          <p className="text-xs sm:text-sm">
            ₹{(item.card.info.price * item.quantity) / 100}
          </p>
          {item.card.info.description && (
            <p
              className={`text-xs mt-1 cursor-pointer ${
                showFullDescription ? "" : "line-clamp-2"
              }`}
              onClick={toggleDescription}
            >
              {item.card.info.description}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-2 sm:gap-4 sm:mt-0">
        <div className="flex items-center gap-2 px-2 py-1 border rounded-lg">
          <button
            className="p-1 text-xs font-bold text-red-500 cursor-pointer hover:text-red-700 sm:text-base"
            onClick={handleRemoveItem}
          >
            -
          </button>
          <span className="text-sm sm:text-base">{item.quantity}</span>
          <button
            className="p-1 text-xs font-bold text-green-500 cursor-pointer hover:text-green-700 sm:text-base"
            onClick={handleAddItem}
          >
            +
          </button>
        </div>
        <img
          className="w-5 h-5 cursor-pointer sm:w-6 sm:h-6 "
          src={deleteItemIcon}
          alt="delete icon"
          onClick={handleDeleteItem}
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

  const handleApplyCoupon = useCallback(() => {
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
    toast.success("Coupon code applied successfully");
    setError("");
  }, [couponCode, dispatch]);

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => {
      return total + (item.card.info.price / 100) * item.quantity;
    }, 0);
  }, [cartItems]);

  const discountAmount = coupon?.discountPercentage
    ? totalPrice * (coupon.discountPercentage / 100)
    : 0;

  const discountedTotal = totalPrice - discountAmount;

  return cartItems.length === 0 ? (
    <div
      className={`flex flex-col items-center justify-center h-screen text-center px-6 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      }`}
    >
      <Toaster
        richColors
        position="top-center"
        toastOptions={{
          className: "text-center",
          style: {
            margin: "1rem",
            padding: "1rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
            maxWidth: "90%",
            width: "fit-content",
          },
        }}
      />
      <img
        src={emptyCartImage}
        alt="empty cart"
        className="w-48 h-48 mb-4 sm:w-56 sm:h-56 md:w-64 md:h-64"
      />
      <h3 className="text-xl font-semibold sm:text-2xl md:text-3xl">
        Your Cart is Empty
      </h3>
      <p className="max-w-md text-sm sm:text-base md:text-lg">
        Looks like you haven’t added anything to your cart yet.
      </p>
      <NavLink
        to="/home"
        className="px-6 py-4 mt-6 text-lg transition-transform transform bg-purple-600 rounded-lg sm:text-xl md:text-2xl lg:text-3xl hover:bg-purple-800 hover:scale-105"
      >
        Explore Restaurants Near You
      </NavLink>
    </div>
  ) : (
    <div
      className={`p-4 pt-20 pb-24 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      }`}
    >
      <Toaster richColors position="top-right" />
      <div
        className={`max-w-2xl p-6 sm:p-8 md:p-12 mx-auto rounded-lg shadow-md ${
          isDarkMode
            ? "border border-gray-700 shadow-gray-800"
            : "border border-gray-300 shadow-gray-400"
        }`}
      >
        <h2 className="mb-6 text-3xl font-semibold text-center">My Cart</h2>
        <div className={`max-w-3xl p-4 mx-auto`}>
          {cartItems.map((item, index) => (
            <CartItem key={index} item={item} />
          ))}
        </div>
        <div className="p-4 mt-6 rounded-lg shadow-md sm:p-6 overflow-y-auto max-h-[calc(100vh-200px)]">
          <h2 className="mb-4 text-2xl font-semibold">Summary</h2>
          <div className="mb-4 space-y-3">
            <p className="flex justify-between">
              <span>Item Total ({cartItems.length} items)</span>
              <span>₹{totalPrice.toFixed(2)}</span>
            </p>
            <p className="flex justify-between">
              <span>Delivery Partner Fee</span>
              <span>₹12.00</span>
            </p>
            <p className="flex justify-between">
              <span>Platform Fee</span>
              <span>₹12.00</span>
            </p>
            <p className="flex justify-between">
              <span>GST and Restaurant Charges</span>
              <span>₹12.00</span>
            </p>
          </div>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              className={`w-full p-2 border rounded-lg  ${
                isDarkMode
                  ? "bg-gray-900 text-white focus:bg-gray-800"
                  : "bg-gray-200 text-gray-900 focus:bg-white"
              }`}
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
            />
            <button
              className={`px-4 py-2 rounded-lg ${
                couponCode
                  ? "bg-purple-500 hover:bg-purple-700 text-white"
                  : "bg-purple-200 cursor-not-allowed text-gray-700"
              }`}
              onClick={handleApplyCoupon}
              disabled={!couponCode}
            >
              Apply
            </button>
          </div>
          <div className="space-y-3">
            <p className="flex justify-between text-lg font-semibold">
              <span>Order Total</span>
              <span>₹{(totalPrice + 36).toFixed(2)}</span>
            </p>
            {couponCode && (
              <>
                <p className="flex justify-between text-sm text-green-500">
                  <span>Coupon Discount ({coupon.discountPercentage}%)</span>
                  <span>-₹{discountAmount.toFixed(2)}</span>
                </p>
                <p className="flex justify-between text-lg font-semibold text-green-500">
                  <span>Discounted Total</span>
                  <span>₹{(discountedTotal + 36).toFixed(2)}</span>
                </p>
              </>
            )}
          </div>
          <button className="w-full py-2 mt-4 text-white bg-green-500 rounded-lg cursor-pointer hover:bg-green-600">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
