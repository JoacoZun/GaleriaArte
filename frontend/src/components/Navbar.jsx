import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const rol = user?.rol;
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigateTo('/');
  };

  return (
    <nav className="navbar navbar-expand-md" data-bs-theme="dark">
      <div className="container-lg">
        <div className="navbar-brand">
          <Link to="/" className="brand-container">
            <img src="/images/logo.png" alt="Galería de Arte" id="myBrand" />
            <span>Galería de arte</span>
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarLinks"
          aria-controls="navbarLinks"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse text-center" id="navbarLinks">
          <div className="navbar-nav ms-3 me-auto">
            <Link className="nav-link" to="/">
              Tienda
            </Link>

            {!user ? (
              <>
                <Link className="nav-link" to="/login">
                  Login
                </Link>
                <Link className="nav-link" to="/registro">
                  Registro
                </Link>
              </>
            ) : (
              <>
                <Link className="nav-link" to="/orders">
                  Mis compras
                </Link>
                <button className="nav-link" onClick={handleLogout} id="logoutButton">
                  Logout
                </button>
              </>
            )}
          </div>
          <div className="navbar-nav gap-2">
            <Link to="/profile" className="nav-link">
            {user? (<span className='mx-2'>{user.email} </span>) : null}<i className="fa-solid fa-user fa-lg"></i>
            </Link>
            <Link to="/cart" className="nav-link">
              <i className="fa-solid fa-cart-shopping fa-lg"></i>
            </Link>
            {rol == 'administrador' ? (
              <Link
                className="btn btn-outline-secondary rounded-1 ms-3 fw-bold"
                id="adminLink"
                to="/admin"
              >
                ADMIN PANEL
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
