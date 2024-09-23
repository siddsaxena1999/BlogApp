import express from 'express';
import { registerUser, loginUser, validateProfile, logout } from '../controllers/user.controllers.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', validateProfile);
router.get('/logout', logout);


export default router;