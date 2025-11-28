import express from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect } from '../middlewares/auth.js';
import {
  createCategoryValidation,
  updateCategoryValidation,
  idValidation,
} from '../validators/validators.js';

const router = express.Router();

router.route('/')
  .get(getCategories)
  .post(protect, createCategoryValidation, createCategory);

router.route('/:id')
  .get(idValidation, getCategory)
  .put(protect, updateCategoryValidation, updateCategory)
  .delete(protect, idValidation, deleteCategory);

export default router;