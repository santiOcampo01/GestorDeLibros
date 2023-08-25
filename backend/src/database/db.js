const  Sequelize =  require('sequelize');
require('dotenv').config()


const db = new Sequelize('bdui5zmjvbdgupk4naje', 'urzx7d6csa2ral4q', 'cW6evfmTPvilJ0tvJjQ', {
  host: 'bdui5zmjvbdgupk4naje-mysql.services.clever-cloud.com',
  port: '20467',
  dialect: 'mysql',
})

module.exports = db;