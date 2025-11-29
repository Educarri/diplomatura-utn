import React, { useState, useEffect } from "react";
import * as productService from "../../services/productService";
import { categoryService } from "../../services/categoryService";

const ProductForm = ({ product, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState(
    product || {
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
      categoria: "",
      imagen: "",
      marca: "",
      activo: true,
    }
  );
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll();
      const data = response.data || response;
      setCategories(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error al cargar categorías:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validar que se haya seleccionado una categoría
    if (!formData.categoria) {
      setError("Debes seleccionar una categoría");
      setLoading(false);
      return;
    }

    try {
      if (product && product._id) {
        // Editar producto existente
        await productService.updateProduct(product._id, formData);
      } else {
        // Crear nuevo producto
        await productService.createProduct(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="product-form" onSubmit={handleSubmit}>
      <h2>{product ? "Editar producto" : "Crear producto"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>Nombre *</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <label>Descripción *</label>
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        required
      />

      <label>Precio *</label>
      <input
        type="number"
        name="precio"
        value={formData.precio}
        onChange={handleChange}
        step="0.01"
        min="0"
        required
      />

      <label>Stock *</label>
      <input
        type="number"
        name="stock"
        value={formData.stock}
        onChange={handleChange}
        min="0"
        required
      />

      <label>Categoría *</label>
      <select
        name="categoria"
        value={formData.categoria}
        onChange={handleChange}
        required
      >
        <option value="">-- Selecciona una categoría --</option>
        {categories.map((cat) => (
          <option key={cat._id} value={cat._id}>
            {cat.nombre}
          </option>
        ))}
      </select>

      <label>Marca</label>
      <input
        type="text"
        name="marca"
        value={formData.marca}
        onChange={handleChange}
        placeholder="Ej: Nike, Adidas, etc."
      />

      <label>Imagen (URL)</label>
      <input
        type="text"
        name="imagen"
        value={formData.imagen}
        onChange={handleChange}
        placeholder="https://..."
      />

      <label>
        <input
          type="checkbox"
          name="activo"
          checked={formData.activo}
          onChange={handleChange}
        />
        {" "}Producto activo
      </label>

      <div className="form-buttons">
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : product ? "Guardar cambios" : "Crear producto"}
        </button>
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default ProductForm;
