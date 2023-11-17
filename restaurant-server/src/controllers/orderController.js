const Order = require('../models/order');

exports.getOrders = async (req, res) => {
    // Lógica para obtener todas las órdenes
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    }
    catch(error) {
        res.status
    }
};

exports.addOrder = async (req, res) => {
    // Lógica para añadir una nueva orden
    try {
        const nuevaOrden = new Order(req.body);
        const ordenGuardada = await nuevaOrden.save();
        res.status(201).json(ordenGuardada);
    }
    catch(error) {
        res.status(500).json({ message: error });
    }
};

exports.updateOrder = async (req, res) => {
    // Lógica para actualizar una orden
};

exports.deleteOrder = async (req, res) => {
    // Lógica para eliminar una orden
};