import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import authRoute from './routes/auth';
import profileRoute from './routes/profile';
import loanRoute from './routes/loan';

const app = express()

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser())

app.use('/api/v1/auth', authRoute);
app.use('/api/v1/profile', profileRoute);
app.use('/api/v1/loan', loanRoute);

export default app