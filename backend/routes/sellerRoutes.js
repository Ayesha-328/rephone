import express from 'express';
import { loginSeller, registerSeller, getSellerProfile, updateSellerProfile, deleteSellerProfile, getAllSellers} from '../controllers/sellerController.js';
import { validateRegistration, validateLogin, validateUpdateSeller } from '../middlewares/validation.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// register
router.post('/register',validateRegistration, registerSeller)

// login
router.post('/login',validateLogin, loginSeller)

// profile info
router.get('/profile/:query',protect, getSellerProfile)

// update profile
router.put('/update/:query',protect, validateUpdateSeller, updateSellerProfile)

// delete seller profile
router.delete('/delete/:query',protect, deleteSellerProfile)

// get all sellers
router.get('/all', protect, getAllSellers)

export default router;