import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Toaster } from "sonner";
import { useTheme } from "../context/ThemeContext"; // Import theme context

const Body = () => {
  const { isDarkMode } = useTheme();
  const dispatch = useDispatch();
  const data = useSelector((store) => store.data.items);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  return (
    <div
      className={`min-h-[calc(100svh-67px)] p-6 transition-colors duration-300 ${
        isDarkMode ? "bg-gray-800 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <Toaster richColors position="top-right" />

      <h1 className="mb-6 text-3xl font-bold text-center">Menu</h1>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {data.map((item) => (
          <div
            key={item.id}
            className="p-4 text-center transition-transform transform bg-white rounded-lg shadow-lg dark:bg-gray-900 dark:text-white hover:scale-105"
          >
            <h2 className="mb-2 text-xl font-semibold">{item.name}</h2>
            <p className="text-lg">₹{(item.price / 100).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Body;
