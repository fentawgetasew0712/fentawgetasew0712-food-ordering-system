import { Sequelize } from "sequelize";
import 'dotenv/config'

const sequelize = new Sequelize(
    process.env.MYSQL_DB,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
        host: process.env.MYSQL_HOST,
        dialect: 'mysql',
        logging: false
    }
);

export const connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log("MySQL DB Connected via Sequelize");
        // We will sync models here later or in models themselves
    } catch (error) {
        console.error("Unable to connect to MySQL:", error);
    }
}

export default sequelize;
