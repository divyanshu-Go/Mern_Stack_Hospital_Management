import express from 'express'
import { getAllMessages, sendMessage } from '../Controller/messageController.js';
import { isAdminAuthenticated } from '../Middlewares/auth.js';

const router = express.Router();

router.post('/send', sendMessage)
router.get('/getAllMessages',isAdminAuthenticated, getAllMessages)

export default router;