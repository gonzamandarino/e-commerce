import Header from './componentes/header';
import Inicio from './secciones/inicio/inicio';
import Contacto from './secciones/Contacto/Contacto';
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
import Perfil from './secciones/perfil/perfil';
import AdministrarCategorias from './secciones/categorias/categorias';

function App() {

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
          <Route path='/contacto' element={<Contacto></Contacto>}/>
          <Route path='/mislibros' element={<Mislibros></Mislibros>}/>
          
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/categorias" element={<AdministrarCategorias />} />
          
          </Routes>

      </Router>
    </ShoppingCartProvider>
    <Footer></Footer>
    </>
  );
}

export default App;
