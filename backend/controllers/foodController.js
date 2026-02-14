import foodModel from "../models/foodModel.js";
import fs from 'fs'

// add food item
const addFood = async (req, res) => {
    let image_filename = `${req.file.filename}`;
    try {
        await foodModel.create({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        });
        res.json({ success: true, message: "Food Added" })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}

// list food
const listFood = async (req, res) => {
    try {
        const foods = await foodModel.findAll({});
        res.json({ success: true, data: foods })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

// remove food item
const removeFood = async (req, res) => {
    try {
        const food = await foodModel.findByPk(req.body.id);
        if (food) {
            fs.unlink(`uploads/${food.image}`, () => { })
            await foodModel.destroy({ where: { id: req.body.id } });
            res.json({ success: true, message: "Food Removed" })
        } else {
            res.json({ success: false, message: "Food not found" })
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addFood, listFood, removeFood }
