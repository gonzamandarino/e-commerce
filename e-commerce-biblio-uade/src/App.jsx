import { useState } from 'react';
import Header from './componentes/header';
import Inicio from './secciones/inicio/inicio';
import Catalogo from './secciones/catalogo/catalogo';
import Contacto from './secciones/Contacto/Contacto';
import DATOS from './DATOS/datos.json';
import Registro from './secciones/registro/registro';
import Footer from './secciones/footer';
import InicioSesion from './secciones/inicio-sesion/inicioSesion';
import './App.css';
import { ShoppingCartProvider } from './contexts/cartContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DetalleLibro from './componentes/DetalleLibro';
import ListaCard from './componentes/listaCards'
import ShoppingCart from './componentes/cart'
import Mislibros from './secciones/mislibros/mislibros';

function App() {
  const [estadoVariable, setEstadoVariable] = useState(0);
  

  

  return (
    <>

    <ShoppingCartProvider>
      <Router>
        <Header />
        <Routes>
          <Route path='/inicio-sesion' element={<InicioSesion></InicioSesion>}></Route>
          <Route path='/registro' element={<Registro></Registro>}></Route>

          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<ListaCard />}>
            <Route path=':id' element={<DetalleLibro></DetalleLibro>}/>
          </Route>
          
          <Route path="/cart" element={<ShoppingCart />} />
          {/* TODO */}
          <Route path='/contacto' element={<Contacto></Contacto>}/>
          <Route path='/mislibros' element={<Mislibros></Mislibros>}/></Routes>
      </Router>
    </ShoppingCartProvider>
    <Footer></Footer>
    </>
  );
}

export default App;
