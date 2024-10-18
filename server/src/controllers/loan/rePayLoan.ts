import { Response } from "express";
import Loan from "../../models/loanModel";
import { CustomRequest } from "../../types/types";
import User from "../../models/userModel";

export const repayLoan = async (req: CustomRequest, res: Response): Promise<any> => {
    try {
        const { loanId } = req.params;
        const { repaymentId, amount } = req.body;
        const { userId } = req;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const loan = await Loan.findById(loanId);
        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan not found."
            });
        }

        const repayment = loan.repayments.find((rep) => rep._id.toString() === repaymentId);
        if (!repayment) {
            return res.status(404).json({
                success: false,
                message: "Repayment not found."
            });
        }

        if (repayment.status === "PAID") {
            return res.status(400).json({
                success: false,
                message: "This repayment has already been paid."
            });
        }

        if (amount <= 0 || amount < repayment.amount) {
            return res.status(400).json({
                success: false,
                message: "Invalid payment amount. Must be greater than 0 and match or exceed the repayment amount."
            });
        }

        repayment.status = "PAID";

        const allRepaymentsPaid = loan.repayments.every(rep => rep.status === "PAID");
        if (allRepaymentsPaid) {
            loan.status = "PAID";
        }

        await loan.save();

        return res.status(200).json({
            success: true,
            message: "Repayment processed successfully.",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
};
