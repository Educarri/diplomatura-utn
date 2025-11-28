import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { productService } from '../../services/productService';
import './HomePage.css';

const HomePage = () => {
  const { user, isAuthenticated } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await productService.getAll(1, 6);
      setProducts(data.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="home-hero">
        <h1 className="home-title">
          {isAuthenticated
            ? `¡Bienvenido, ${user?.nombre}! 👋`
            : '¡Bienvenido a Librería Online! 📚'}
        </h1>
        <p className="home-subtitle">
          Encuentra todos los productos de librería que necesitas
        </p>
      </div>

      {!isAuthenticated && (
        <div className="home-cta">
          <Link to="/register" className="btn btn-primary btn-lg">
            Crear Cuenta
          </Link>
          <Link to="/login" className="btn btn-secondary btn-lg">
            Iniciar Sesión
          </Link>
        </div>
      )}

      <section className="home-section">
        <h2 className="section-title">Productos Destacados</h2>

        {loading ? (
          <div className="loading">Cargando productos...</div>
        ) : (
          <>
            <div className="products-grid">
              {products.map((product) => (
                <div key={product._id} className="product-card-home">
                  <img
                    src={product.imagen}
                    alt={product.nombre}
                    className="product-image-home"
                  />
                  <div className="product-info-home">
                    <h3 className="product-name-home">{product.nombre}</h3>
                    <p className="product-price-home">${product.precio}</p>
                    <p className="product-stock-home">
                      Stock: {product.stock} unidades
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {isAuthenticated && (
              <div className="home-cta">
                <Link to="/products" className="btn btn-primary">
                  Ver Todos los Productos
                </Link>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
};

export default HomePage;