import { useState, useEffect } from 'react';
import fetchWithAuth from '../../helpers/fetchHelper';

const UsuariosAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersArray = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/admin/users`);
      setUsers(usersArray);
    };
    fetchUsers().then(() => setLoading(false));
  }, [fetchWithAuth]);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar este usuario?')) return;
    try {
      await fetchWithAuth(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, {
        method: 'DELETE',
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      alert('Error eliminando usuario');
    }
  };

  return (
    <>
      {loading ? (
        <div>Loading </div>
      ) : (
        <>
          <h2 className="mb-4">Gestión de Usuarios</h2>
          <table className="obras-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Email</th>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Dirección</th>
                <th>Teléfono</th>
                <th>Rol</th>
                <th colSpan={2}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.nombre}</td>
                  <td>{user.apellido}</td>
                  <td>{user.direccion}</td>
                  <td>{user.telefono}</td>
                  <td>{user.rol}</td>
                  <td>
                    <button className="btn btn-warning">Editar</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(user.id)}>
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </>
  );
};

export default UsuariosAdmin;
