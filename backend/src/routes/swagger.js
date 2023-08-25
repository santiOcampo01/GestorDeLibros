const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


//metadata info about API

const swaggerOptions = {

    definition: {
        openapi: '3.0.0',
        info: { title: 'Crossfit API', version: '1.0.0' },
    },
    apis: ['./src/routes/*.js', './src/models/booksModels.js']
};

//docs json format

const swaggerSpec = swaggerJSDoc(swaggerOptions);

//use swagger
const swaggerDocs = (app, port) => {
    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get('/api/docs.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });
    console.log(`Swagger docs running on port ${port}docs`);
};

module.exports = swaggerDocs;