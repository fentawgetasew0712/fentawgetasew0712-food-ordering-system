import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const orderModel = sequelize.define("order", {
    userId: { type: DataTypes.STRING, allowNull: false },
    items: { type: DataTypes.JSON, allowNull: false },
    amount: { type: DataTypes.INTEGER, allowNull: false },
    address: { type: DataTypes.JSON, allowNull: false },
    status: { type: DataTypes.STRING, defaultValue: "Food Processing" },
    date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    payment: { type: DataTypes.BOOLEAN, defaultValue: false },
    paymentMethod: { type: DataTypes.STRING, defaultValue: "COD" }
});

export default orderModel;
