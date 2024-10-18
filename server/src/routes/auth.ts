import express, { Router } from 'express'
import { register } from '../controllers/auth/register'
import { login } from '../controllers/auth/login'
import { refreshAccessToken } from '../controllers/auth/refreshAccessToken'

const authRoute: Router = express.Router()

authRoute.post('/register', register)
authRoute.post('/login', login)
authRoute.post('/refresh_token', refreshAccessToken)

export default authRoute