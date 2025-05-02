import express from 'express';
import { initiatePayment, paymentNotification } from '../controllers/payementController.js';
const router = express.Router();

// checkout
router.post('/initiate/:orderId',initiatePayment)

// payment notification
router.post('/notify', paymentNotification)
  

export default router;