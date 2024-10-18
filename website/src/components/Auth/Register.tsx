import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerValidate } from "../../../utils/validations/register";
import { register } from "../../../utils/api/apiCalls";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useShowToasts from "../../../utils/hooks/showToasts";

interface User {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useShowToasts();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const toggleVisibility = (field: "password" | "confirmPassword") => {
    field === "password"
      ? setShowPassword((prev) => !prev)
      : setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const validateUser = registerValidate(user);
    if (validateUser.length > 0) {
      showToast(validateUser[0].message);
    } else {
      try {
        const res = await register(user);
        res.success ? navigate("/homePage") : showToast(res.error);
      } catch (error) {
        showToast("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center">
      <div className="px-8 py-10 bg-gray-700 rounded-lg md:max-w-sm w-full shadow-xl">
        <h2 className="text-2xl font-bold text-center text-gray-100 mb-6">
          Sign up to LoanApp
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-gray-300 font-semibold">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={user.name}
              onChange={handleChange}
              required
              className="mt-2 px-4 py-2 w-full bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div>
            <label htmlFor="email" className="text-gray-300 font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={user.email}
              onChange={handleChange}
              required
              className="mt-2 px-4 py-2 w-full bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="relative">
            <label htmlFor="password" className="text-gray-300 font-semibold">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={user.password}
              onChange={handleChange}
              required
              className="mt-2 px-4 py-2 w-full bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-400 hover:text-gray-200"
              onClick={() => toggleVisibility("password")}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="relative">
            <label
              htmlFor="confirmPassword"
              className="text-gray-300 font-semibold"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={user.confirmPassword}
              onChange={handleChange}
              required
              className="mt-2 px-4 py-2 w-full bg-gray-600 border border-gray-500 rounded-md text-gray-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="button"
              className="absolute right-3 top-10 text-gray-400 hover:text-gray-200"
              onClick={() => toggleVisibility("confirmPassword")}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              disabled={loading}
              className="w-3/4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300 disabled:bg-gray-500"
            >
              {loading ? "Please wait..." : "Register"}
            </button>
          </div>
        </form>

        <p className="text-center mt-6 text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
