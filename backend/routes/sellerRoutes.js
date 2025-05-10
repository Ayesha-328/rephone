import express from 'express';
import { loginSeller, registerSeller, getSellerProfile, updateSellerProfile, deleteSellerProfile, getSellerPhones, getSellerOrders,getListingStatusCounts,getSellerMetrics,uploadPhone} from '../controllers/sellerController.js';
import { validateRegistration, validateLogin, validateUpdateSeller } from '../middlewares/validation.js';
import { protect } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/uploadProfilePic.js';
import { validateUploadPhone } from '../middlewares/validation.js';
import { uploadPhoneImages } from '../middlewares/uploadPhoneImage.js';

const router = express.Router();

// register
router.post('/register',upload,validateRegistration, registerSeller)

// login
router.post('/login',validateLogin, loginSeller)

// profile info
router.get('/profile/:query',protect, getSellerProfile)

// update profile
router.put('/update/:query',protect, upload, validateUpdateSeller, updateSellerProfile)

// delete seller profile
router.delete('/delete/:query',protect, deleteSellerProfile)

// get all listed phones of a seller
router.get('/phones/:sellerId', protect, getSellerPhones)

// get all orders of a seller
router.get('/orders/:sellerId', protect, getSellerOrders)


router.get('/metrics/:sellerId', protect ,getSellerMetrics);

router.get('/listing-status/:sellerId', protect,  getListingStatusCounts);

// Seller uplaod phone
router.post('/upload', protect, validateUploadPhone, uploadPhoneImages,uploadPhone);
export default router;