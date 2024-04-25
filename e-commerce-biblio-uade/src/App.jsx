import { useState } from 'react'

import Header from './componentes/header'
import Inicio from './secciones/inicio/inicio'
import Catalogo from './secciones/catalogo/catalogo'
import Contacto from './secciones/Contacto/Contacto'
import DATOS from './DATOS/datos.json';
import './App.css'

function App() {
  const [estadoVariable,setEstadoVariable]=useState(0);

  const [item, setItem] = useState(DATOS);
    const actualizarEstado=(nuevoEstado=>{
        setEstadoVariable(nuevoEstado)
    })
  const [count, setCount] = useState(0)


  return (
    <>
              <Header actualizarEstado={actualizarEstado}></Header>
              {estadoVariable === 0 ? <Inicio /> : 
              estadoVariable === 1 ? <Catalogo item = {item.catalogo} setItem={setItem}  /> :
              estadoVariable === 3 ? <Contacto item = {item.catalogo} setItem={setItem}  /> : <Inicio />}

          

        {/* <Inicio></Inicio>
      
        <Catalogo></Catalogo> */}
        
    </>
  )
}

export default App
