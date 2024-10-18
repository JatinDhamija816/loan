import React, { useMemo } from "react";
import { Loan } from "../../../utils/types";
import {
  buttonClass,
  cellClass,
  noActionClass,
} from "../../../utils/constants";

interface LoanRowProps {
  loan: Loan;
  onApprove: (loanId: string) => void;
}

const LoanRow: React.FC<LoanRowProps> = ({ loan, onApprove }) => {
  const {
    loanId,
    customerName,
    customerEmail,
    amount,
    term,
    status,
    repayments,
  } = loan;

  const renderRepayments = useMemo(() => {
    if (repayments.length === 0) return <span>No repayments</span>;

    return (
      <ul className="list-disc list-inside">
        {repayments.map((repayment, index) => (
          <li key={index}>
            {new Date(repayment.date).toLocaleDateString()}: {repayment.amount}$
            - {repayment.status}
          </li>
        ))}
      </ul>
    );
  }, [repayments]);

  const statusClass = useMemo(() => {
    switch (status) {
      case "PENDING":
        return "text-yellow-400 font-bold";
      case "APPROVED":
        return "text-green-500 font-bold";
      default:
        return "text-blue-500 font-bold";
    }
  }, [status]);

  return (
    <tr className="hover:bg-gray-800 transition-all">
      <td className={cellClass}>{loanId}</td>
      <td className={cellClass}>{customerName}</td>
      <td className={cellClass}>{customerEmail}</td>
      <td className={cellClass}>{amount}$</td>
      <td className={cellClass}>{term} weeks</td>
      <td className={cellClass}>
        <span className={statusClass}>{status}</span>
      </td>
      <td className={cellClass}>{renderRepayments}</td>
      <td className={cellClass}>
        {status === "PENDING" ? (
          <button onClick={() => onApprove(loanId)} className={buttonClass}>
            Approve
          </button>
        ) : (
          <span className={noActionClass}>No Action</span>
        )}
      </td>
    </tr>
  );
};

export default LoanRow;
