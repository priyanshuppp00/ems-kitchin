import { useTheme } from "../../context/ThemeContext";

const MenuShimmer = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`main-menu-container min-h-[calc(100svh-67px)] p-4 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-slate-200 text-black"
      }`}
    >
      <div className="menu-container animate-pulse">
        <div className="flex gap-5 res-detail">
          {/* Restaurant details placeholder */}
          <div className="h-[120px] w-[120p rounded-lg"></div>
          <div className="flex flex-col gap-3 mt-5">
            <h1 className="rounded-lg h w-36"></h1>
            <p className="rounded-lg h w-52"></p>
            <span className="rounded-lg h w-52"></span>
            <span className="rounded-lg h w-52"></span>
          </div>
        </div>
        <div className="w-20 rounded-lg h- restaurant-rating"></div>

        {/* Costs placeholder */}
        <div className="flex gap-3 mt-4 restaurant-costs">
          <p className="w-12 rounded-lg h"></p>
          <p className="w-12 rounded-lg h"></p>
        </div>

        {/* Category placeholder */}
        <div className="h-4 rounded-lg mt restaurant-category w-52"></div>

        {/* Category details placeholders */}
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between pb-8 mb-4 category-details animate-pulse"
          >
            <div className="flex flex-col gap-4 mt-6 cat-det">
              <h1 className="rounded-lg h w-96"></h1>
              <p className="h rounded-lg w-[550px]"></p>
              <p className="h rounded-lg w-[550px]"></p>
              <p className="h rounded-lg w-[550px]"></p>
            </div>
            <div className="rounded-lg w-28 h-28 dish-img"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuShimmer;
