import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../utils/api/apiCalls";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useShowToasts from "../../../utils/hooks/showToasts";

const Login = () => {
  const navigate = useNavigate();
  const { showToast } = useShowToasts();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await login(email, password);
      if (res.success) {
        navigate(res.isAdmin ? "/adminHomePage" : "/homePage");
      } else {
        showToast(res.message);
      }
    } catch (error) {
      showToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center">
      <div className="px-8 py-10 md:shadow-xl bg-gray-700 rounded-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center text-gray-100 mb-8">
          Sign in to LoanApp
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-gray-300 font-semibold">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 px-4 py-2 rounded-md bg-gray-600 text-gray-100 border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="flex flex-col my-5 relative">
            <label htmlFor="password" className="font-semibold text-gray-300">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              required
              className="border border-gray-500 bg-gray-600 text-gray-100 px-5 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              className="absolute right-3 top-9 cursor-pointer text-gray-400 hover:text-gray-200"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash className="h-5 w-5" />
              ) : (
                <FaEye className="h-5 w-5" />
              )}
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-3/4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300 disabled:bg-gray-500"
            >
              {loading ? "Please wait..." : "Login"}
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Don't have an account?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
