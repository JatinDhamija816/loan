import axios from "axios";
import { User } from "../types";
import Cookies from "js-cookie";
import { getValidAccessToken } from '../tokenUtils'

const API_URL = 'http://localhost:8000/api/v1';

export const register = async (user: User) => {
    try {
        const res = await axios.post(`${API_URL}/auth/register`, user, { withCredentials: true });

        const { accessToken, refreshToken } = res.data;

        Cookies.set('accessToken', accessToken, { expires: 7, secure: true });
        Cookies.set('refreshToken', refreshToken, { expires: 30, secure: true });

        return res.data
    } catch (error: any) {
        return error.response.data
    }
};

export const login = async (email: string, password: string) => {
    try {
        const res = await axios.post(`${API_URL}/auth/login`, { email, password }, { withCredentials: true });

        const { accessToken, refreshToken } = res.data;

        Cookies.set('accessToken', accessToken, { expires: 7, secure: true });
        Cookies.set('refreshToken', refreshToken, { expires: 30, secure: true });

        return res.data
    } catch (error: any) {
        return error.response.data
    }
};

export const homePage = async () => {
    try {
        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            return { error: "Unauthorized" };
        }

        const res = await axios.get(`${API_URL}/profile/user_profile`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return res.data
    } catch (error: any) {
        return error.response.data
    }
};

export const applyLoan = async (amount: number, term: number) => {
    try {
        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            return { error: "Unauthorized" };
        }

        const res = await axios.post(`${API_URL}/loan/apply_loan`, { amount, term }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (error: any) {
        return error.response?.data || { error: "Unknown error occurred" };
    }
};

export const getUserLoans = async () => {
    try {
        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            return { error: "Unauthorized" };
        }

        const res = await axios.get(`${API_URL}/loan/user_loan`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });
        return res.data
    } catch (error: any) {
        return error.response.data
    }
};

export const getAllLoanApplications = async () => {
    try {
        const res = await axios.get(`${API_URL}/loan/all_loans`);
        return res.data
    } catch (error: any) {
        return error.response.data
    }
};

export const updateLoanStatus = async (loanId: string) => {
    try {
        const res = await axios.put(`${API_URL}/loan/loan_status`, { loanId }, {
            withCredentials: true,
        })
        return res.data
    } catch (error: any) {
        return error.response.data
    }
};

export const submitRepayment = async (loanId: string, repaymentId: string, amount: number) => {
    try {
        const accessToken = await getValidAccessToken();

        if (!accessToken) {
            return { error: "Unauthorized" };
        }

        const res = await axios.put(`${API_URL}/loan/pay_loan/${loanId}`, { repaymentId, amount }, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            withCredentials: true,
        });

        return res.data;
    } catch (error: any) {
        return error.response?.data || { error: "Unknown error occurred" };
    }
};

