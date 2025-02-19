import React from "react";
import { useTheme } from "../../context/ThemeContext";

const ShimmerThumbnail = ({
  width = "w-10",
  height = "h-48",
  rounded = "rounded-lg",
}) => {
  const { isDarkMode } = useTheme(); // Corrected placement

  return (
    <div
      className={`${width} ${height} ${rounded} animate-pulse 
        ${isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"}
    `}
    >
      <div className="w-full h-full bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 animate-shimmer" />
    </div>
  );
};

export default ShimmerThumbnail;
