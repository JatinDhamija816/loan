import React, { useEffect, useState } from "react";
import {
  getAllLoanApplications,
  updateLoanStatus,
} from "../../../utils/api/apiCalls";
import useShowToasts from "../../../utils/hooks/showToasts";
import LoanRow from "./LoanRow";
import { Loan } from "../../../utils/types";
import TableHeader from "./TableHeader";

const AdminLoanDetails: React.FC = () => {
  const [loans, setLoans] = useState<Loan[]>([]);
  const [loading, setLoading] = useState(true);
  const { showToast } = useShowToasts();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const res = await getAllLoanApplications();
        if (res.success) {
          setLoans(res.loans);
        } else {
          showToast("Failed to fetch loan applications");
        }
      } catch (error) {
        showToast("Error fetching loan applications");
      } finally {
        setLoading(false);
      }
    };
    fetchLoans();
  }, [showToast]);

  const handleApprove = async (loanId: string) => {
    try {
      const res = await updateLoanStatus(loanId);
      if (res.success) {
        showToast("Loan status updated to APPROVED", false);
        setLoans((prevLoans) =>
          prevLoans.map((loan) =>
            loan.loanId === loanId ? { ...loan, status: "APPROVED" } : loan
          )
        );
      } else {
        showToast("Failed to update loan status");
      }
    } catch (error) {
      showToast("Error updating loan status");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (loans.length === 0) {
    return <div>No loan applications found.</div>;
  }

  const headers = [
    "Loan ID",
    "Customer Name",
    "Customer Email",
    "Amount",
    "Term",
    "Status",
    "Repayments",
    "Actions",
  ];

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-lg">
      <h2 className="text-3xl text-white mb-6 font-semibold">
        Loan Applications
      </h2>
      <table className="w-full text-white table-auto border-collapse">
        <TableHeader headers={headers} />
        <tbody>
          {loans.map((loan) => (
            <LoanRow key={loan.loanId} loan={loan} onApprove={handleApprove} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminLoanDetails;
