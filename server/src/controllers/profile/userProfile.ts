import { Response } from "express";
import { CustomRequest, IUser } from "../../types/types";
import User from "../../models/userModel";

export const userProfile = async (req: CustomRequest<IUser>, res: Response): Promise<any> => {
    try {
        const { userId } = req;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: 'User ID is required.',
            });
        }

        const user = await User.findById(userId).select('name email');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: 'User profile retrieved successfully',
            data: user
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
};
