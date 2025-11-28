import express from 'express';
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/productController.js';
import { protect } from '../middlewares/auth.js';
import {
  createProductValidation,
  updateProductValidation,
  idValidation,
} from '../validators/validators.js';

const router = express.Router();

router.route('/')
  .get(getProducts)
  .post(protect, createProductValidation, createProduct);

router.route('/:id')
  .get(idValidation, getProduct)
  .put(protect, updateProductValidation, updateProduct)
  .delete(protect, idValidation, deleteProduct);

export default router;