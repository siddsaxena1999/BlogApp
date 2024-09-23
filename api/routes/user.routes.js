import express from 'express';
import { registerUser, loginUser, validateProfile, logout } from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/api/register', registerUser);
router.post('/api/login', loginUser);
router.get('/api/profile', validateProfile);
router.get('/api/logout', logout);


export default router;