const express = require('express')
const morgan = require('morgan')
const cors =  require('cors')
const db = require('./database/db')
const swaggerDocs  = require('./routes/swagger')
const app = express()

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(
  cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
  }),
)


//routes
app.use('/api/books', require('./routes/routes.js'))

//starting server
PORT = process.env.PORT || 8080
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    swaggerDocs(app, PORT)
    });

    // Verificación de la conexión a la base de datos
db.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida exitosamente.')
    // Resto de las pruebas y el código relacionado con Sequelize
  })
  .catch(err => {
    console.error('No se pudo conectar a la base de datos:', err)
  })