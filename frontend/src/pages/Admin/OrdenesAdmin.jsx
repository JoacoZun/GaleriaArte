import { useEffect, useState } from "react";
import fetchWithAuth from "../../helpers/fetchHelper";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/admin/orders`);
        // Extraemos el array de órdenes de la propiedad data
        const ordersArray = response.data || [];
        setOrders(ordersArray);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al cargar órdenes:", error);
        setError("Error al cargar las órdenes");
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/admin/orders/${orderId}`, {
        method: "PUT",
        body: JSON.stringify({ estado: newStatus }),
      });

      if (response.data) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === orderId ? { ...order, estado: newStatus } : order
          )
        );
      }
    } catch (error) {
      console.error("Error al actualizar orden:", error);
      setError("Error al actualizar el estado de la orden");
    }
  };

  if (isLoading) {
    return <div>Cargando órdenes...</div>;
  }

  if (error) {
    return <div className="text-danger">{error}</div>;
  }

  return (
    <div className="container-md d-flex flex-column align-items-center m-0">
      <h1 className="mt-5">Gestión de Órdenes de Compra</h1>
      {orders.length === 0 ? (
        <p>No hay órdenes disponibles</p>
      ) : (
        <table className="table text-center table-hover table-borderless admin-table">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Total</th>
              <th>Dirección</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.user_email}</td>
                <td>${order.precio_total}</td>
                <td>{order.direccion}</td>
                <td>{order.estado}</td>
                <td>
                  <div className="btn-group" role="group">
                    <button 
                      className="btn btn-success btn-sm"
                      onClick={() => updateOrderStatus(order.id, "Enviado")}
                      disabled={order.estado === "Enviado" || order.estado === "Entregado"}
                    >
                      Marcar Enviado
                    </button>
                    <button 
                      className="btn btn-primary btn-sm"
                      onClick={() => updateOrderStatus(order.id, "Entregado")}
                      disabled={order.estado === "Entregado"}
                    >
                      Marcar Entregado
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default OrdersManagement;