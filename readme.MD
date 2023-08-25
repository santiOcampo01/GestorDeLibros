# Catálogo de Libros - Documentación

Este repositorio contiene el código fuente de una aplicación web que gestiona un catálogo de libros en una librería. La aplicación consta de un backend desarrollado en Node.js y Express, y un frontend desarrollado en React, este aplicativo web esta lanzado de forma local por lo que se debera inicar en cada uno de sus dispositivos a continuacion dejare la documentacion.

## Backend

### Instalación y Uso

1. Clona este repositorio: `git clone <URL_del_repositorio>`
2. Accede al directorio del backend: `cd backend`
3. Instala las dependencias: `npm install`
4. Inicia el servidor: `npm run dev`
5. El servidor estará en funcionamiento en: `http://localhost:8080`

### Endpoints

- `GET /api/books`: Obtiene la lista de todos los libros en el catálogo.
- `GET /api/books/:id`: Obtiene un libro por su ID.
- `POST /api/books/create`: Agrega un nuevo libro al catálogo.
- `PUT /api/books/update/:id`: Actualiza un libro existente en el catálogo.
- `DELETE /api/books/delete/:id`: Elimina un libro del catálogo por su ID.

## Frontend

### Instalación y Uso

1. Accede al directorio del frontend: `cd frontend`
2. Instala las dependencias: `npm install`
3. Inicia la aplicación: `npm start`
4. Accede a la aplicación en tu navegador: `http://localhost:3000`

### Funcionalidades

- La interfaz web permite visualizar la lista de libros.
- Permite agregar nuevos libros al catálogo.
- Permite editar información de un libro existente.
- Permite eliminar un libro del catálogo.
- No permite añadir libros sin todos los campos completamente diligenciados.
- No permite editar libros sin los campos completamente diligenciados.
- Al momento de editar adquiere el  libro por su id 
- Al momento de eliminar adquiere el  libro por su id

## Notas

- Asegúrate de tener Node.js y npm instalados en tu sistema.
- La base de datos utilizada está en la nube, no necesitas configurarla localmente.
- Antes de editar o eliminar un libro, asegúrate de haber creado algunos libros a través de la interfaz web.

## test

- Para ejecutar los test, accede al directorio del backend: `cd backend`
- Ejecuta el comando: `npm test`


## Documentacion

Para la documentacion de la api se uso la tecnologia de swagger, para acceder a la documentacion de la api se debe acceder a la siguiente ruta: `http://localhost:8080/api-docs/`
tambien se puede acceder a la documentacion en forma de json mediante la siguiente ruta: `http://localhost:8080/api-docs-json/`

## tecnologias
- React
- Node.js
- Express
- SQL
- Swagger
- Jest
- Morgan
- cors
- react-router-dom
- axios

son las que destacan como las mas importante sin embargo es importante aclarar que se debe tener instalado node.js y npm para poder ejecutar el proyecto
y sus dependencias usando el comando npm install en su consola y luego ejecutar tanto el front como el back con los comandos mencionados anteriormente

## Autor
- Santiago Mejia Ocampo

## Contacto
- linkedin: https://www.linkedin.com/in/santi-mejia-ocampo/
- email: santimejiaok@gmail.com
- telefono: 321 508 3790

---

¡Gracias por revisar la documentación! Si tienes alguna pregunta o problema, no dudes en contactarme.