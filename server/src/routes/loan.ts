import express, { Router } from 'express'
import { applyLoan } from '../controllers/loan/applyLoan'
import verifyToken from '../middlewares/verifyToken'
import { repayLoan } from '../controllers/loan/rePayLoan'
import { getAllLoans } from '../controllers/loan/getAllLoans'
import { updateLoanStatus } from '../controllers/loan/updateLoanStatus'
import { userLoan } from '../controllers/loan/userLoan'

const loanRoute: Router = express.Router()

loanRoute.post('/apply_loan', verifyToken, applyLoan)
loanRoute.get('/user_loan', verifyToken, userLoan)
loanRoute.put("/loan_status", updateLoanStatus);
loanRoute.get("/all_loans", getAllLoans);
loanRoute.put('/pay_loan/:loanId', verifyToken, repayLoan)

export default loanRoute