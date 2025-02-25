const Order = require('../models/Order');
const User = require('../models/User');

exports.createUserOrder = async (req, res) => {
  const email = req.user.email;
  try {
    const user = await User.getByEmail(email);
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const { precio_total, obras_id, direccion } = req.body;
    const createdOrder = await Order.create({
      user_id: user.id,
      direccion: direccion ? direccion : user.direccion,
      precio_total,
      obras_id,
    });
    res.status(201).json({
      message: 'Orden de compra creada exitosamente',
      data: createdOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la orden' });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    const user = await User.getByEmail(req.user.email);
    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const ordersArray = await Order.getAllByUserId(user.id);
    res.json(ordersArray);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener órdenes' });
  }
};

exports.getUserOrder = async (req, res) => {
  try {
    const user = await User.getByEmail(req.user.email);
    const { id: orderId } = req.params;

    if (!user) {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
    if (!Order.checkIfBelongsToUser(orderId, user.id)) {
      res.status(403).json({ error: 'Sin autorización' });
    }

    const order = await Order.getById(orderId);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener orden' });
  }
};

exports.cancelUserOrder = async (req, res) => {
  try {
    const { id: orderId } = req.params;
    const { email } = req.user;

    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const orderBelongs = await Order.checkIfBelongsToUser(orderId, user.id);
    if (!orderBelongs) {
      return res.status(403).json({ error: 'Sin autorización' });
    }

    const cancelledOrder = await Order.cancelById(orderId);
    res.json({
      message: 'Orden de compra cancelada correctamente',
      data: cancelledOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al cancelar la orden' });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.getAll();
    return res.json({ data: orders });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al obtener las órdenes' });
  }
};

exports.updateOrder = async (req, res) => {
  const { id: orderId } = req.params;
  const { estado } = req.body;
  try {
    const updatedOrder = await Order.updateById(orderId, estado);
    return res.json({ message: 'Orden actualizada correctamente', data: updatedOrder });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Error al actualizar la orden' });
  }
};

exports.getOrder = async (req, res) => {
  try {
    const { id: orderId } = req.params;
    const order = await Order.getById(orderId);
    res.json({ data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener orden' });
  }
};
