import { Model, DataTypes } from 'sequelize';
import sequelize from './sequelize'; // Importa tu instancia de Sequelize aquí

class User extends Model {
  public id!: number;
  public username!: string;
  public email!: string;
  public pass!: string;
  public user_status!: boolean;
  public role!: string; // Nuevo campo para el rol del usuario
  // public itemsSold!: number; // Propuesta de campo para items vendidos
  // public itemsBought!: number; // Propuesta de campo para items comprados

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(30),
      required: true,
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(40),
      allowNull: false,
    },
    pass: {
      type: DataTypes.STRING(30),
      allowNull: false,
      required: true,
    },
    user_status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    role: { // Definición del nuevo campo
      type: DataTypes.STRING(30),
      allowNull: false,
    },
    /*itemsSold: { // Definición del nuevo campo
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Puedes establecer un valor por defecto
    },
    itemsBought: { // Definición del nuevo campo
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // Puedes establecer un valor por defecto
    },*/
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
