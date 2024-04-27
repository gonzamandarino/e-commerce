import React from 'react';
import DATOS from '../../DATOS/datos.json';
import Card from '../../componentes/card-libro';

    
    const Catalogo = ({item, setItem}) => {
      console.log(item);
      
      return (
        <>
        <div>
        <h1>
        Catalogo
        </h1>
       </div>  
        
        </>
      )
    }
    
  export default Catalogo;


        /*
  render() {
    const CategoriasCatalogo = this.state.catalogo.map(libro => (
      <div>
        <p>{libro.categorias}</p>
      </div>
      
      <div key={libro.id}>
        <h2>{libro.titulo}</h2>
        <p>Autor: {libro.autor}</p>
        <p>Precio: ${libro.precio}</p>
      </div>
    */
