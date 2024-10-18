import { Response } from "express";
import Loan from "../../models/loanModel";
import { CustomRequest } from "../../types/types";

export const updateLoanStatus = async (req: CustomRequest, res: Response): Promise<any> => {
    try {
        const { loanId } = req.body;

        if (!loanId) {
            return res.status(400).json({
                success: false,
                message: "Loan ID is required."
            });
        }

        const loan = await Loan.findById(loanId);
        if (!loan) {
            return res.status(404).json({
                success: false,
                message: "Loan not found."
            });
        }

        if (loan.status !== "APPROVED") {
            loan.status = "APPROVED";
            await loan.save();
        }

        return res.status(200).json({
            success: true,
            message: "Loan status updated successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
};
