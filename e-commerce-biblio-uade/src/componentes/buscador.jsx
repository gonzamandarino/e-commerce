import { useEffect, useState } from "react";
import getLibros from "../service/getLibros";

function Buscador() {
    const [catalogo, setCatalogo] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [opcionesFiltradas, setOpcionesFiltradas] = useState([]);

    useEffect(() => {
        getLibros().then((data) => setCatalogo(data));
    }, []);

        useEffect(()=>{
            if (busqueda.trim() !== '') { // Verifica si la búsqueda no está vacía
                const filtro = catalogo.filter(libro =>
                    libro.nombre.toLowerCase().includes(busqueda.toLowerCase())
                );
                setOpcionesFiltradas(filtro);
            } else {
                setOpcionesFiltradas([]); 
            }
        
        },[busqueda,catalogo])
   
   
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
                    // hay que cambiar el p por un link al detalle del objeto
                    <p key={index}>{libro.nombre}</p> 
                ))}
            </div>
        </>
    );
}

export default Buscador;
