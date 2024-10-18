import { Response } from "express";
import Loan from "../../models/loanModel";
import User from "../../models/userModel";
import { CustomRequest, ILoan } from "../../types/types";

export const applyLoan = async (req: CustomRequest<ILoan>, res: Response): Promise<any> => {
    try {
        const { amount, term } = req.body;
        const { userId } = req;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        if (!amount || !term || amount <= 0 || term <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid loan amount or term. Both must be positive values.',
            });
        }

        const weeklyAmount = (amount / term).toFixed(2);

        const repayments = Array.from({ length: term }, (_, i) => {
            const repaymentDate = new Date();
            repaymentDate.setDate(repaymentDate.getDate() + 7 * (i + 1));
            return {
                date: repaymentDate,
                amount: parseFloat(weeklyAmount),
                status: 'PENDING',
            };
        });

        const newLoan = new Loan({
            customerId: userId,
            amount,
            term,
            repayments,
            status: 'PENDING',
        });

        await newLoan.save();

        user.loans?.push(newLoan._id);
        await user.save();

        return res.status(201).json({
            success: true,
            message: 'Loan applied successfully',
            loanId: newLoan._id,
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
};
