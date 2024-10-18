import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useAppContext } from "../../../utils/AppContext";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Navbar = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [profileModal, setProfileModal] = useState(false);

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
  };

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
          <div
            className="flex items-center cursor-pointer hover:text-cyan-500 transition text-white"
            onClick={() => navigate("/applyLoan")}
          >
            <p className="font-semibold px-2 underline">Apply Loan</p>
          </div>

          <div
            className="pl-5 cursor-pointer"
            onClick={() => setProfileModal(!profileModal)}
          >
            <p>{user?.name}</p>
          </div>
        </div>

        <div className="md:hidden flex">
          <button
            onClick={handleToggleMenu}
            className="text-gray-600 dark:text-gray-300 focus:outline-none"
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {profileModal && (
        <div className="absolute right-5 top-14 bg-white dark:bg-gray-800 shadow-lg rounded-lg w-48">
          <p
            onClick={handleSignOut}
            className="hover:bg-red-500 hover:text-white font-semibold p-3 rounded-b-md transition cursor-pointer"
          >
            Sign Out
          </p>
        </div>
      )}

      {isOpen && (
        <div className="md:hidden bg-gray-100 dark:bg-gray-900 px-6 py-4 space-y-4 shadow-lg flex flex-col items-center">
          <div
            className="cursor-pointer hover:bg-cyan-500 rounded-md px-3 py-2 transition text-white"
            onClick={() => {
              navigate("/applyLoan");
              setIsOpen(false);
            }}
          >
            <p className="font-semibold px-2">Apply Loan</p>
          </div>

          <div
            onClick={handleSignOut}
            className="cursor-pointer hover:bg-red-500 rounded-md px-3 py-2 transition text-white"
          >
            Sign Out
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
