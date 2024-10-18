import { Response } from "express";
import Loan from "../../models/loanModel";
import { CustomRequest } from "../../types/types";
import User from "../../models/userModel";

export const userLoan = async (req: CustomRequest, res: Response): Promise<any> => {
    try {
        const { userId } = req;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const loans = await Loan.find({ customerId: userId });

        if (!loans || loans.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'No loans found for this user',
            });
        }

        const loanDetails = loans.map((loan) => ({
            loanId: loan._id,
            amount: loan.amount,
            term: loan.term,
            status: loan.status,
            repayments: loan.repayments.map((repayment) => ({
                repaymentId: repayment._id,
                date: repayment.date,
                amount: repayment.amount,
                status: repayment.status,
            }))
        }));

        return res.status(200).json({
            success: true,
            loans: loanDetails,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
};
