import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from '../types/types';

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as string;

const verifyToken = (req: CustomRequest, res: Response, next: NextFunction): any => {
    const token = req.cookies?.accessToken || req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(403).json({
            success: false,
            message: 'No token provided!'
        });
    }

    jwt.verify(token, accessTokenSecret, (err: any, decodedToken: JwtPayload | string | undefined) => {
        if (err || !decodedToken || typeof decodedToken === 'string') {
            return res.status(403).json({
                success: false,
                message: 'Invalid or expired token!',
            });
        }

        req.userId = decodedToken.id;
        req.email = decodedToken.email;

        next();
    });
};

export default verifyToken;
