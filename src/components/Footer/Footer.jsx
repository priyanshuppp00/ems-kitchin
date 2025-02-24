import { MdOutlineFacebook } from "react-icons/md";
import { FaTwitter, FaInstagram } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";

const SocialIcons = () => (
  <div className="flex gap-4 mt-4">
    <a
      href="https://www.facebook.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <MdOutlineFacebook className="w-6 h-6 text-blue-500 transition-colors cursor-pointer hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-600" />
    </a>
    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
      <FaTwitter className="w-6 h-6 text-blue-400 transition-colors cursor-pointer hover:text-blue-600 dark:text-blue-300 dark:hover:text-blue-500" />
    </a>
    <a
      href="https://www.instagram.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaInstagram className="w-6 h-6 text-pink-500 transition-colors cursor-pointer hover:text-pink-700 dark:text-pink-400 dark:hover:text-pink-600" />
    </a>
  </div>
);

const FooterColumn = ({ title, items }) => (
  <div>
    <h3 className="mb-3 text-xl font-semibold">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, index) => (
        <li
          key={index}
          className="transition-colors cursor-pointer hover:text-gray-600"
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
);

const SubscribeForm = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="flex items-center w-full max-w-xs mx-auto overflow-hidden border border-gray-400 rounded-lg dark:border-gray-600 sm:max-w-sm">
      <input
        type="text"
        placeholder="Enter your email"
        className={`w-full p-2 outline-none ${
          isDarkMode ? "bg-gray-800 text-white" : "bg-gray-300 text-black"
        }`}
      />
      <button className="px-4 py-2 text-white transition-colors bg-red-500 cursor-pointer hover:bg-red-700">
        Subscribe
      </button>
    </div>
  );
};

const Footer = () => {
  const { isDarkMode } = useTheme();
  const currentYear = new Date().getFullYear();

  const aboutItems = ["About Us", "Our Services", "Contact", "Company"];
  const companyItems = [
    "Partnership",
    "Terms of Use",
    "Privacy Policy",
    "Sitemap",
  ];

  return (
    <footer
      className={`px-6 py-10 md:px-12 border-t border-gray-200 dark:border-gray-800 ${
        isDarkMode ? "bg-gray-950 text-white" : "bg-slate-200 text-black"
      }`}
    >
      <div className="grid max-w-6xl grid-cols-2 gap-6 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <h3 className="text-2xl font-bold">EMS-Kitchin</h3>
          <p className="mt-2">
            In the new era of technology, we look into the future with certainty
            and pride for our company.
          </p>
          <SocialIcons />
        </div>
        <FooterColumn title="About Us" items={aboutItems} />
        <FooterColumn title="Company" items={companyItems} />
        <div>
          <h3 className="mb-3 text-xl font-semibold">Get in touch</h3>
          <p className="mb-3">
            Stay updated with our latest services and news.
          </p>
          <SubscribeForm />
        </div>
      </div>
      <p className="mt-8 text-center">
        &copy; {currentYear} EMS-Kitchin. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
