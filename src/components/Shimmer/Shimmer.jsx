import { useTheme } from "../../context/ThemeContext";

const Shimmer = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`animate-pulse ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      } 
    `}
    >
      {[...Array(10)].map((_, index) => (
        <div
          key={index}
          className="flex justify-between p-4 border-b border-gray-100"
        >
          <div className="flex-1 pr-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-4 h-4 rounded-full"></div>
              <div className="w-16 h-4 rounded"></div>
            </div>
            <div className="w-3/4 h-5 mb-3 rounded"></div>
            <div className="w-1/2 h-4 mb-3 rounded"></div>
            <div className="w-full h-3 mb-2 rounded"></div>
            <div className="w-3/4 h-3 rounded"></div>
          </div>
          <div className="relative w-32 h-32">
            <div className="absolute inset-0 rounded-lg"></div>
            <div className="absolute bottom-0 right-0">
              <div className="w-20 h-8 rounded-lg"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
