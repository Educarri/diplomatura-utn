import { useState, useEffect, useCallback } from 'react';
import * as productService from '../services/productService';

export const useProducts = (initialPage = 1, limit = 9) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: initialPage,
    totalPages: 1,
    total: 0,
  });

  const fetchProducts = useCallback(async (page = initialPage, filters = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await productService.getAll(page, limit, filters);
      setProducts(data.data);
      setPagination({
        currentPage: data.currentPage,
        totalPages: data.totalPages,
        total: data.total,
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Error al cargar productos');
    } finally {
      setLoading(false);
    }
  }, [initialPage, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const deleteProduct = async (id) => {
    try {
      await productService.delete(id);
      fetchProducts(pagination.currentPage);
      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || 'Error al eliminar producto',
      };
    }
  };

  return {
    products,
    loading,
    error,
    pagination,
    fetchProducts,
    deleteProduct,
  };
};