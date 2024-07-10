import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLibros } from '../features/libros/librosSlice';
import DetalleLibro from './DetalleLibro';

function Buscador() {
    const dispatch = useDispatch();
    const catalogo = useSelector((state) => state.libros.items); // Obtén los libros del estado de Redux
    const [busqueda, setBusqueda] = useState('');
    const [opcionesFiltradas, setOpcionesFiltradas] = useState([]);
    const [selectedLibro, setSelectedLibro] = useState(null);
    const [open, setOpen] = useState(false);

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

    const handleOpen = (libro) => {
        setSelectedLibro(libro);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedLibro(null);
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
                    <p
                        key={index}
                        className="text-white"
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleOpen(libro)}
                    >
                        {libro.nombre}
                    </p>
                ))}
            </div>
            {selectedLibro && (
                <DetalleLibro
                    open={open}
                    handleClose={handleClose}
                    libroId={selectedLibro.libro_id}
                />
            )}
        </>
    );
}

export default Buscador;
