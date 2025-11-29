import React from "react";
import "./CategoryCard.css";

const CategoryCard = ({ category, onEdit, onDelete }) => {
  return (
    <div className="category-card card">
      <div className="category-icon">{category.icono}</div>
      <h3>{category.nombre}</h3>
      <p>{category.descripcion}</p>
      <div className="category-status">
        {category.activo ? (
          <span className="badge badge-success">Activa</span>
        ) : (
          <span className="badge badge-danger">Inactiva</span>
        )}
      </div>
      <div className="category-actions">
        <button
          onClick={() => onEdit(category)}
          className="btn btn-secondary"
        >
          ✏️ Editar
        </button>
        <button
          onClick={() => onDelete(category._id, category.nombre)}
          className="btn btn-danger"
        >
          🗑️ Eliminar
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
