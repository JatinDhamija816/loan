import { Request, Response } from "express";
import Loan from "../../models/loanModel";
import { IUser } from "../../types/types";

export const getAllLoans = async (req: Request, res: Response): Promise<any> => {
    try {
        const loans = await Loan.find().populate('customerId', 'name email');

        if (loans.length === 0) {
            return res.status(200).json({
                success: true,
                loans: [],
                message: "No loan applications found."
            });
        }
        const formattedLoans = loans.map((loan) => {
            const customer = loan.customerId as IUser;

            return {
                loanId: loan._id,
                customerId: customer._id,
                customerName: customer.name,
                customerEmail: customer.email,
                amount: loan.amount,
                term: loan.term,
                status: loan.status,
                repayments: loan.repayments,
            };
        });

        return res.status(200).json({
            success: true,
            loans: formattedLoans
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
};
