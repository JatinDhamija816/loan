import { Request } from 'express';
import mongoose, { ObjectId } from 'mongoose';

export interface CustomRequest<T = any> extends Request {
    body: T;
    userId?: string;
    email?: string;
}

export interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: string;
    loans?: mongoose.Types.ObjectId[];
}

export interface Error {
    field: string;
    message: string;
}

export interface ILoan extends Document {
    customerId: string | IUser;
    amount: number;
    term: number;
    status: string;
    repayments: IRepayment[];
}

export interface IRepayment extends mongoose.Types.Subdocument {
    _id: mongoose.Types.ObjectId;
    date: Date;
    amount: number;
    status: string;
}
