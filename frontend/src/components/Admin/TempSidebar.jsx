import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/" className="back-to-store-btn">
        🛍 Volver a la Tienda
      </Link>
      <h2>Admin Panel</h2>
      <nav>
        <ul>
          <li>
            <Link to="/admin/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/admin/obras">Obras de Arte</Link>
          </li>
          <li>
            <Link to="/admin/ordenes">Órdenes de Compra</Link>
          </li>
          <li>
            <Link to="/admin/usuarios">Usuarios</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
