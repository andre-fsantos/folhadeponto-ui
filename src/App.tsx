import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import Servidores from './pages/ListaServidores';
import CadastraServidor from './pages/CadastraServidor';
import EditaServidor from './pages/AtualizaServidor';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/servidores' element={<Servidores />} />
          <Route path='/cadastrar-servidor' element={<CadastraServidor />}/>
          <Route path='/atualizar-cadastro-do-servidor' element={<EditaServidor />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;