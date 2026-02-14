import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing order using stripe simulation
const placeOrder = async (req, res) => {
    try {
        await orderModel.create({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            paymentMethod: req.body.paymentMethod,
            payment: req.body.paymentMethod === "COD" ? false : true
        });

        await userModel.update({ cartData: {} }, { where: { id: req.body.userId } });

        res.json({ success: true, message: "Order Placed Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// user orders for frontend
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.findAll({ where: { userId: req.body.userId } });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// listing orders for admin panel
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.findAll({});
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// api for updating order status
const updateStatus = async (req, res) => {
    try {
        await orderModel.update({ status: req.body.status }, {
            where: { id: req.body.orderId }
        });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { placeOrder, userOrders, listOrders, updateStatus }
