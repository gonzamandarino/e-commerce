import { useEffect, useState } from "react";
import getLibros from "../service/getLibros";
import { Link } from "react-router-dom";

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

                <Link to={`/catalogo/libro/${libro.id}`} key={index} className="text-white">
                    <p  key={index}> {libro.nombre} </p>
                    </Link>     
    
                ))
                
                }

                
            </div>
        </>
    );
}

export default Buscador;
