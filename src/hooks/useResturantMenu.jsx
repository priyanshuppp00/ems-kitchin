import useResturantMenu from "../hooks/useResturantMenu";
import { useTheme } from "../../context/ThemeContext";

const RestaurantMenu = ({ resId }) => {
  const { isDarkMode } = useTheme();
  const { resInfo, isLoading, error } = useResturantMenu(resId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div
      className={`max-w-4xl p-4 mx-auto menu-container ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-slate-200 text-black"
      }`}
    >
      <h2 className="mb-6 text-2xl font-semibold text-center">Menu</h2>
      <ul className="space-y-4">
        {resInfo?.map((item) => (
          <li
            key={item.id}
            className="p-4 border-b border-gray-200 rounded-lg shadow-sm"
          >
            <h3 className="text-xl font-medium">{item.name}</h3>
            <p className="">{item.description}</p>
            <p className="mt-2 text-lg font-semibold">${item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RestaurantMenu;
