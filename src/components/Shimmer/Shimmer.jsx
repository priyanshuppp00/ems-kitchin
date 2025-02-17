import { ShimmerThumbnail, ShimmerTitle } from "react-shimmer-effects";
import { useTheme } from "../../context/ThemeContext";

const Shimmer = () => {
  const { isDarkMode } = useTheme();
  return (
    <div
      className={`grid grid-cols-1 gap-6 p-4 shimmer-container md:grid-cols-2 lg:grid-cols-3 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-slate-200 text-black"
      }`}
    >
      {[...Array(10)].map((_, index) => (
        <div key={index} className="p-4 rounded-lg shadow-lg shimmer-cards">
          <ShimmerThumbnail
            height={200}
            width={270}
            rounded
            className="mb-4 shimmer-thumb"
          />
          <ShimmerTitle
            line={3}
            gap={10}
            variant="secondary"
            className="shimmer-title"
          />
        </div>
      ))}
    </div>
  );
};

export default Shimmer;
