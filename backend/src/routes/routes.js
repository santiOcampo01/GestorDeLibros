const { Router } = require('express')
const { body, param, validationResult } = require('express-validator')
const db = require('../database/db')
const Book = require('../models/booksModels')
const router = Router()



/**
 * @swagger
 * /api/books/:
 *   get:
 *     summary: Obtiene la lista de libros
 *     responses:
 *       200:
 *         description: Lista de libros obtenida exitosamente
 *         content:
 *           application/json:
 *             example:
 *               - id: 1
 *                 titulo: "Libro 1"
 *                 autor: "Autor 1"
 *                 año_de_publicación: 2022
 *                 genero: "Género 1"
 *                 imagen: "URL de la imagen"
 */
//ENdpoint para obtener todos los libros
router.get('/', async (req, res) => { // Ruta para obtener todos los libros
  try {
    const getBooks = await Book.findAll({
      attributes: ['id', 'titulo', 'autor', 'fechaLanzamiento', 'genero', 'imagen'], // Especifica las columnas que deseas seleccionar
    })
    res.json(getBooks)
  } catch (err) {
    res.json({ message: err })
  }
})

const createBookValidation = [
  body('titulo').notEmpty(),
  body('autor').notEmpty(),
  body('fechaLanzamiento').notEmpty(),
  body('genero').notEmpty(),
  body('imagen').notEmpty(),
]



/**
 * @swagger
 * /api/books/create:
 *   post:
 *     summary: Crea un nuevo libro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               fechaLanzamiento:
 *                 type: integer
 *                 format: year
 *               genero:
 *                 type: string
 *               imagen:
 *                 type: string
 *     responses:
 *       200:
 *         description: Libro creado exitosamente
 *         content:
 *           application/json:
 *             example:
 *               id: 1
 *               titulo: "Libro 2"
 *               autor: "Autor 2"
 *               fechaLanzamiento: 2022
 *               genero: "Género 2"
 *               imagen: "URL de la imagen"
 */
router.post('/create', createBookValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: 'Asegurate de rellenar todos los campos' })
  } else {
    try {
      const { titulo, autor, fechaLanzamiento, genero, imagen } = req.body

      // Crear un nuevo registro utilizando Sequelize
      const newBook = await Book.create({
        titulo,
        autor,
        fechaLanzamiento,
        genero,
        imagen,
      })

      res.json(newBook)
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
})



const updateBookValidation = [
  param('id').isInt(),
  body('titulo').notEmpty(),
  body('autor').notEmpty(),
  body('fechaLanzamiento').notEmpty(),
  body('genero').notEmpty(),
  body('imagen').notEmpty(),
]



/**
 * @swagger
 * /api/books/update/{id}:
 *   put:
 *     summary: Actualiza un libro por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro a actualizar
 *         schema:
 *           type: integer
 *           minimum: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               autor:
 *                 type: string
 *               fechaLanzamiento:
 *                 type: integer
 *                 format: year
 *               genero:
 *                 type: string
 *               imagen:
 *                 type: string
 *     responses:
 *       "200":
 *         description: Libro actualizado exitosamente
 *       "400":
 *         description: Campos faltantes o inválidos en la solicitud
 *       "404":
 *         description: No se encontró el libro con el ID proporcionado
*/
router.put('/update/:id', updateBookValidation, async (req, res) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: 'Asegurate de rellenar todos los campos' })
  } else {
    try {
      const { id } = req.params
      const { titulo, autor, fechaLanzamiento, genero, imagen } = req.body

      // Verificar si el libro existe antes de intentar actualizar
      const existingBook = await Book.findOne({
        where: {
          id: id,
        },
      })

      if (!existingBook) {
        return res.status(404).json({ message: 'Libro no encontrado' })
      }

      // Actualizar el libro
      await Book.update(
        {
          titulo,
          autor,
          fechaLanzamiento,
          genero,
          imagen,
        },
        {
          where: {
            id: id,
          },
        },
        )

      res.json({ message: 'Libro actualizado exitosamente' })
    } catch (err) {
      res.status(500).json({ message: err.message })
    }
  }
})



/**
 * @swagger
 * /api/books/delete/{id}:
 *   delete:
 *     summary: Elimina un libro por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del libro a eliminar
 *         schema:
 *           type: integer
 *           minimum: 1
 *     responses:
 *       "200":
 *         description: Libro eliminado exitosamente
 *       "400":
 *         description: No se proporcionó un ID
 *       "404":
 *         description: No se encontró el libro con el ID proporcionado
 */
router.delete('/delete/:id', async (req, res) => {
  const id = req.params.id
  if(!id) return res.status(400).json({ message: 'No se proporcionó un ID' })
  else {
  try {
          const existingBook = await Book.findOne({
            where: {
              id: id,
            },
          })

                if (!existingBook) {
                  return res.status(404).json({ message: 'Libro no encontrado' })
                }
                else {
    // Eliminar un registro
    const deleteBook = await Book.destroy({
      where: {
        id: id,
      },
    })
    res.status(200).json({ message: 'Libro eliminado exitosamente' })
  }
}   catch (err) {
    res.status(500).json({ message: err.message })
   }

}
})


module.exports = router
