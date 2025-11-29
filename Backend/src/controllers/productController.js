import { Product } from '../models/Product.js';
import { logger } from '../config/logger.js';

// @desc    Obtener todos los productos con paginación
// @route   GET /api/products
// @access  Public
export const getProducts = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtros opcionales
    const filters = {};
    if (req.query.categoria) filters.categoria = req.query.categoria;
    if (req.query.activo) filters.activo = req.query.activo === 'true';

    const products = await Product.find(filters)
      .populate('categoria', 'nombre icono')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Product.countDocuments(filters);

    res.status(200).json({
      success: true,
      count: products.length,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      data: products,
    });
  } catch (error) {
    logger.error(`Error al obtener productos: ${error.message}`);
    next(error);
  }
};

// @desc    Obtener un producto por ID
// @route   GET /api/products/:id
// @access  Public
export const getProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      'categoria',
      'nombre descripcion icono'
    );

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    logger.error(`Error al obtener producto: ${error.message}`);
    next(error);
  }
};

// @desc    Crear un producto
// @route   POST /api/products
// @access  Private
export const createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);

    logger.info(`Producto creado: ${product.nombre}`);

    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    logger.error(`Error al crear producto: ${error.message}`);
    next(error);
  }
};

// @desc    Actualizar un producto
// @route   PUT /api/products/:id
// @access  Private
export const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('categoria', 'nombre icono');

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    logger.info(`Producto actualizado: ${product.nombre}`);

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    logger.error(`Error al actualizar producto: ${error.message}`);
    next(error);
  }
};

// @desc    Eliminar un producto
// @route   DELETE /api/products/:id
// @access  Private
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Producto no encontrado',
      });
    }

    logger.info(`Producto eliminado: ${product.nombre}`);

    res.status(200).json({
      success: true,
      message: 'Producto eliminado correctamente',
      data: {},
    });
  } catch (error) {
    logger.error(`Error al eliminar producto: ${error.message}`);
    next(error);
  }
};