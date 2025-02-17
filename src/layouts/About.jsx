import UserClass from "./UserClass";
import { useTheme } from "../context/ThemeContext";

const About = () => {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-[calc(100svh-67px)] flex flex-col items-center justify-center w-full pt-[67px] transition-colors duration-300 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-slate-200 text-black"
      }`}
    >
      <UserClass name="Priyanshu Gangwar" location="Bareilly" />
    </div>
  );
};

export default About;
