import userModel from "../models/userModel.js"

// add items to user cart
const addToCart = async (req, res) => {
    try {
        let user = await userModel.findByPk(req.body.userId);
        let cartData = user.cartData || {};
        if (!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        } else {
            cartData[req.body.itemId] += 1;
        }
        await userModel.update({ cartData }, { where: { id: req.body.userId } });
        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// remove items from user cart
const removeFromCart = async (req, res) => {
    try {
        let user = await userModel.findByPk(req.body.userId);
        let cartData = user.cartData || {};
        if (cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        await userModel.update({ cartData }, { where: { id: req.body.userId } });
        res.json({ success: true, message: "Removed From Cart" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// fetch user cart data
const getCart = async (req, res) => {
    try {
        let user = await userModel.findByPk(req.body.userId);
        let cartData = user.cartData || {};
        res.json({ success: true, cartData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addToCart, removeFromCart, getCart }
