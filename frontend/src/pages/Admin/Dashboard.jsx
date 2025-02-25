import { useEffect, useState } from "react";
import fetchWithAuth from "../../helpers/fetchHelper";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    users: 0,
    orders: 0,
    artworks: 0,
    totalSales: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {

        const usersResponse = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/admin/users`);
        const usersCount = Array.isArray(usersResponse) ? usersResponse.length : 0;

     
        const ordersResponse = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/admin/orders`);
        const ordersArray = ordersResponse.data || [];
        const ordersCount = ordersArray.length;

       
        const totalSales = ordersArray
          .filter(order => order.estado === "Enviado")
          .reduce((sum, order) => sum + parseFloat(order.precio_total || 0), 0);

    
        const artworksResponse = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/artworks`);
        const artworksCount = Array.isArray(artworksResponse) ? artworksResponse.length : 0;

        setStats({
          users: usersCount,
          orders: ordersCount,
          artworks: artworksCount,
          totalSales: totalSales,
        });
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Dashboard - Bienvenido al Panel de Administración</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Usuarios Registrados</h2>
          <p className="text-3xl font-bold">{stats.users}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Órdenes Realizadas</h2>
          <p className="text-3xl font-bold">{stats.orders}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Obras en Venta</h2>
          <p className="text-3xl font-bold">{stats.artworks}</p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2">Ventas Totales</h2>
          <p className="text-3xl font-bold">${stats.totalSales.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;