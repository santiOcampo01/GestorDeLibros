const { DataTypes } = require('sequelize')
const  db = require('../database/db') 
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
  timestamps: false, 
});

module.exports = Book 