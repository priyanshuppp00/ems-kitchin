import nointernet from "../../assets/NoConnection.svg";
import { useTheme } from "../../context/ThemeContext";

const NoInternet = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen p-4 text-center${
        isDarkMode ? "bg-gray-950 text-white" : "bg-slate-200 text-black"
      }`}
    >
      <img
        src={nointernet}
        alt="No internet connection"
        className="w-48 h-auto mb-4"
      />
      <div>
        <h3 className="mb-3 text-2xl font-semibold">Lost Connection</h3>
        <p className="text-lg">
          Whoops, no internet connection found. Please check your connection.
        </p>
      </div>
    </div>
  );
};

export default NoInternet;
