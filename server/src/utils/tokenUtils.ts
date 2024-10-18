import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { IUser } from '../types/types';

dotenv.config();

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;
const accessTokenExpiry = process.env.ACCESS_TOKEN_EXPIRY || '15m';

const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET as string;
const refreshTokenExpiry = process.env.REFRESH_TOKEN_EXPIRY || '7d';

if (!accessTokenSecret || !refreshTokenSecret) {
    throw new Error('JWT secret keys must be set in the environment variables');
}

export const generateAccessToken = (user: IUser | { id?: string, email: string, role: string }): string => {
    const payload = {
        id: 'id' in user ? user.id : undefined,
        email: 'email' in user ? user.email : undefined,
        role: user.role || 'user'
    };

    try {
        const token = jwt.sign(payload, accessTokenSecret, { expiresIn: accessTokenExpiry });
        return token;
    } catch (error) {
        throw new Error('Token generation failed');
    }
};


export const generateRefreshToken = (user: IUser | { id?: string, email: string, role: string }): string => {
    const payload = {
        id: 'id' in user ? user.id : undefined,
        email: 'email' in user ? user.email : undefined,
        role: user.role || 'user'
    };

    try {
        const token = jwt.sign(payload, refreshTokenSecret, { expiresIn: refreshTokenExpiry });
        return token;
    } catch (error) {
        throw new Error('Token generation failed');
    }
};


export const checkRefreshToken = (token: string): boolean => {
    try {
        jwt.verify(token, refreshTokenSecret);
        return true;
    } catch (error) {
        return false;
    }
};

export const decodeRefreshToken = (token: string): any => {
    try {
        return jwt.verify(token, refreshTokenSecret);
    } catch (error) {
        return null;
    }
};
