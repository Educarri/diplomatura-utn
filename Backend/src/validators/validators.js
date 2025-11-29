import { body, param, validationResult } from 'express-validator';

export const validateRequest = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next();
};

// Validaciones para autenticación
export const registerValidation = [
  body('nombre').notEmpty().withMessage('El nombre es requerido').trim(),
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail()
    .trim(),
  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  validateRequest,
];

export const loginValidation = [
  body('email')
    .isEmail()
    .withMessage('Email inválido')
    .normalizeEmail()
    .trim(),
  body('password').notEmpty().withMessage('La contraseña es requerida'),
  validateRequest,
];

// Validaciones para productos
export const createProductValidation = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .trim()
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'),
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es requerida')
    .trim(),
  body('precio')
    .isNumeric()
    .withMessage('El precio debe ser un número')
    .isFloat({ min: 0 })
    .withMessage('El precio no puede ser negativo'),
  body('stock')
    .isNumeric()
    .withMessage('El stock debe ser un número')
    .isInt({ min: 0 })
    .withMessage('El stock no puede ser negativo'),
  body('categoria')
    .notEmpty()
    .withMessage('La categoría es requerida')
    .isMongoId()
    .withMessage('ID de categoría inválido'),
  validateRequest,
];

export const updateProductValidation = [
  param('id').isMongoId().withMessage('ID de producto inválido'),
  body('nombre').optional().trim().isLength({ min: 3 }),
  body('descripcion').optional().trim(),
  body('precio').optional().isFloat({ min: 0 }),
  body('stock').optional().isInt({ min: 0 }),
  body('categoria').optional().isMongoId(),
  validateRequest,
];

// Validaciones para categorías
export const createCategoryValidation = [
  body('nombre')
    .notEmpty()
    .withMessage('El nombre es requerido')
    .trim()
    .isLength({ min: 3 })
    .withMessage('El nombre debe tener al menos 3 caracteres'),
  body('descripcion')
    .notEmpty()
    .withMessage('La descripción es requerida')
    .trim(),
  validateRequest,
];

export const updateCategoryValidation = [
  param('id').isMongoId().withMessage('ID de categoría inválido'),
  body('nombre').optional().trim().isLength({ min: 3 }),
  body('descripcion').optional().trim(),
  validateRequest,
];

export const idValidation = [
  param('id').isMongoId().withMessage('ID inválido'),
  validateRequest,
];