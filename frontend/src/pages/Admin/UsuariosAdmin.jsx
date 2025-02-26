import { useState, useEffect } from 'react';
import fetchWithAuth from '../../helpers/fetchHelper';
import '../Admin/UsuariosAdmin.css'; // Importamos el archivo CSS

const UsuariosAdmin = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    nombre: '',
    apellido: '',
    direccion: '',
    telefono: '',
    rol: ''
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersArray = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/admin/users`);
        setUsers(usersArray);
        setLoading(false);
      } catch (err) {
        setError('Error al cargar usuarios');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

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

  const handleEdit = (user) => {
    setEditingUser(user.id);
    setFormData({
      email: user.email,
      nombre: user.nombre,
      apellido: user.apellido,
      direccion: user.direccion,
      telefono: user.telefono,
      rol: user.rol
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async (id) => {
    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/admin/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      // Actualizar el usuario en el estado
      const updatedUsers = users.map(user => 
        user.id === id ? { ...user, ...formData } : user
      );
      setUsers(updatedUsers);
      setEditingUser(null);
      alert('Usuario actualizado correctamente');
    } catch (err) {
      alert('Error actualizando usuario');
    }
  };

  const handleCancel = () => {
    setEditingUser(null);
  };

  if (loading) return <div className="loading-spinner">Cargando...</div>;
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="usuarios-admin-container">
      <h2 className="admin-title">Gestión de Usuarios</h2>
      <div className="table-container">
        <table className="usuarios-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Dirección</th>
              <th>Teléfono</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                
                {editingUser === user.id ? (
                  // Campos editables
                  <>
                    <td>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        name="nombre" 
                        value={formData.nombre} 
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        name="apellido" 
                        value={formData.apellido} 
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        name="direccion" 
                        value={formData.direccion} 
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <input 
                        type="text" 
                        name="telefono" 
                        value={formData.telefono} 
                        onChange={handleChange}
                        className="edit-input"
                      />
                    </td>
                    <td>
                      <select 
                        name="rol" 
                        value={formData.rol} 
                        onChange={handleChange}
                        className="edit-select"
                      >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                      </select>
                    </td>
                  </>
                ) : (
                  // Campos de solo lectura
                  <>
                    <td>{user.email}</td>
                    <td>{user.nombre}</td>
                    <td>{user.apellido}</td>
                    <td>{user.direccion}</td>
                    <td>{user.telefono}</td>
                    <td><span className={`rol-badge ${user.rol}`}>{user.rol}</span></td>
                  </>
                )}
                
                <td className="action-buttons">
                  {editingUser === user.id ? (
                    // Botones de guardar y cancelar
                    <div className="button-group">
                      <button 
                        onClick={() => handleSave(user.id)}
                        className="btn btn-save"
                      >
                        Guardar
                      </button>
                      <button 
                        onClick={handleCancel}
                        className="btn btn-cancel"
                      >
                        Cancelar
                      </button>
                    </div>
                  ) : (
                    // Botones de editar y eliminar
                    <div className="button-group">
                      <button 
                        onClick={() => handleEdit(user)}
                        className="btn btn-edit"
                      >
                        Editar
                      </button>
                      <button 
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-delete"
                      >
                        Eliminar
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsuariosAdmin;