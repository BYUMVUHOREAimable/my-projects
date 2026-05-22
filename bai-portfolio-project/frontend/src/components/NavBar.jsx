import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme.js";
import logo from "../assets/logo.png";

const Navbar = () => {
  const { mode, setMode } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Button styling helper
  const getBtnClasses = (btnMode) =>
    `px-3 py-1 rounded-l first:rounded-l last:rounded-r ${
      mode === btnMode
        ? "bg-blue-500 text-white"
        : "bg-gray-600 dark:bg-gray-700 hover:bg-gray-500"
    }`;

  return (
    <nav className="fixed top-0 left-0 w-full bg-gray-800 dark:bg-gray-900 text-white shadow z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo (left) */}
        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-10 w-10" />
          <span className="font-bold text-lg">MyPortfolio</span>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none p-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            {isOpen ? "✖️" : "☰"}
          </button>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/achievements" className="hover:underline">My Achievements</Link>
          <Link to="/skills" className="hover:underline">Skills</Link>
          <Link to="/about" className="hover:underline">About Me</Link>
          <Link to="/contact" className="hover:underline">Contact Me</Link>
          
          {/* Resume */}
          <Link
            to="/resume"
            className="px-3 py-1 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Resume
          </Link>

          {/* Dark/Light/System Toggle */}
          <div className="flex rounded overflow-hidden border border-gray-600">
            <button
              onClick={() => setMode("light")}
              className={getBtnClasses("light")}
            >
              ☀️
            </button>
            <button
              onClick={() => setMode("dark")}
              className={getBtnClasses("dark")}
            >
              🌙
            </button>
            <button
              onClick={() => setMode("system")}
              className={getBtnClasses("system")}
            >
              💻
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-gray-700 dark:bg-gray-800 px-4 py-3 space-y-3">
          <Link to="/" onClick={() => setIsOpen(false)} className="block hover:underline">Home</Link>
          <Link to="/achievements" onClick={() => setIsOpen(false)} className="block hover:underline">My Achievements</Link>
          <Link to="/skills" onClick={() => setIsOpen(false)} className="block hover:underline">Skills</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="block hover:underline">About Me</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="block hover:underline">Contact Me</Link>

          <Link
            to="/resume"
            onClick={() => setIsOpen(false)}
            className="block px-3 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
          >
            Resume
          </Link>

          {/* Mobile theme toggle */}
          <div className="flex rounded overflow-hidden border border-gray-500">
            <button
              onClick={() => {
                setMode("light");
                setIsOpen(false);
              }}
              className={getBtnClasses("light")}
            >
              ☀️ Light
            </button>
            <button
              onClick={() => {
                setMode("dark");
                setIsOpen(false);
              }}
              className={getBtnClasses("dark")}
            >
              🌙 Dark
            </button>
            <button
              onClick={() => {
                setMode("system");
                setIsOpen(false);
              }}
              className={getBtnClasses("system")}
            >
              💻 System
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;