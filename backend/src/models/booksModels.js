const { DataTypes } = require('sequelize')
const  db = require('../database/db') // Ruta al archivo de configuración de Sequelize

const Book = db.define('book', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fechaLanzamiento: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genero: {
    type: DataTypes.STRING,
  },
  imagen: {
    type: DataTypes.TEXT,
  },
},
 {
  timestamps: false, // Desactivar las columnas createdAt y updatedAt
});

module.exports = Book // Exporta el modelo
