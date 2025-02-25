import React, { useState, useEffect } from "react";
import { fetchWithAuth } from "../../helpers/fetchHelper";
import "./Tabla.css";

const TablaObras = () => {
  const [obras, setObras] = useState([]);

  useEffect(() => {
    fetchWithAuth(`${import.meta.env.VITE_API_URL/admin/artworks}`)
      .then((data) => setObras(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="table-container">
      <h3>Gestión de Obras</h3>
      <table className="tabla">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Autor</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {obras.map((obra) => (
            <tr key={obra.id}>
              <td>{obra.nombre}</td>
              <td>{obra.autor}</td>
              <td>
                <button>Editar</button>
                <button>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablaObras;
