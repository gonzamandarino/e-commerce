
import { useEffect, useState } from "react";
import getLibros from "../service/getLibros";
import { Link } from "react-router-dom";
import Buscador from "./buscador";




function NavFiltros() {
  const [mostrarCategorias, setMostrarCategorias] = useState(false);
  const [mostrarAutores, setMostrarAutores] = useState(false);
  const [mostrarTitulos, setMostrarTitulos] = useState(false);


  const [catalogo,setCatalogo]=useState([])
  

  const [categorias,setCategorias]=useState([])
  const [autores,setAutores]=useState([])
  const [busquedaAutor,setBusqueda]=useState("")
  const [autorFiltrado,setFiltroAutor]=useState([])
  
  const handleChange = (e) => {
   setBusqueda(e.target.value);
   }


  useEffect(() => {
   getLibros().then((data) => setCatalogo(data));
   }, []);

   useEffect(() => {
       const nuevasCategorias = [];
       const Autores=[];
       catalogo.forEach((libro) => {
           const autor_del_libro=libro.autor;
           const categoria_del_libro = libro.categoria;
           if (!nuevasCategorias.includes(categoria_del_libro)) {
               nuevasCategorias.push(categoria_del_libro);
           }
           if(!Autores.includes(autor_del_libro)){
               Autores.push(autor_del_libro)
           }
       });
       setCategorias(nuevasCategorias);
       setAutores(Autores)
   }, [catalogo]);

   useEffect(()=>{
    if(busquedaAutor.trim()!==''){
        const filtroAutor=autores.filter( autor=>
            autor.toLowerCase().includes(busquedaAutor.toLowerCase())
        )
        setFiltroAutor(filtroAutor);
    }else[
        setFiltroAutor([])
    ]


},[busquedaAutor])



  
  return (
    <>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <button
            className="nav-link bg-warning rounded-2 btn btn-link text-black"
            onClick={() => {
              setMostrarCategorias(true);
              setMostrarAutores(false);
              setMostrarTitulos(false);
            }}
          >
            Categorías
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link  bg-warning rounded-2 btn btn-link text-black"
            onClick={() => {
              setMostrarCategorias(false);
              setMostrarAutores(true);
              setMostrarTitulos(false);
            }}
          >
            Autores
          </button>
        </li>
        <li className="nav-item">
          <button
            className="nav-link  bg-warning rounded-2 btn btn-link text-black"
            onClick={() => {
              setMostrarCategorias(false);
              setMostrarAutores(false);
              setMostrarTitulos(true);
            }}
          >
            Títulos
          </button>
        </li>
      </ul>
      <div className="container mt-4">
        {mostrarCategorias && (
          <div >
            <h3 className="text-withe">Categorías</h3>
            <ul>
              {categorias.map((categoria, index) => (
                <Link to={`/catalogo/categoria/${categoria}`} key={index} className=" text-black">
                 <button className="btn btn-secondary bg-warning rounded-2 text-black">
                    {categoria}
                  </button>                 
                </Link>
              ))}
            </ul>
          </div>
        )}
        {mostrarAutores && (
          <div>
            <h3>Búsqueda por Autores</h3>
            <div className=" mb-3">
                <input
                    type="text"
                    className="form-control bg-warning"
                    id="buscador_inicio"
                    placeholder="Búsqueda por autor"
                    value={busquedaAutor}
                    onChange={handleChange}
                    
                />
            <div className="opciones ">
                    {autorFiltrado.map((autor, index) => (
                        <Link to={`/catalogo/autores/${autor.toLowerCase()}`} key={index} className="text-white ">
                          <p>{autor}</p>  
                        </Link>
                    ))}
            </div>
            </div>
          </div>
        )}
        {mostrarTitulos && (
          <div>
            <h3>Búsqueda por Títulos</h3>
            <Buscador ></Buscador>
          </div>
        )}
      </div>
    </>
  );
}

export default NavFiltros;
