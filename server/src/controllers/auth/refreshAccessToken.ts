import { Request, Response } from "express";
import { checkRefreshToken, decodeRefreshToken, generateAccessToken, generateRefreshToken } from "../../utils/tokenUtils";

export const refreshAccessToken = (req: Request, res: Response): any => {
    try {
        const token = req.body.token

        if (!token) {
            return res.status(400).json({
                success: false,
                message: 'Refresh token is required',
            });
        }

        if (!checkRefreshToken(token)) {
            return res.status(401).json({
                success: false,
                message: 'Invalid or expired refresh token, please login again',
            });
        }

        const decoded = decodeRefreshToken(token);
        if (!decoded) {
            return res.status(400).json({
                success: false,
                message: 'Failed to decode token or token is invalid',
            });
        }

        const { id: userId, email, role } = decoded;

        const accessToken = generateAccessToken({ id: userId, email, role });
        const refreshToken = generateRefreshToken({ id: userId, email, role });

        return res.status(200).json({
            success: true,
            message: 'New access token generated successfully',
            accessToken,
            refreshToken,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error',
            error: error instanceof Error ? error.message : 'An unknown error occurred',
        });
    }
};
