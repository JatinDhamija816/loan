import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-900 text-white px-6 sm:px-10">
      <div className="mb-8 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-500 mb-4 transition-opacity duration-700 ease-in-out opacity-95">
          Welcome to LoanApp
        </h1>
        <p className="text-lg sm:text-xl text-gray-400">
          The simplest way to manage your loans and repayments.
        </p>
      </div>

      <Link to="/login" aria-label="Get Started with LoanApp">
        <button className="bg-blue-600 text-lg sm:text-xl py-2 sm:py-3 px-6 sm:px-8 rounded-full hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50">
          Get Started
        </button>
      </Link>
    </div>
  );
};

export default LandingPage;
