import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideNotification } from "../../utils/notificationSlice";
import { useTheme } from "../../context/ThemeContext";

const Notification = () => {
  const dispatch = useDispatch();
  const { isDarkMode } = useTheme();
  const { message, type, visible } = useSelector((state) => state.notification);

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        dispatch(hideNotification());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [visible, dispatch]);

  if (!visible) return null;

  const getColorClasses = () => {
    switch (type) {
      case "success":
        return "bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "info":
        return "bg-blue-500 text-white";
      default:
        return isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-black";
    }
  };

  return (
    <div
      className={`fixed top-16 left-1/2 transform -translate-x-1/2 items-center p-4 rounded-md shadow-lg animate-fade-in ${getColorClasses()} w-11/12 max-w-md text-center z-50`}
    >
      {message}
    </div>
  );
};

export default Notification;
