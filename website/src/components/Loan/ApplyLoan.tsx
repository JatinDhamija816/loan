import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { applyLoan } from "../../../utils/api/apiCalls";
import useShowToasts from "../../../utils/hooks/showToasts";

const ApplyLoan = () => {
  const navigate = useNavigate();
  const { showToast } = useShowToasts();

  const [amount, setAmount] = useState<number>(1000);
  const [term, setTerm] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (amount <= 0 || isNaN(amount)) {
      showToast("Please enter a valid loan amount greater than 0.");
      return;
    }
    if (term <= 0 || isNaN(term)) {
      showToast("Please enter a valid loan term greater than 0.");
      return;
    }

    setLoading(true);
    try {
      const res = await applyLoan(amount, term);
      if (res.success) {
        showToast("Loan application submitted successfully.", false);
        navigate("/homePage");
      } else {
        showToast(res.message || "An error occurred.");
      }
    } catch (error) {
      showToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 h-screen flex justify-center items-center">
      <div className="px-8 py-10 bg-gray-700 rounded-lg shadow-md max-w-md w-full">
        <h1 className="font-bold text-2xl text-center text-gray-100 mb-6">
          Apply for Loan
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="amount"
              className="font-semibold text-gray-300 mb-2"
            >
              Loan Amount
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter loan amount"
              required
              className="w-full border border-gray-500 bg-gray-600 text-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
            />
          </div>

          <div className="mb-6">
            <label htmlFor="term" className="font-semibold text-gray-300 mb-2">
              Loan Term (in weeks)
            </label>
            <input
              type="number"
              id="term"
              placeholder="Enter loan term"
              required
              className="w-full border border-gray-500 bg-gray-600 text-gray-100 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={term}
              onChange={(e) => setTerm(parseInt(e.target.value))}
            />
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition duration-300"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Apply"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyLoan;
