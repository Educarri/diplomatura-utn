import api from '../config/api';

// Obtener todos los productos
export const getProducts = async () => {
  const res = await api.get('/products');
  return res.data.data;
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  const res = await api.get(`/products/${id}`);
  return res.data.data;
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
  const res = await api.post('/products', productData);
  return res.data.data;
};

// Actualizar un producto
export const updateProduct = async (id, productData) => {
  const res = await api.put(`/products/${id}`, productData);
  return res.data.data;
};

// Eliminar un producto
export const deleteProduct = async (id) => {
  const res = await api.delete(`/products/${id}`);
  return res.data.data;
};
