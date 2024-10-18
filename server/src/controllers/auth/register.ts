import { Response } from "express";
import { registerValidate } from "../../utils/validations/registerValidate";
import { hashPassword } from "../../utils/bcryptPassword";
import { CustomRequest, IUser } from "../../types/types";
import User from "../../models/userModel";
import { generateAccessToken, generateRefreshToken } from "../../utils/tokenUtils";

export const register = async (req: CustomRequest<IUser>, res: Response): Promise<any> => {
    try {
        const { name, email, password, confirmPassword } = req.body;
        const loweredEmail = email.toLowerCase();

        const validationErrors = registerValidate({ name, email: loweredEmail, password, confirmPassword });
        if (validationErrors.length > 0) {
            return res.status(400).json({
                success: false,
                error: validationErrors,
            });
        }

        const existingUser = await User.findOne({ email: loweredEmail });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                error: 'Email already in use.',
            });
        }

        const hashedPassword = await hashPassword(password);
        const newUser = new User({
            name,
            email: loweredEmail,
            password: hashedPassword,
        });

        const savedUser = await newUser.save();

        const accessToken = generateAccessToken(savedUser);
        const refreshToken = generateRefreshToken(savedUser);

        return res.status(201).json({
            success: true,
            message: 'User registered successfully',
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
