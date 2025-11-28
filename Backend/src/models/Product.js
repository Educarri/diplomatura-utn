import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre es requerido'],
      trim: true,
    },
    descripcion: {
      type: String,
      required: [true, 'La descripción es requerida'],
      trim: true,
    },
    precio: {
      type: Number,
      required: [true, 'El precio es requerido'],
      min: [0, 'El precio no puede ser negativo'],
    },
    stock: {
      type: Number,
      required: [true, 'El stock es requerido'],
      min: [0, 'El stock no puede ser negativo'],
      default: 0,
    },
    categoria: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: [true, 'La categoría es requerida'],
    },
    imagen: {
      type: String,
      default: 'https://via.placeholder.com/300x300?text=Producto',
    },
    marca: {
      type: String,
      trim: true,
      default: 'Sin marca',
    },
    activo: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model('Product', productSchema);