import { useEffect, useState } from "react";
import useShowToasts from "../../../utils/hooks/showToasts";
import { getUserLoans, submitRepayment } from "../../../utils/api/apiCalls";

interface Repayment {
  repaymentId: string;
  date: string;
  amount: number;
  status: string;
}

interface Loan {
  loanId: string;
  amount: number;
  term: number;
  status: string;
  repayments: Repayment[];
}

const UserLoanDetails = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useShowToasts();
  const [paymentAmounts, setPaymentAmounts] = useState<{
    [key: string]: number;
  }>({});

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await getUserLoans();
        if (res?.loans) {
          setLoans(res.loans);
        } else {
          showToast("No loans available.", false);
        }
      } catch (error) {
        showToast("Error fetching loans");
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [showToast]);

  const handlePaymentChange = (repaymentId: string, value: number) => {
    if (isNaN(value) || value <= 0) {
      showToast("Please enter a valid payment amount.");
      return;
    }
    setPaymentAmounts((prevState) => ({
      ...prevState,
      [repaymentId]: value,
    }));
  };

  const handleRepaymentSubmit = async (loanId: string, repaymentId: string) => {
    const amount = paymentAmounts[repaymentId];
    if (!amount || amount <= 0) {
      showToast("Please enter a valid amount.");
      return;
    }

    try {
      const res = await submitRepayment(loanId, repaymentId, amount);
      if (res.success) {
        showToast("Payment successful", false);
        const updatedLoans = await getUserLoans();
        setLoans(updatedLoans.loans);
      } else {
        showToast(res.message || "Payment failed");
      }
    } catch (error) {
      showToast("Error processing payment. Please try again.");
    }
  };

  if (loading) return <div>Loading...</div>;

  if (loans.length === 0)
    return <div className="text-center">No loans found.</div>;

  return (
    <div>
      {loans.map((loan) => (
        <div key={loan.loanId} className="bg-gray-700 p-6 rounded-lg mb-4">
          <h2 className="text-2xl text-white mb-4">Loan Details</h2>
          <p className="text-gray-300 mb-2">
            <strong>Amount:</strong> {loan.amount}$
          </p>
          <p className="text-gray-300 mb-2">
            <strong>Term:</strong> {loan.term} weeks
          </p>
          <p className="text-gray-300 mb-2">
            <strong>Status:</strong> {loan.status}
          </p>

          {loan.status === "PENDING" ? (
            <div className="text-yellow-400">Loan is pending approval.</div>
          ) : (
            <div className="mt-4">
              <h3 className="text-lg text-white mb-2">Repayment Schedule</h3>
              <table className="w-full text-white">
                <thead>
                  <tr>
                    <th className="border-b border-gray-600 py-2">Date</th>
                    <th className="border-b border-gray-600 py-2">Amount</th>
                    <th className="border-b border-gray-600 py-2">Status</th>
                    <th className="border-b border-gray-600 py-2">Pay</th>
                  </tr>
                </thead>
                <tbody>
                  {loan.repayments.map((repayment) => (
                    <tr key={repayment.repaymentId}>
                      <td className="text-center border-b border-gray-600 py-2">
                        {new Date(repayment.date).toLocaleDateString()}
                      </td>
                      <td className="text-center border-b border-gray-600 py-2">
                        {repayment.amount}$
                      </td>
                      <td
                        className={`border-b border-gray-600 py-2 text-center ${
                          repayment.status === "PAID"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {repayment.status}
                      </td>
                      <td className="border-b border-gray-600 py-2 text-center">
                        {repayment.status === "PENDING" ? (
                          <>
                            <input
                              type="number"
                              placeholder="Amount"
                              value={
                                paymentAmounts[repayment.repaymentId] || ""
                              }
                              onChange={(e) =>
                                handlePaymentChange(
                                  repayment.repaymentId,
                                  parseFloat(e.target.value)
                                )
                              }
                              className="w-20 p-1 text-gray-800 rounded-md outline-none"
                            />
                            <button
                              onClick={() =>
                                handleRepaymentSubmit(
                                  loan.loanId,
                                  repayment.repaymentId
                                )
                              }
                              className="ml-2 bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                            >
                              Pay
                            </button>
                          </>
                        ) : (
                          <span>-</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default UserLoanDetails;
