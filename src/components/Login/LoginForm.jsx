import { signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { auth } from "../../utils/firebase";
import { useTheme } from "../../context/ThemeContext";

const LoginForm = () => {
  const { isDarkMode } = useTheme();
  const email = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    setEmailError("");

    if (!validateEmail(email.current.value)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => {
        navigate("/");
      })
      .catch((error) => {
        let errorMessage = "Login failed. Please try again.";
        switch (error.code) {
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/user-disabled":
            errorMessage = "This account has been disabled.";
            break;
          case "auth/user-not-found":
            errorMessage = "No account found with this email.";
            break;
          case "auth/wrong-password":
            errorMessage = "Incorrect password.";
            break;
          case "auth/too-many-requests":
            errorMessage = "Too many attempts. Try again later.";
            break;
          default:
            errorMessage = "Login failed. Please try again.";
        }
        setError(errorMessage);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="w-full max-w-md p-8 transition-all duration-300 rounded-lg animate-fade-in">
      <h2 className="pt-3 text-3xl font-bold text-center ">Sign In</h2>
      <p className="pt-2 text-center">Welcome back! Please login.</p>

      {error && (
        <div className="flex items-center p-3 mt-2 text-sm text-red-600 rounded-md dark:text-red-500 bg-red-50 dark:bg-red-900/20 animate-shake">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleLoginSubmit} className="mt-6">
        <div className="relative mb-4 group">
          <i className="absolute text-gray-500 transition-colors fas fa-user left-3 top-3 dark:text-gray-400 group-focus-within:text-red-400"></i>
          <input
            ref={email}
            type="email"
            placeholder="Enter your email"
            className={`w-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-red-400 rounded-md outline-none ${
              isDarkMode
                ? "bg-gray-900 text-white focus:bg-gray-800"
                : "bg-gray-200 text-gray-900 focus:bg-white"
            } ${emailError ? "border border-red-500" : ""}`}
            required
            onChange={() => setEmailError("")}
          />
          {emailError && (
            <p className="mt-1 text-sm text-red-400">{emailError}</p>
          )}
        </div>

        <div className="relative mb-4 group">
          <i className="absolute text-gray-500 transition-colors fas fa-lock left-3 top-3 dark:text-gray-400 group-focus-within:text-red-400"></i>
          <input
            ref={password}
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            className={`w-full py-2 pl-10 pr-12 focus:ring-2 focus:ring-red-400 rounded-md outline-none ${
              isDarkMode
                ? "bg-gray-900 text-white focus:bg-gray-800"
                : "bg-gray-200 text-gray-900 focus:bg-white"
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-gray-500 right-3 top-3 hover:text-red-400"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full py-2 mt-4 text-white rounded-md cursor-pointer hover:scale-[1.02] active:scale-95 bg-red-500 hover:bg-red-700 shadow-md hover:shadow-lg transition-all duration-300 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
