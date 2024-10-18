import express, { Router } from 'express';
import verifyToken from '../middlewares/verifyToken';
import { userProfile } from '../controllers/profile/userProfile';

const router: Router = express.Router();

router.get('/user_profile', verifyToken, userProfile)

export default router;