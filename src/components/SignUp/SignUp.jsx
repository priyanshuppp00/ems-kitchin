import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../utils/userSlice";
import { showNotification } from "../../utils/notificationSlice";
import { useTheme } from "../../context/ThemeContext";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const SignUp = () => {
  const { isDarkMode } = useTheme();
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formDataRef = useRef({
    username: "",
    email: "",
    password: "",
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    formDataRef.current[name] = value;
    if (name === "email") {
      setEmailError(
        validateEmail(value) ? "" : "Please enter a valid email address"
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateEmail(formDataRef.current.email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    const { email, password } = formDataRef.current;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: formDataRef.current.username,
        }).then(() => {
          const { uid, email, displayName } = auth.currentUser;
          dispatch(addUser({ uid, email, displayName }));
          dispatch(
            showNotification({
              message: "Sign up successful! Welcome to EMS Kitchin",
              type: "success",
            })
          );
          navigate("/login");
        });
      })
      .catch((error) => {
        let errorMessage = "Sign up failed. Please try again.";
        switch (error.code) {
          case "auth/email-already-in-use":
            errorMessage = "Email already in use.";
            break;
          case "auth/invalid-email":
            errorMessage = "Invalid email address.";
            break;
          case "auth/weak-password":
            errorMessage = "Password should be at least 6 characters.";
            break;
          default:
            errorMessage = "Sign up failed. Please try again.";
        }
        setErrorMessage(errorMessage);
      });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-lg animate-fade-in"
      >
        <h2 className="pt-3 text-3xl font-bold text-center">Sign Up</h2>
        <p className="pt-3 mb-5 text-center">
          Create your account to get started
        </p>

        {errorMessage && (
          <div className="flex items-center p-3 mt-2 text-sm text-red-600 rounded-md dark:text-red-400 bg-red-50 dark:bg-red-900/20 animate-shake">
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
            {errorMessage}
          </div>
        )}

        {[
          { name: "username", type: "text", placeholder: "Username" },
          { name: "email", type: "email", placeholder: "Email" },
        ].map((input, index) => (
          <div key={index} className="relative mb-4 group">
            <i
              className={`absolute text-gray-500 transition-colors fas fa-${
                input.type === "email" ? "user" : "lock"
              } left-3 top-3 dark:text-gray-400 group-focus-within:text-purple-500`}
            ></i>
            <input
              type={input.type}
              placeholder={input.placeholder}
              name={input.name}
              onChange={handleChange}
              className={`w-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-purple-500 rounded-md outline-none transition-all ${
                isDarkMode
                  ? "bg-gray-900 text-white focus:bg-gray-800"
                  : "bg-gray-200 text-gray-900 focus:bg-white"
              } ${
                input.name === "email" && emailError
                  ? "border border-red-500"
                  : ""
              }`}
              required
            />
            {input.name === "email" && emailError && (
              <p className="mt-1 text-sm text-red-500">{emailError}</p>
            )}
          </div>
        ))}

        <div className="relative mb-4 group">
          <i className="absolute text-gray-500 transition-colors fas fa-lock left-3 top-3 dark:text-gray-400 group-focus-within:text-purple-500"></i>
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className={`w-full py-2 pl-10 pr-12 focus:ring-2 focus:ring-purple-500 rounded-md outline-none transition-all ${
              isDarkMode
                ? "bg-gray-900 text-white focus:bg-gray-800"
                : "bg-gray-200 text-gray-900 focus:bg-white"
            }`}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-gray-500 right-3 top-3 hover:text-purple-500"
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
          className="w-full py-2 mt-4 text-white transition-all rounded-md cursor-pointer hover:scale-[1.02] active:scale-95 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 shadow-md hover:shadow-lg"
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignUp;
