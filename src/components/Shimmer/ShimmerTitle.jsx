import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ShimmerTitle = ({
  width = "w-48",
  height = "h-6",
  rounded = "rounded",
}) => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`${width} ${height} ${rounded}  animate-pulse mb-2  ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      } 
    `}
    >
      <div className="w-full h-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-shimmer" />
    </div>
  );
};

export default ShimmerTitle;
