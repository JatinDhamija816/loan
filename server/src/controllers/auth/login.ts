import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from '../../utils/tokenUtils';
import User from '../../models/userModel';

export const login = async (req: Request, res: Response): Promise<any> => {
    try {
        const { email, password }: { email: string, password: string } = req.body;
        const loweredEmail = email.toLowerCase();

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }

        if (loweredEmail === 'admin@gmail.com' && password === 'admin') {
            const adminPayload = { email, role: 'admin' };
            const accessToken = generateAccessToken(adminPayload);
            const refreshToken = generateRefreshToken(adminPayload);

            return res.status(200).json({
                success: true,
                message: 'Admin login successful',
                isAdmin: true,
                accessToken,
                refreshToken,
            });
        }

        const user = await User.findOne({ email: loweredEmail });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            isAdmin: false,
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
