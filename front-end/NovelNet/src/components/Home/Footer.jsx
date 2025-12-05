import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-gray-800 py-12">
      <div className="max-w-[1400px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo / Brand */}
        <div className="mb-6 md:mb-0">
          <h2 className="text-white text-xl font-bold">NovelHub</h2>
          <p className="text-gray-400 text-sm mt-1">
            Share your stories and discover amazing novels & manga.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex gap-6 mb-6 md:mb-0">
          <a href="/about" className="text-gray-400 hover:text-white text-sm">About</a>
          <a href="/contact" className="text-gray-400 hover:text-white text-sm">Contact</a>
          <a href="/terms" className="text-gray-400 hover:text-white text-sm">Terms</a>
          <a href="/privacy" className="text-gray-400 hover:text-white text-sm">Privacy</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaTwitter />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaInstagram />
          </a>
          <a href="https://Discord.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white">
            <FaDiscord />
          </a>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        © 2025 NovelHub — Made with by Dhairya Jangid
      </div>
    </footer>
  );
};

export default Footer;

