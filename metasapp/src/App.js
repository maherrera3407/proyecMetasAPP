import './App.css';
import { Route, Routes } from 'react-router-dom';
import Layout from './Componentes/compartidos/Layout';
import Lista from './Componentes/lista/lista';
import Detalles from './Componentes/nueva/Detalles';
import NoEncontrado from './Componentes/compartidos/NoEncontrado';
import Modal from './Componentes/compartidos/Modal';
import Desplegable from './Componentes/compartidos/desplegable'
import { useContext, useEffect } from 'react';
import { Contexto } from './Componentes/servicios/Memoria';
import { pedirMetas } from './Componentes/servicios/Pedidos';

function App() {

  const [,enviar] = useContext(Contexto);

  useEffect(() => {
    const obtenerMetas = async () => {
      const metas = await pedirMetas(); 
      enviar({ tipo: 'colocar', metas });
    };
    obtenerMetas();
  }, [enviar]);
  
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
          <Route index element={<Lista/>}/>
          <Route path='/lista' element={<Lista/>}>
                <Route path='/lista/:id' element={
                    <Modal>
                      <Detalles/>
                    </Modal>
                }/>
          </Route>
          <Route path='/navegacion' element={<Desplegable/>}/>
          <Route path='/crear' element={<Detalles/>}/>
      </Route>
      <Route path='*' element={<NoEncontrado/>}/> 
  </Routes>
  );
}

export default App;
