import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibros } from "../features/libros/librosSlice";
import { Card } from "./card-libro";
import { Outlet } from "react-router-dom";
import Buscador from "./buscador";
import Filtro from "./Filtro";

const ListaCard = () => {
  const dispatch = useDispatch();
  const libros = useSelector((state) => state.libros.items);
  const libroStatus = useSelector((state) => state.libros.status);
  const error = useSelector((state) => state.libros.error);
  
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    if (libroStatus === 'idle') {
      dispatch(fetchLibros());
    }
  }, [libroStatus, dispatch]);

  useEffect(() => {
    const categoriasUnicas = [...new Set(libros.map(libro => libro.categoria))];
    setCategorias(categoriasUnicas);
  }, [libros]);

  const handleFilterChange = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const librosFiltrados = categoriaSeleccionada
    ? libros.filter(libro => libro.categoria === categoriaSeleccionada)
    : libros;

  return (
    <div className="container-fluid">
      <Buscador />
      <div className="row justify-content-center">
        <h2>Llevando más de 3 libros tenés un 15% de descuento con tu compra!</h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-md-4 col-sm-6 mb-3">
        <Filtro categorias={categorias} onFilterChange={handleFilterChange} />
        </div>
      </div>
      <div className="row justify-content-center">
        <Outlet />
      </div>
      <div className="row justify-content-center">
        {libroStatus === 'loading' && <p>Loading...</p>}
        {libroStatus === 'failed' && <p>{error}</p>}
        {libroStatus === 'succeeded' && librosFiltrados.length > 0 ? (
          librosFiltrados.map((product) => (
            <div className="col-md-4 col-sm-6 mb-3" key={product.libro_id}>
              {product.libro_id}
              
              <div className="card my-3 py-3 border-0">
                <Card {...product} />
              </div>
            </div>
          ))
        ) : (
          <p>No hay libros disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ListaCard;
