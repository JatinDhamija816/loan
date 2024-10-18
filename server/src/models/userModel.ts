import mongoose, { Schema } from 'mongoose';
import { IUser } from '../types/types';

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'customer'],
        default: 'customer'
    },
    loans: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Loan'
    }]
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;
