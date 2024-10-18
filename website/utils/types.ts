export interface User {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface Error {
    field: string;
    message: string;
}

export interface Repayment {
    date: string;
    amount: number;
    status: string;
}

export interface Loan {
    loanId: string;
    customerEmail: string;
    customerId: string;
    customerName: string;
    amount: number;
    term: number;
    status: "PENDING" | "APPROVED" | "COMPLETED";
    repayments: Repayment[];
}
