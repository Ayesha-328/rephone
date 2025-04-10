import express from 'express';
import { uploadPhone, 
    getAllPhones, 
    getPhoneDetails, 
    getVerifiedPhones, 
    getPendingPhones, 
    updatePhone,
    deletePhone,
    getPhoneBrands,
    getPhoneModels,
    getStorageVariants
} from '../controllers/productController.js';
import { validateUploadPhone } from '../middlewares/validation.js';
import { protect } from '../middlewares/authMiddleware.js';
// import { getProducts, getProductById, deleteProduct, createProduct, updateProduct, createProductReview } from '../controllers/productController.js';


const router = express.Router();

// Get all phone brands
router.get('/brands', getPhoneBrands); 

// Get models for a specific brand
router.get('/models/:brand', getPhoneModels); 

// Get storage variants for a specific model
router.get('/storage/:model', getStorageVariants); 

// Seller uplaod phone
router.post('/upload', protect,validateUploadPhone, uploadPhone);

// get all phones
router.get('/all', getAllPhones);


// get all verified phones
router.get('/verified', getVerifiedPhones);

// get all verified phones
router.get('/pending', getPendingPhones);

// get a phone details
router.get('/:id', getPhoneDetails);

// update phone details
router.put('/update/:id', protect, updatePhone);

// delete an uploaded phone
router.delete('/delete/:id', protect, deletePhone);




export default router;