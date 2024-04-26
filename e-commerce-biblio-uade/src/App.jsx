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

function App() {
  const [estadoVariable, setEstadoVariable] = useState(0);
  const [item, setItem] = useState(DATOS);
  const actualizarEstado = (nuevoEstado) => {
    setEstadoVariable(nuevoEstado);
  };
  const [count, setCount] = useState(0);

  return (
    <>
      <Header actualizarEstado={actualizarEstado} />
      {estadoVariable === 0 ? (
        <Inicio />
      ) : estadoVariable === 1 ? (
        <Catalogo item={item.catalogo} setItem={setItem} />
      ) : estadoVariable === 3 ? (
        <Contacto item={item.catalogo} setItem={setItem} />
      ) : estadoVariable === 4 ? (
        <Registro />
      ) : estadoVariable === 5 ? (
        <InicioSesion />
      ) : (
        <Inicio />
      )}
      <Footer />
    </>
  );
}

export default App;
