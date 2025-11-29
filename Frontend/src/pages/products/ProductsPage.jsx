import { useState } from 'react';
import { useProducts } from '../../hooks/useProducts';
import Pagination from '../../components/Pagination';
import ProductCard from './ProductCard';
import ProductForm from './ProductForm';
import './ProductsPage.css';

const ProductsPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const { products, loading, error, pagination, fetchProducts, deleteProduct } = useProducts();

  const handlePageChange = (page) => {
    fetchProducts(page);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id, nombre) => {
    if (!window.confirm(`¿Estás seguro de eliminar "${nombre}"?`)) {
      return;
    }

    const result = await deleteProduct(id);
    if (result.success) {
      setSuccessMessage('Producto eliminado correctamente');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      alert(result.message);
    }
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProduct(null);
    fetchProducts(pagination.currentPage);
    setSuccessMessage(editingProduct ? 'Producto actualizado correctamente' : 'Producto creado correctamente');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  return (
    <div className="container">
      <div className="products-header">
        <h1>Gestión de Productos</h1>
        {!showForm && (
          <button onClick={handleCreate} className="btn btn-primary">
            ➕ Nuevo Producto
          </button>
        )}
      </div>

      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}

      {error && <div className="alert alert-error">{error}</div>}

      {showForm ? (
        <ProductForm
          product={editingProduct}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      ) : (
        <>
          {loading ? (
            <div className="loading">Cargando productos...</div>
          ) : products.length === 0 ? (
            <div className="card">
              <p style={{ textAlign: 'center', color: '#666' }}>
                No hay productos disponibles. ¡Crea el primero!
              </p>
            </div>
          ) : (
            <>
              <div className="products-grid">
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </div>

              <Pagination
                currentPage={pagination.currentPage}
                totalPages={pagination.totalPages}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ProductsPage;