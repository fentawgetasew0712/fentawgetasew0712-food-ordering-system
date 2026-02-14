import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const foodModel = sequelize.define("food", {
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    price: { type: DataTypes.INTEGER, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    category: { type: DataTypes.STRING, allowNull: false },
    available: { type: DataTypes.BOOLEAN, defaultValue: true }
});

export default foodModel;
