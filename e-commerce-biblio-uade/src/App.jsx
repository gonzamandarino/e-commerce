import { useState } from 'react'

import Header from './componentes/header'
import Inicio from './secciones/inicio/inicio'
import Catalogo from './secciones/catalogo/catalogo'

import './App.css'

function App() {
  const [estadoVariable,setEstadoVariable]=useState(0);

    const actualizarEstado=(nuevoEstado=>{
        setEstadoVariable(nuevoEstado)
    })
  const [count, setCount] = useState(0)


  return (
    <>
              <Header actualizarEstado={actualizarEstado}></Header>
       
              {estadoVariable === 0 ? <Inicio /> : estadoVariable === 1 ? <Catalogo /> : <Inicio />}

          

        {/* <Inicio></Inicio>
      
        <Catalogo></Catalogo> */}
        
    </>
  )
}

export default App
