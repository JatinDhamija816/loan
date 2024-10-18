import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { CiSettings } from "react-icons/ci";

const AdminNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const handleToggleMenu = () => setIsOpen((prev) => !prev);
  const handleToggleProfileModal = () => setProfileModal((prev) => !prev);

  const handleSignOut = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-100 dark:bg-gray-900 shadow-md w-full z-50">
      <div className="px-6 py-4 flex items-center justify-between">
        <div
          className="font-mono italic text-2xl text-cyan-500 font-bold cursor-pointer transition hover:text-cyan-400"
          onClick={() => navigate("/")}
        >
          loanApp
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={handleToggleProfileModal}
            className="relative p-2 text-gray-600 dark:text-gray-300 hover:text-cyan-400 transition"
            aria-label="Profile Settings"
          >
            <CiSettings size={24} />
          </button>
        </div>

        <div className="md:hidden flex items-center">
          <button
            onClick={handleToggleMenu}
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
            aria-label="Menu Toggle"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {profileModal && (
        <div className="absolute right-5 top-14 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-48">
          <ul className="text-gray-700 dark:text-gray-100">
            <li
              onClick={handleSignOut}
              className="hover:bg-red-500 hover:text-white font-semibold p-3 rounded-b-md transition cursor-pointer"
            >
              Sign Out
            </li>
          </ul>
        </div>
      )}

      {isOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-900 px-6 py-4 space-y-4 shadow-lg items-center justify-center flex-col">
          <button
            onClick={handleSignOut}
            className="flex items-center justify-center cursor-pointer hover:bg-red-500 rounded-md px-3 py-2 transition text-white"
          >
            Sign Out
          </button>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
