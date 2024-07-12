import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postCategoria } from '../features/categorias/categoriasSlice';

const AgregarCategoria = () => {
    const dispatch = useDispatch();
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Dispatch de la acción para agregar la categoría
        dispatch(postCategoria({ nombre, descripcion }))
            .then((response) => {
                // Lógica adicional después de una solicitud exitosa, si es necesario
                console.log('Categoría agregada exitosamente:', response);
                
                // Limpiar los campos después de enviar el formulario
                setNombre('');
                setDescripcion('');
            })
            .catch((error) => {
                // Manejo de errores, por ejemplo, mostrando un mensaje de error
                console.error('Error al agregar categoría:', error);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Agregar Categoría</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="descripcion" className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        id="descripcion"
                        value={descripcion}
                        onChange={(e) => setDescripcion(e.target.value)}
                        rows={3}
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Agregar Categoría</button>
            </form>
        </div>
    );
};

export default AgregarCategoria;
