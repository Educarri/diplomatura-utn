import { useState } from 'react';
import { useCategories } from '../../hooks/useCategories';
import CategoryCard from './CategoryCard';
import CategoryForm from './CategoryForm';
import './CategoriesPage.css';

const CategoriesPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const { categories, loading, error, fetchCategories, deleteCategory } = useCategories();

  const handleCreate = () => {
    setEditingCategory(null);
    setShowForm(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setShowForm(true);
  };

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar la categoría "${nombre}"?`)) {
      return;
    }

    const result = await deleteCategory(id);
    if (result.success) {
      setSuccessMessage('Categoría eliminada correctamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      alert(result.message);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingCategory(null);
    fetchCategories();
    setSuccessMessage(
      editingCategory
        ? 'Categoría actualizada correctamente'
        : 'Categoría creada correctamente'
    );
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingCategory(null);
  };

  return (
    <div className="container">
      <div className="categories-header">
        <h1>Gestión de Categorías</h1>
        {!showForm && (
          <button onClick={handleCreate} className="btn btn-primary">
            ➕ Nueva Categoría
          </button>
        )}
      </div>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      {showForm ? (
        <CategoryForm
          category={editingCategory}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <>
          {loading ? (
            <div className="loading">Cargando categorías...</div>
          ) : categories.length === 0 ? (
            <div className="card">
              <p style={{ textAlign: 'center', color: '#666' }}>
                No hay categorías disponibles. ¡Crea la primera!
              </p>
            </div>
          ) : (
            <div className="categories-grid">
              {categories.map((category) => (
                <CategoryCard
                  key={category._id}
                  category={category}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default CategoriesPage;