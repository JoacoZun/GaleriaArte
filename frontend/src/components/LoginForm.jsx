import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/users/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      // Guardar usuario en contexto
      login(data);

      // Redirigir al perfil del usuario
      navigate("/profile");

    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-view-height">
      <form className="m-3 p-3 rounded" id="loginForm" onSubmit={handleSubmit}>
        <h1 className="text-center p-3">Login</h1>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-4">
          <input
            type="email"
            id="email"
            className="form-control"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
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
            className="form-control"
            onChange={(e) => setUserPassword(e.target.value)}
            value={userPassword}
            required
          />
          <label className="form-label" htmlFor="password">
            Contraseña
          </label>
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-primary btn-block mb-4">
            Ingresa.
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
