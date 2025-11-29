import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          📚 Librería Online
        </Link>

        <div className="navbar-menu">
          {isAuthenticated ? (
            <>
              <Link to="/" className="navbar-link">
                Inicio
              </Link>
              <Link to="/products" className="navbar-link">
                Productos
              </Link>
              <Link to="/categories" className="navbar-link">
                Categorías
              </Link>
              <div className="navbar-user">
                <span className="navbar-username">👤 {user?.nombre}</span>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Salir
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-primary">
                Iniciar Sesión
              </Link>
              <Link to="/register" className="btn btn-success">
                Registrarse
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;