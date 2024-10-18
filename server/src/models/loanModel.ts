import mongoose, { Schema } from 'mongoose';
import { ILoan } from '../types/types';

const repaymentSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId(),
    },
    date: {
        type: Date,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'PAID'],
        default: 'PENDING'
    },
});

const loanSchema: Schema = new Schema({
    customerId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    term: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['PENDING', 'APPROVED', 'PAID'],
        default: 'PENDING'
    },
    repayments: [repaymentSchema]
});

const Loan = mongoose.model<ILoan>('Loan', loanSchema);
export default Loan;
