import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLibros } from "../features/libros/librosSlice";
import Card from "./card-libro";
import { Outlet } from "react-router-dom";
import Buscador from "./buscador";
import Filtro from "./Filtro";
import PriceFilter from "./FiltroPrecio";

const ListaCard = () => {
  const dispatch = useDispatch();
  const libros = useSelector((state) => state.libros.items);
  const libroStatus = useSelector((state) => state.libros.status);
  const error = useSelector((state) => state.libros.error);
  
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [precioFiltro, setPrecioFiltro] = useState({ minPrice: 0, maxPrice: Infinity }); // Agregar estado para el filtro de precio

  useEffect(() => {
    if (libroStatus === 'idle') {
      dispatch(fetchLibros());
    }
  }, [libroStatus, dispatch]);

  useEffect(() => {
    const categoriasUnicas = [...new Set(libros.flatMap(libro => libro.cate.map(c => c.nombre)))];
    setCategorias(categoriasUnicas);
  }, [libros]);

  const handleFilterChange = (categoria) => {
    setCategoriaSeleccionada(categoria);
  };

  const handlePriceFilter = ({ minPrice, maxPrice }) => {
    setPrecioFiltro({ minPrice, maxPrice });
  };

  const librosFiltrados = libros.filter(libro => {
    const inCategory = categoriaSeleccionada ? libro.cate.some(c => c.nombre === categoriaSeleccionada) : true;
    const inPriceRange = libro.precio >= precioFiltro.minPrice && libro.precio <= precioFiltro.maxPrice;
    return inCategory && inPriceRange;
  });

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
        <div className="col-md-2">
          <PriceFilter onFilter={handlePriceFilter} />  

        </div>
      </div>
      <div className="row justify-content-left">
        <div className="col-md-1 col-sm-6">
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
