import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/addComponent.css'

export default function AddComponent() {

  const [addBook, setAddBook] = useState({
    titulo: '',
    imagen: '',
    autor: '',
    fechaLanzamiento: '',
    genero: '',
  })


  const navigate = useNavigate()
  const volver = () => {
    navigate('/')
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setAddBook({ ...addBook, [name]: value })
  }

  const añadir = async id => {
    try {
      const response = await axios.post('http://localhost:8080/api/books/create', addBook)
      console.log(response)
    } catch (error) {
      console.error('Error al añadir el libro:', error)
    }
  }

  return (
    <div className="divEdit">
      <h1>Añadir libro</h1>
      <form>
        {
          <div>
            <label htmlFor="titulo">
              <h2> Titulo: {addBook.titulo}</h2>
            </label>
            <input type="text" id="titulo" name="titulo" value={addBook.titulo} onChange={handleInputChange} />
            <label htmlFor="imagen">
              <p>imagen:</p>
            </label>
            <img src={addBook.imagen} alt={addBook.title + 'imagen'} width="150" height="150" />
            <input type="text" id="imagen" name="imagen" value={addBook.imagen} onChange={handleInputChange} />
            <label htmlFor="autor">
              Autor: <p className="autor">{addBook.autor}</p>
            </label>
            <input type="text" name="autor" id="autor" value={addBook.autor} onChange={handleInputChange} />
            <label htmlFor="fechaLanzamiento">
              Año de publicación:
              <p className="fechaLanzamiento">{addBook.fechaLanzamiento}</p>
            </label>
            <input
              type="text"
              name="fechaLanzamiento"
              id="fechaLanzamiento"
              value={addBook.fechaLanzamiento}
              onChange={handleInputChange}
            />
            <label htmlFor="genero">
              Género:
              <p className="genero">{addBook.genero}</p>
            </label>
            <input type="text" name="genero" id="genero" value={addBook.genero} onChange={handleInputChange} />
            <div className="buttons">
              <button className="enviar" onClick={() => añadir(addBook.id)}>
                Guardar
              </button>
              <button className="volver" onClick={volver}>
                Volver
              </button>
            </div>
          </div>
        }
      </form>
    </div>
  )
}
