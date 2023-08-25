import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomeComponent from './components/homeComponent';
import EditComponent from './components/editComponent';
import AddComponent from './components/addComponent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomeComponent />} />
        <Route path="/editar/:id" element={<EditComponent />} />
        <Route path="/añadir/" element={<AddComponent />} />
      </Routes>
    </Router>
  )
}
export default App;
