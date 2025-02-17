import { useTheme } from "../context/ThemeContext"; // Import useTheme hook

const Grocery = () => {
  const { isDarkMode } = useTheme(); // Get isDarkMode from context

  // This component displays the grocery section

  return (
    <div
      className={`min-h-[calc(100svh-67px)] flex items-center justify-center bg-cover bg-center ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      } `}
      style={{
        backgroundImage: "url('')",
      }}
    >
      <div className="p-6 text-center rounded-lg bg-opacity-60">
        {/* Loading Spinner */}
        <div className="mb-4">
          <svg
            className="w-12 h-12 mx-auto text-purple-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeOpacity="0.2"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 12a8 8 0 0116 0"
            />
          </svg>
        </div>

        {/* Main Message */}
        <h2 className={`mb-4 text-3xl font-bold `} aria-live="polite">
          Please wait... The store is not opened yet.
        </h2>

        {/* Subtext */}
        <p className={`text-lg`} aria-hidden="true">
          We’re working on getting things ready for you. Stay tuned for updates!
        </p>

        {/* Call to Action */}
        <div className="mt-6">
          <button
            className="px-6 py-2 text-white transition duration-300 bg-purple-600 rounded-full cursor-pointer hover:bg-purple-800 hover:scale-105"
            onClick={() => window.location.reload()} // Refresh the page or redirect
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
};

export default Grocery;
