import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Servidores from './pages/Servidores';
import Pag2 from './pages/Pag2';
import CadastraServidor from './pages/NovoServidor';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />}/>
          <Route path='/servidores' element={<Servidores />} />
          <Route path='/novo-servidor' element={<CadastraServidor />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;