import React, { useState, useRef } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../../utils/userSlice";
import { useTheme } from "../../context/ThemeContext";

const SignUp = () => {
  const { isDarkMode } = useTheme();
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const formDataRef = useRef({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    formDataRef.current[name] = value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formDataRef.current;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, {
          displayName: formDataRef.current.username,
        }).then(() => {
          const { uid, email, displayName } = auth.currentUser;
          dispatch(addUser({ uid, email, displayName }));
        });
      })
      .catch((error) => {
        setErrorMessage("Something went wrong. Please try again.");
      });
  };

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-8 rounded-lg animate-fade-in"
      >
        <h2 className="pt-3 text-3xl font-bold text-center">Sign Up</h2>
        <p className="pt-3 mb-5 text-center ">
          Create your account to get started
        </p>

        {errorMessage && (
          <div className="p-2 mt-2 text-sm text-center text-red-600 transition-all rounded-md dark:text-red-400 bg-red-50 dark:bg-red-900/20 animate-shake">
            {errorMessage}
          </div>
        )}

        {[
          { name: "username", type: "text", placeholder: "Username" },
          { name: "email", type: "email", placeholder: "Email" },
          { name: "password", type: "password", placeholder: "Password" },
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
              }`}
              required
            />
          </div>
        ))}

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
