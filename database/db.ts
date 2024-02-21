import { Sequelize, DataTypes } from 'sequelize';
// Importar modelos
import User from '../models/userModel';

// Carga las variables de entorno
require('dotenv').config();

const sequelize = new Sequelize(process.env.DATABASE!, process.env.USER!, process.env.PASSWORD!, {
    host: process.env.HOST,
    dialect: process.env.DIALECT as any,
});

const db = {
    sequelize: sequelize,
    models: {
        User: User(sequelize, DataTypes),
        Product: Product(sequelize, DataTypes),
        Cart: Cart(sequelize, DataTypes)
    }
};

export default db;
