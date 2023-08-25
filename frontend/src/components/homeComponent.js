import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '../styles/homeStyles.css'

const URI = 'http://localhost:8080/api/books/'
const URIDelete = 'http://localhost:8080/api/books/delete/'
export default function HomeComponent() {
  const [books, setBooks] = useState([])
    const navigate =  useNavigate()
        useEffect(() => {
        getBooks()
    }, []);

    const getBooks = async () => {
      try {
        const response = await axios.get(URI)
        setBooks(response.data)
      } catch (error) {
        console.error('Error al obtener los libros:', error)
      }
    }


    const editar =  (id) => {
        navigate('/editar/' + id)
    }

    const eliminar = async (id) => {
   try {
      const response = await axios.delete(URIDelete + id);
      console.log(response);
      getBooks();
    } catch (error) {
      console.error('Error al eliminar el libro:', error);
    }
  };
  return (
    <div className="home">
      <h1>Listado de Libros</h1>
      <ul>
        {books.map(book => (
          <li key={book.id}>
            <h2>{book.titulo}</h2>
            <img src={book.imagen} alt={book.title + 'imagen'}  width="150" height="150" />
            <p className="autor">{book.autor}</p>
            <p className="fechalanzamiento">{book.fechaLanzamiento}</p>
            <p className="genero">{book.genero}</p>
            <div className='buttons'>
            <button className="editar" onClick={() => editar(book.id)}>
              Editar
            </button>
            <button className="eliminar" onClick={() => eliminar(book.id)}>
              Eliminar
            </button>
            </div>
          </li>
        ))}
      </ul>
      <button className="añadir" onClick={() => navigate('/añadir/')}>
        añadir
      </button>
    </div>
  )
}
