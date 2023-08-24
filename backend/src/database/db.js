const  Sequelize =  require('sequelize');

const db = new Sequelize('inventario_libreria', 'root', 'Manchas01', {
  host: '127.0.0.1',
  dialect: 'mysql',
})

module.exports = db;