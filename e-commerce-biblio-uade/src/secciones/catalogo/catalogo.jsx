import React from 'react';
import DATOS from '../../DATOS/datos.json';
import LibroCard from '../../componentes/card-libro';

class Catalogo extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        categorias: DATOS.categorias,
        catalogo: DATOS.catalogo
      };
    }
  
    render() {
      const listaCategorias = this.state.categorias.map((cate, index) => (
        <button key={index} className='btn btn-categoria'>{cate}</button> 
      ));
      const libros= this.state.catalogo.map((libro)=>(
        <LibroCard id={libro.id} nombre={libro.nombre} autor={libro.autor} imagen={libro.imagen} categoria={libro.categoria} precio={libro.precio} resumen={libro.resumen}></LibroCard>
      ))

      return (
        <div className='Catalogo'>
          
          {listaCategorias}
          <div className='card-group'>
            {libros}
          </div>
        </div>
      );
    }
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
