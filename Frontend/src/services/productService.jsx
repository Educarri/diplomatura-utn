// src/services/productService.jsx

const API_URL = "http://localhost:5000/api/products"; // ajustá la URL según tu backend

// Obtener todos los productos
export const getProducts = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Error al obtener productos");
  return res.json();
};

// Obtener un producto por ID
export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Error al obtener producto");
  return res.json();
};

// Crear un nuevo producto
export const createProduct = async (productData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Error al crear producto");
  return res.json();
};

// Actualizar un producto
export const updateProduct = async (id, productData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  if (!res.ok) throw new Error("Error al actualizar producto");
  return res.json();
};

// Eliminar un producto
export const deleteProduct = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return res.json();
};
