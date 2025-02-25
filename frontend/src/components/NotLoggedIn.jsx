import { Link } from 'react-router';

const NotLoggedIn = () => {
  return (
    <div className="d-flex flex-grow-1 flex-column justify-content-center">
      <p>No has iniciado sesión</p>
      <Link className="btn btn-primary rounded-1 py-2 px-5" to={'/login'}>
        Ir al login
      </Link>
    </div>
  );
};
export default NotLoggedIn;
