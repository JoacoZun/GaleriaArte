import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router';
import NotLoggedIn from './NotLoggedIn';

const Profile = () => {
  const { user } = useContext(AuthContext);

  if (!user) return <NotLoggedIn />;

  return (
      <div className="d-flex flex-column">
        <h2>
          Bienvenido, {user.nombre} {user.apellido}
        </h2>
        <p>Email: {user.email}</p>
      </div>
  );
};

export default Profile;
