
import CardMod from '../../componentes/CardModificar'
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import AgregarLibroDialog from '../../componentes/AgregarLibroDialog';
import { fetchCategorias } from '../../features/categorias/categoriasSlice';
//import { obtenerIdUsuario } from '../../features/usuario/usuarioSlice';
import { selectToken } from '../../features/auth/authSlice';
import { addLibro } from '../../features/libros/librosSlice'; 
import { getMisLibros } from '../../features/libros/misLibrosSlice';// Importa addLibro y getMisLibros desde librosSlice
import { guardarImagen } from '../../features/imagenes/imagenesSlice';
function MisLibros() {
    const dispatch = useDispatch();
    const misLibros = useSelector((state) => state.misLibros.items);
    const libroStatus = useSelector((state) => state.misLibros.status);
    const error = useSelector((state) => state.misLibros.error);
    const token = useSelector(selectToken);
    //const usuarioId = useSelector(selectToken); // Obtén el usuarioId desde el estado

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        nombre: '',
        descripcion: '',
        precio: '',
        autor: '',
        cate: [],
        imagen: null,
        usuarioId: 1,
        stock: 0
    });

    useEffect(() => {
        dispatch(getMisLibros()); // Llama a getMisLibros al montar el componente
        dispatch(fetchCategorias());
        // Opcional: Puedes obtener el usuarioId aquí si es necesario para obtener mis libros específicos
    }, [dispatch]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            imagen: e.target.files[0],
        });
    };

    const handleCategoryChange = (selectedOptions) => {
        setFormData({
            ...formData,
            cate: selectedOptions.map(option => ({ categoria_id: option.value })),
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("EL TOKEN ES", token);
        const action =  await dispatch(guardarImagen(formData.imagen));
        const imagen_id = action.payload;
        console.log(imagen_id);
        formData.imagen = imagen_id;
        console.log(formData);
        
        dispatch(addLibro(formData));
        handleClose();
    };

    return (
        <div className="container">
            <div>
                <h1>Mis Libros</h1>
            </div>
            <div className="row bg-warning">
                <Button className="item-plus-Button" onClick={handleClickOpen}>
                    + Agregar Libro
                </Button>
                
            </div>
            <div className="row justify-content-center">
                {libroStatus === 'loading' && <p>Loading...</p>}
                {libroStatus === 'failed' && <p>{error}</p>}
                {libroStatus === 'succeeded' && misLibros.length > 0 ? (
                    misLibros.map((libro) => (
                        <div className="col-md-4 col-sm-6 mb-3" key={libro.libro_id}>
                            <div className="card my-3 py-3 border-0">
                                <CardMod {...libro} />
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay libros disponibles</p>
                )}
            </div>
            <AgregarLibroDialog
                open={open}
                handleClose={handleClose}
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                handleFileChange={handleFileChange}
                handleCategoryChange={handleCategoryChange}
                formData={formData}
            />
        </div>
    );
}

export default MisLibros;
