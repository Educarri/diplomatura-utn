import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';
import { logger } from '../config/logger.js';

// @desc    Obtener todas las categorías con paginación
// @route   GET /api/categories
// @access  Public
export const getCategories = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const filters = {};
    if (req.query.activo) filters.activo = req.query.activo === 'true';

    const categories = await Category.find(filters)
      .skip(skip)
      .limit(limit)
      .sort({ nombre: 1 });

    const total = await Category.countDocuments(filters);

    res.status(200).json({
      success: true,
      count: categories.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: categories,
    });
  } catch (error) {
    logger.error(`Error al obtener categorías: ${error.message}`);
    next(error);
  }
};

// @desc    Obtener una categoría por ID
// @route   GET /api/categories/:id
// @access  Public
export const getCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }

    // Contar productos de esta categoría
    const productCount = await Product.countDocuments({
      categoria: req.params.id,
    });

    res.status(200).json({
      success: true,
      data: {
        ...category.toObject(),
        productCount,
      },
    });
  } catch (error) {
    logger.error(`Error al obtener categoría: ${error.message}`);
    next(error);
  }
};

// @desc    Crear una categoría
// @route   POST /api/categories
// @access  Private
export const createCategory = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    logger.info(`Categoría creada: ${category.nombre}`);

    res.status(201).json({
      success: true,
      data: category,
    });
  } catch (error) {
    logger.error(`Error al crear categoría: ${error.message}`);
    next(error);
  }
};

// @desc    Actualizar una categoría
// @route   PUT /api/categories/:id
// @access  Private
export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }

    logger.info(`Categoría actualizada: ${category.nombre}`);

    res.status(200).json({
      success: true,
      data: category,
    });
  } catch (error) {
    logger.error(`Error al actualizar categoría: ${error.message}`);
    next(error);
  }
};

// @desc    Eliminar una categoría
// @route   DELETE /api/categories/:id
// @access  Private
export const deleteCategory = async (req, res, next) => {
  try {
    // Verificar si hay productos con esta categoría
    const productCount = await Product.countDocuments({
      categoria: req.params.id,
    });

    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        message: `No se puede eliminar la categoría porque tiene ${productCount} producto(s) asociado(s)`,
      });
    }

    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Categoría no encontrada',
      });
    }

    logger.info(`Categoría eliminada: ${category.nombre}`);

    res.status(200).json({
      success: true,
      message: 'Categoría eliminada correctamente',
      data: {},
    });
  } catch (error) {
    logger.error(`Error al eliminar categoría: ${error.message}`);
    next(error);
  }
};