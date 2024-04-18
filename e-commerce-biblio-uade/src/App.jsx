import { useState } from 'react'

import Header from './componentes/header'
import Inicio from './secciones/inicio/inicio'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
        <Header></Header>
        
    
      <Inicio></Inicio>
    </>
  )
}

export default App
