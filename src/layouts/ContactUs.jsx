import { useState } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";

const ContactUs = () => {
  const { isDarkMode } = useTheme();
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setName("");
    setEmail("");
    setMessage("");

    // Hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      className={`flex flex-col md:flex-row-reverse items-center justify-center min-h-screen pt-30 px-6 
  ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
    >
      {/* Contact Form (Right Side) */}
      <form
        onSubmit={handleSubmit}
        className={`w-full max-w-md p-6 rounded-lg shadow-md mb-8 
     `}
      >
        <h1 className="mb-6 text-3xl font-semibold text-center ">Contact Us</h1>

        {/* Success Message */}
        {submitted && (
          <div className="px-4 py-2 mb-4 text-white bg-green-700 rounded-md">
            Message sent successfully! Our team will contact you soon.
          </div>
        )}

        <div className="mb-4">
          <label className="block mb-1 text-sm">Name</label>
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className={`w-full px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500 
          ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
          }`}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Email</label>
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={`w-full px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500 
          ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
          }`}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 text-sm">Message</label>
          <textarea
            placeholder="Your Message"
            rows="4"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
            className={`w-full px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-purple-500 
          ${
            isDarkMode ? "bg-gray-700 text-white" : "bg-gray-200 text-gray-900"
          }`}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full py-2 text-white transition-all duration-300 bg-purple-600 rounded-md cursor-pointer hover:bg-purple-800"
        >
          Send Message
        </button>
      </form>

      {/* Social Icons (Left Side, Top to Bottom) */}
      <div className="flex flex-col items-center space-y-4 md:mr-10">
        <a
          href="#"
          className="text-2xl transition-all duration-300 hover:text-blue-500"
        >
          <FaFacebook />
        </a>
        <a
          href="#"
          className="text-2xl transition-all duration-300 hover:text-blue-400"
        >
          <FaTwitter />
        </a>
        <a
          href="#"
          className="text-2xl transition-all duration-300 hover:text-pink-500"
        >
          <FaInstagram />
        </a>
        <a
          href="#"
          className="text-2xl transition-all duration-300 hover:text-blue-600"
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default ContactUs;
