import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { addUser, removeUser } from "../../utils/userSlice";
import SignUp from "../SignUp/SignUp";
import LoginForm from "./LoginForm";
import { useTheme } from "../../context/ThemeContext";

const Login = () => {
  const { isDarkMode } = useTheme();
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleSignUp = () => setIsSignUp((prevState) => !prevState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid, email, displayName }));
      } else {
        dispatch(removeUser());
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div
      className={`flex items-center justify-center min-h-screen px-4 py-10 transition-all duration-300 sm:py-20`}
    >
      <div
        className={`relative w-full max-w-4xl flex flex-wrap md:flex-nowrap ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
        } rounded-lg transition-all duration-300 ease-in-out ${
          isSignUp ? "flex-row-reverse" : ""
        } shadow-lg overflow-hidden`}
      >
        {/* Form Section */}
        <div
          className={`flex flex-col items-center w-full p-6 md:p-10 md:w-1/2 ${
            isDarkMode
              ? "bg-gray-700 shadow-lg rounded-lg"
              : "bg-gray-100 shadow-md rounded-lg"
          } transition-all duration-300 ease-in-out`}
        >
          {isSignUp ? <SignUp /> : <LoginForm />}
        </div>

        {/* Info Section */}
        <div
          className={`flex flex-col items-center justify-center w-full p-6 md:p-10 md:w-1/2 text-center ${
            isDarkMode
              ? "bg-gray-600 shadow-lg rounded-lg text-white"
              : "bg-gray-200 shadow-md rounded-lg text-black"
          } transition-all duration-300 ease-in-out`}
        >
          <h3 className="text-2xl font-bold">
            {isSignUp ? "One of Our Valued Members" : "New to our community?"}
          </h3>
          <p className="mt-2 text-sm sm:text-base">
            {isSignUp
              ? "Thank you for being part of our community. Your presence enriches our shared experiences."
              : "Join us and explore a vibrant community where ideas flourish and connections thrive."}
          </p>
          <button
            onClick={toggleSignUp}
            className="px-5 py-2 mt-6 text-base font-medium text-white transition-all bg-purple-600 rounded-md shadow-md cursor-pointer hover:bg-purple-800 hover:scale-105 hover:shadow-lg active:scale-95 focus:outline-none sm:px-6 sm:py-3"
            aria-label={isSignUp ? "Go to Sign In" : "Go to Sign Up"}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
