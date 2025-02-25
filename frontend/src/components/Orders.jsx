import { useEffect, useState } from 'react';
import fetchWithAuth from '../helpers/fetchHelper';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      const data = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/orders`);
      setOrders(data);
    };
    fetchOrders().then(() => setIsLoading(false));
  }, []);

  const handleCancelOrder = async (id) => {
    const data = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/orders/${id}`, {
      method: 'PATCH',
    });
    setOrders((prev) =>
      prev.map((order) => (order.id == id ? { ...order, estado: 'cancelada' } : order))
    );
  };

  return (
    <div className="container-md d-flex flex-column align-items-center m-0">
      <h1 className="mt-5">Mis órdenes de compra</h1>
      <table className="table text-center table-hover table-borderless client-table">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Total de pedido</th>
            <th>Dirección de envío</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody className="table">
          {isLoading
            ? null
            : orders?.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.precio_total}</td>
                  <td>{order.direccion}</td>
                  <td>{order.estado}</td>
                  <td>
                    {order.estado == 'pendiente' ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        Cancelar
                      </button>
                    ) : (
                      <button className="btn btn-secondary" disabled>
                        Cancelar
                      </button>
                    )}
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
export default Orders;
