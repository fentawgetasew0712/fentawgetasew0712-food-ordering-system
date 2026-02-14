import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const userModel = sequelize.define("user", {
    username: { type: DataTypes.STRING, allowUint: false, unique: true },
    firstName: { type: DataTypes.STRING, allowNull: false },
    lastName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    cartData: { type: DataTypes.JSON, defaultValue: {} }
});

export default userModel;
