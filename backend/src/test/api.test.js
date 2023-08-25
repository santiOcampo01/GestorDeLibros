const request = require('supertest')
const app = require('../index.js')
const Book = require('../models/booksModels.js')

describe('API Routes', () => {
  //Prueba para obtener todos los libros
  describe('GET /api/books', () => {
    test('Obtiene todos los libros', async () => {
      const response = await request(app).get('/api/books')

      expect(response.status).toBe(200)
      expect(response.body).toEqual(expect.any(Array))
      expect(response.body.length).toBeGreaterThan(0)
    })
  })

  //Crea un libro de prueba para el testeo
  async function createDummyBook() {
    return await Book.create({
      titulo: 'Dummy Book',
      autor: 'Dummy Author',
      fechaLanzamiento: 2023,
      genero: 'Dummy Genre',
      imagen: 'dummy-url',
    })
  }

  // Prueba para obtener un libro por su ID
  describe('GET /api/books/:id', () => {
    test('Retorna un libro por su ID', async () => {
      const existingBook = await createDummyBook()

      const response = await request(app).get(`/api/books/${existingBook.id}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('id', existingBook.id)
    })
  })

  //Prueba para crear un libro
  describe('POST /api/books/create', () => {
    test('Crea un nuevo libro', async () => {
      const newBook = {
        titulo: 'Nuevo Libro',
        autor: 'Autor Nuevo',
        fechaLanzamiento: 2023,
        genero: 'Género Nuevo',
        imagen: 'nueva-url',
      }

      const response = await request(app).post('/api/books/create').send(newBook)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('id')
    })
  })

  //Prueba para actualizar libros por su ID
  describe('PUT /api/books/update/:id', () => {
    test('Actualizar un libro existente', async () => {
      const existingBook = await createDummyBook()

      // Datos actualizados del libro
      const updatedBookData = {
        titulo: 'Titulo Actualizado',
        autor: 'Autor Actualizado',
        fechaLanzamiento: 2024,
        genero: 'Genero Actualizado',
        imagen: 'imagen-url-actualizada',
      }

      const response = await request(app).put(`/api/books/update/${existingBook.id}`).send(updatedBookData)

      expect(response.status).toBe(200)
    })

    //Prueba para mensaje de error si no se encuentra el libro
    test('Retorna un mensaje de error si el libro no existe', async () => {
      const nonExistingBookId = 9999
      const updatedBookData = {
        titulo: 'Titulo Actualizado',
        autor: 'Autor Actualizado',
        fechaLanzamiento: 2024,
        genero: 'Genero Actualizado',
        imagen: 'imagen-url-actualizada',
      }

      const response = await request(app).put(`/api/books/update/${nonExistingBookId}`).send(updatedBookData)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('message', 'Libro no encontrado')
    })
  })

  //Elimina un libro por el ID
  describe('DELETE /api/books/delete/:id', () => {
    test('Elimina un libro existente', async () => {
      const existingBook = await createDummyBook()

      const response = await request(app).delete(`/api/books/delete/${existingBook.id}`)

      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Libro eliminado exitosamente')

      const getResponse = await request(app).get(`/api/books/${existingBook.id}`)
      expect(getResponse.status).toBe(404)
    })

    //Prueba para retornar error si no existe el libro por ID
    test('Retorna un mensaje de error si el libro no existe', async () => {
      const nonExistingBookId = 9999

      const response = await request(app).delete(`/api/books/delete/${nonExistingBookId}`)

      expect(response.status).toBe(404)
      expect(response.body).toHaveProperty('message', 'Libro no encontrado')
    })
  })

  //Prueba para validar que todos los campos sean requeridos al crear un libro
  describe('POST /api/books/create', () => {
    test('Retorna un mensaje de error si falta un campo requerido al agregar un libro', async () => {
      const incompleteBook = {
        titulo: 'Incomplete Book',

        fechaLanzamiento: 2023,
        genero: 'Dummy Genre',
        imagen: 'dummy-url',
      }

      const response = await request(app).post('/api/books/create').send(incompleteBook)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors', 'Asegurate de rellenar todos los campos')
    })
  })

  //Prueba para validar que todos los campos sean requeridos al actualizar un libro
  describe('PUT /api/books/update/:id', () => {
    test('Retorna un mensaje de error si falta un campo requerido al editar un libro', async () => {
      const existingBook = await createDummyBook()

      const incompleteBook = {
        autor: 'Incomplete Author',
        fechaLanzamiento: 2023,
        genero: 'Dummy Genre',
        imagen: 'dummy-url',
      }

      const response = await request(app).put(`/api/books/update/${existingBook.id}`).send(incompleteBook)

      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('errors', 'Asegurate de rellenar todos los campos')
    })
  })
})
