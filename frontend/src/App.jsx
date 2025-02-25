import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Dashboard from './pages/Admin/Dashboard';
import ObrasAdmin from './pages/Admin/ObrasAdmin';
import OrdenesAdmin from './pages/Admin/OrdenesAdmin';
import UsuariosAdmin from './pages/Admin/UsuariosAdmin';
import Sidebar from './components/Admin/TempSidebar';
import Profile from './components/Profile';
import './App.css';
import { CartProvider } from './context/CartContext';
import AuthProvider from './context/AuthContext';
import Terms from './pages/Terms';
import Orders from './components/Orders';

const PrivateRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  if (!user || user?.rol !== role) {
    return <Navigate to="/login" />;
  }
  return children;
};

const Layout = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {!isAdminRoute && <Navbar />}
      <div className={isAdminRoute ? 'admin-layout' : 'main-layout'}>{children}</div>
      {!isAdminRoute && <Footer />}
    </div>
  );
};

const AdminLayout = () => (
  <div className="admin-container">
    <Sidebar />
    <div className="admin-content">
      <Routes>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="obras" element={<ObrasAdmin />} />
        <Route path="ordenes" element={<OrdenesAdmin />} />
        <Route path="usuarios" element={<UsuariosAdmin />} />
      </Routes>
    </div>
  </div>
);

const App = () => (
  <AuthProvider>
    <CartProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Rutas principales */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/registro" element={<RegisterForm />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/terms" element={<Terms />} />

            {/* Rutas de administrador */}
            <Route
              path="/admin/*"
              element={
                <PrivateRoute role="administrador">
                  <AdminLayout />
                </PrivateRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </CartProvider>
  </AuthProvider>
);

export default App;
