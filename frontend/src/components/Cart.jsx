import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import fetchWithAuth from '../helpers/fetchHelper';
import './Cart.css';
import NotLoggedIn from './NotLoggedIn';
import { Link } from 'react-router';

const Cart = () => {
  const { cart, dispatch } = useCart();
  const { user } = useContext(AuthContext);

  const handleRemove = (product) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: product });
  };

  const handleSubmit = async () => {
    try {
      // Crea objeto de orden de compra a partir del estado actual de cart
      const direccion = user.direccion;
      let precio_total = 0.0;
      let obras_id = [];
      cart.forEach((item) => {
        precio_total += parseFloat(item.precio);
        obras_id.push(item.id);
      });
      const order = { direccion, precio_total, obras_id };

      const response = await fetchWithAuth(`${import.meta.env.VITE_API_URL}/api/orders`, {
        method: 'POST',
        body: JSON.stringify(order),
      });
      dispatch({ type: 'CLEAR_CART' });
    } catch (error) {
      console.log(error);
    }
  };

  if (!user) return <NotLoggedIn />;

  return (

      <div className="cart px-4 py-3">
        <h2 className="mb-5 fw-bold text-center">Carrito de Compras</h2>
        <div className="d-flex flex-column">
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item p-3 mb-3 rounded-2">
                <img
                  src={`${import.meta.env.VITE_API_URL}/${item.img_url}`}
                  alt={item.nombre}
                  style={{ width: '80px' }}
                />
                <div className="item-details">
                  <h4>{item.nombre}</h4>
                  <p>${item.precio}</p>
                  <button onClick={() => handleRemove(item)} className="btn btn-danger">
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
          <div className="d-flex justify-content-evenly m-3 gap-3">
            <Link to="/" className="btn btn-primary rounded-1 px-5 py-3">
              Seguir comprando
            </Link>
            <button
              className="btn btn-success rounded-1 px-5 py-3"
              disabled={cart.length === 0}
              onClick={handleSubmit}
            >
              Realizar pedido
            </button>
          </div>
        </div>
      </div>
  );
};

export default Cart;
