import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/editComponent.css'


export default function EditComponent() {
  const { id } = useParams() // Obtiene el parámetro de la URL
    const [book, setBook] = useState({
      titulo: '',
      imagen: '',
      autor: '',
      fechaLanzamiento: '',
      genero: '',
    })
    useEffect(() => {
        getBook()
    }, []);

    const navigate =  useNavigate()
    const volver = () => {
        navigate('/')
    }

    const getBook = async () => { //se hace la peticion para todos los usuarios
        const response = await axios.get('http://localhost:8080/api/books/' + id)
        setBook(response.data)
    }
    const handleInputChange = event => {
      const { name, value } = event.target
      setBook({ ...book, [name]: value })
    }

    const editar = async (id) => {
        try {
            const response = await axios.put('http://localhost:8080/api/books/update/' + id, book);
            console.log(response);
        } catch (error) {
            console.error('Error al editar el libro:', error);
        }
    };

  return (
    <div className="divEdit">
      <h1>Editar Libro</h1>
      <form>
        {
          <div key={id}>
            <label htmlFor="titulo">
              <h2> Titulo: {book.titulo}</h2>
            </label>
            <input type="text" id="titulo" name="titulo" value={book.titulo} onChange={handleInputChange} />
            <label htmlFor="imagen">
              <p>imagen:</p>
            </label>
            <img src={book.imagen} alt={book.title + 'imagen'} width="150" height="150" />
            <input type="text" id="imagen" name="imagen" value={book.imagen} onChange={handleInputChange} />
            <label htmlFor="autor">
              Autor: <p className="autor">{book.autor}</p>
            </label>
            <input type="text" name="autor" id="autor" value={book.autor} onChange={handleInputChange} />
            <label htmlFor="fechaLanzamiento">
              Año de publicación:
              <p className="fechaLanzamiento">{book.fechaLanzamiento}</p>
            </label>
            <input type="text" name="fechaLanzamiento" id="fechaLanzamiento" value={book.fechaLanzamiento} onChange={handleInputChange} />
            <label htmlFor="genero">
              Género:
              <p className="genero">{book.genero}</p>
            </label>
            <input type="text" name="genero" id="genero" value={book.genero} onChange={handleInputChange} />
            <div className="buttons">
              <button className="enviar" onClick={() => editar(book.id)}>
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
