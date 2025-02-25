import { useState } from 'react';

const RegisterForm = () => {
  const emptyForm = {
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    password2: '',
    direccion: '',
  };

  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false); // Indicador de carga

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validaciones del formulario
    if (
      !formData.nombre ||
      !formData.apellido ||
      !formData.email ||
      !formData.password ||
      !formData.password2
    ) {
      setError('Todos los campos son necesarios.');
      return;
    }

    if (formData.password !== formData.password2) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    setLoading(true); // Comienza la carga

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/users/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellido: formData.apellido,
          email: formData.email,
          password: formData.password,
          direccion: formData.direccion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error en el registro');
      }

      setSuccess('Usuario registrado exitosamente');
      setFormData(emptyForm); // Limpiar el formulario
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false); // Finaliza la carga
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-view-height">
      <form className="m-3 p-3 rounded" id="registerForm" onSubmit={handleSubmit}>
        <h1 className="text-center p-3">Registro</h1>

        {error && <div className="alert alert-danger">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="row mb-4">
          <div className="col">
            <div>
              <input
                type="text"
                id="nombre"
                name="nombre"
                className="form-control"
                onChange={handleChange}
                value={formData.nombre}
                required
              />
              <label className="form-label" htmlFor="nombre">
                Nombre
              </label>
            </div>
          </div>
          <div className="col">
            <div>
              <input
                type="text"
                id="apellido"
                name="apellido"
                className="form-control"
                onChange={handleChange}
                value={formData.apellido}
                required
              />
              <label className="form-label" htmlFor="apellido">
                Apellido
              </label>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            onChange={handleChange}
            value={formData.email}
            required
          />
          <label className="form-label" htmlFor="email">
            Email
          </label>
        </div>

        <div className="mb-4">
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            onChange={handleChange}
            value={formData.password}
            required
          />
          <label className="form-label" htmlFor="password">
            Contraseña
          </label>
        </div>

        <div className="mb-4">
          <input
            type="password"
            id="password2"
            name="password2"
            className="form-control"
            onChange={handleChange}
            value={formData.password2}
            required
          />
          <label className="form-label" htmlFor="password2">
            Repita contraseña
          </label>
        </div>

        <div className="mb-4">
          <input
            type="text"
            id="direccion"
            name="direccion"
            className="form-control"
            onChange={handleChange}
            value={formData.direccion}
            required
          />
          <label className="form-label" htmlFor="direccion">
            Dirección para envíos
          </label>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-block mb-4" disabled={loading}>
            {loading ? 'Cargando...' : 'Registrarse'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
