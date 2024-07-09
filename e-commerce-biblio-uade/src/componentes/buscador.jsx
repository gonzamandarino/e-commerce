import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchLibros } from '../features/libros/librosSlice';

function Buscador() {
    const dispatch = useDispatch();
    const catalogo = useSelector((state) => state.libros.items); // Obtén los libros del estado de Redux
    const [busqueda, setBusqueda] = useState('');
    const [opcionesFiltradas, setOpcionesFiltradas] = useState([]);

    useEffect(() => {
        dispatch(fetchLibros()); // Despacha la acción para obtener los libros
    }, [dispatch]);

    useEffect(() => {
        if (busqueda.trim() !== '') { // Verifica si la búsqueda no está vacía
            const filtro = catalogo.filter((libro) =>
                libro.nombre.toLowerCase().includes(busqueda.toLowerCase())
            );
            setOpcionesFiltradas(filtro);
        } else {
            setOpcionesFiltradas([]);
        }
    }, [busqueda, catalogo]);

    const handleChange = (e) => {
        setBusqueda(e.target.value);
    };

    return (
        <>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control bg-warning"
                    id="buscador_inicio"
                    placeholder="Buscador"
                    value={busqueda}
                    onChange={handleChange}
                />
            </div>
            <div>
                {opcionesFiltradas.map((libro, index) => (
                    <Link to={`/catalogo/${libro.id}`} key={index} className="text-white">
                        <p key={index}> {libro.nombre} </p>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Buscador;
