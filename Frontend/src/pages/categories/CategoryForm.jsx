import React, { useState } from "react";
import { categoryService } from "../../services/categoryService";

const CategoryForm = ({ category, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState(
    category || {
      nombre: "",
      descripcion: "",
      icono: "📦",
      activo: true,
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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

    try {
      if (category && category._id) {
        // Editar categoría existente
        await categoryService.update(category._id, formData);
      } else {
        // Crear nueva categoría
        await categoryService.create(formData);
      }
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error al guardar la categoría");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="category-form" onSubmit={handleSubmit}>
      <h2>{category ? "Editar categoría" : "Crear categoría"}</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <label>Nombre *</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        placeholder="Ej: Libros, Tecnología, etc."
        required
      />

      <label>Descripción *</label>
      <textarea
        name="descripcion"
        value={formData.descripcion}
        onChange={handleChange}
        placeholder="Describe brevemente esta categoría"
        required
      />

      <label>Ícono (emoji o URL)</label>
      <input
        type="text"
        name="icono"
        value={formData.icono}
        onChange={handleChange}
        placeholder="Ej: 📚, 🎮, 👕, etc."
      />

      <label>
        <input
          type="checkbox"
          name="activo"
          checked={formData.activo}
          onChange={handleChange}
        />
        {" "}Categoría activa
      </label>

      <div className="form-buttons">
        <button type="submit" disabled={loading}>
          {loading ? "Guardando..." : category ? "Guardar cambios" : "Crear categoría"}
        </button>
        <button type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;
