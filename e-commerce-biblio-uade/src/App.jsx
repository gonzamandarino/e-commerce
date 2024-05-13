import { useState } from 'react';
import Header from './componentes/header';
import Inicio from './secciones/inicio/inicio';
import Contacto from './secciones/Contacto/Contacto';
import Registro from './secciones/registro/registro';
import Footer from './secciones/footer';
import Filtros from './componentes/filtros';
import NavFiltros from './componentes/NavFiltros';
import ListaPorAutor from './componentes/listaPorAutor';
import ListaPorCategoria from './componentes/listaPorCategoria';
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
        <NavFiltros></NavFiltros>



        <Routes>
          <Route path='/inicio-sesion' filter="none" element={<InicioSesion></InicioSesion>}></Route>
          <Route path='/registro' element={<Registro></Registro>}></Route>

          <Route path="/" element={<Inicio />} />
          <Route path="/catalogo" element={<ListaCard />}>
            <Route path='categoria/:categoria' element={<ListaPorCategoria />} />
            <Route path='autores/:autor'  element={<ListaPorAutor />} />
            <Route path='libro/:id' element={<DetalleLibro />} />
           
          </Route>
          
          <Route path="/cart" element={<ShoppingCart />} />
    
          <Route path='/contacto' element={<Contacto></Contacto>}/>
          <Route path='/mislibros' element={<Mislibros></Mislibros>}/></Routes>
      </Router>
    </ShoppingCartProvider>
    <Footer></Footer>
    </>
  );
}

export default App;
