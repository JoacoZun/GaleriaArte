import { Link, useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const rol = user?.rol;
  const navigateTo = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigateTo('/');
    closeNavbar();
  };

  const closeNavbar = () => {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (navbarToggler && navbarCollapse) {
      navbarToggler.classList.add('collapsed');
      navbarToggler.setAttribute('aria-expanded', 'false');
      navbarCollapse.classList.remove('show');
    }
  };

  useEffect(() => {
    // Add event listeners to close navbar when a link is clicked
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    
    navLinks.forEach(link => {
      link.addEventListener('click', closeNavbar);
    });

    // Cleanup event listeners
    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', closeNavbar);
      });
    };
  }, []);

  return (
    <nav className="navbar navbar-expand-md" data-bs-theme="dark">
      <div className="container-lg">
        <div className="navbar-brand">
          <Link to="/" className="brand-container" onClick={closeNavbar}>
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
            <Link to="/profile" className="nav-link" onClick={closeNavbar}>
              {user? (<span className='mx-2'>{user.email} </span>) : null}<i className="fa-solid fa-user fa-lg"></i>
            </Link>
            <Link to="/cart" className="nav-link" onClick={closeNavbar}>
              <i className="fa-solid fa-cart-shopping fa-lg"></i>
            </Link>
            {rol == 'administrador' ? (
              <Link
                className="btn btn-outline-secondary rounded-1 ms-3 fw-bold"
                id="adminLink"
                to="/admin"
                onClick={closeNavbar}
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