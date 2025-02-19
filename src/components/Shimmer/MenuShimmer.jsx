import { useTheme } from "../../context/ThemeContext";

const MenuShimmer = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`main-menu-container min-h-[calc(100svh-67px)]  ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      } 
    `}
    >
      <div className="menu-container">
        <div className="res-detail">
          <div className="flex gap-5 restaurant-name">
            <div className="h-[120px] w-[120px]"> </div>
            <div className="flex flex-col gap-3 mt-5">
              <h1 className="h-4 rounded-lg w-36"></h1>
              <p className="h-2 rounded-lg w-52"></p>
              <span className="h-2 rounded-lg w-52"></span>
              <span className="h-2 rounded-lg w-52"></span>
            </div>
          </div>
          <div className="w-20 h-20 rounded-lg restaurant-rating"></div>
        </div>
        <div className="flex gap-3 restaurant-costs">
          <p className="w-12 h-3 rounded-lg"></p>
          <p className="w-12 h-3 rounded-lg"></p>
        </div>
        <div className="h-4 mt-6 rounded-lg restaurant-category w-52"></div>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="flex justify-between pb-8 mb-4 category-details"
          >
            <div className="flex flex-col gap-4 mt-6 cat-det">
              <h1 className="h-4 rounded-lg w-96"></h1>
              <p className="h-2 rounded-lg w-[550px]"></p>
              <p className="h-2 rounded-lg w-[550px]"></p>
              <p className="h-2 rounded-lg w-[550px]"></p>
            </div>
            <div className="rounded-lg dish-img w-28 h-28"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuShimmer;
