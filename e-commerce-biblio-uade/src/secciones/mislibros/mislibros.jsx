import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import AgregarLibroDialog from '../../componentes/AgregarLibroDialog';
import { fetchLibros } from '../../features/libros/librosSlice';
import { CardMod } from '../../componentes/CardModificar';

function MisLibros() {
    const dispatch = useDispatch();
    const libros = useSelector((state) => state.libros.items);
    const libroStatus = useSelector((state) => state.libros.status);
    const error = useSelector((state) => state.libros.error);

    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        titulo: '',
        autor: '',
        descripcion: '',
        imagen: null,
        precio: '',
    });

    useEffect(() => {
        if (libroStatus === 'idle') {
        dispatch(fetchLibros());
        }
    }, [libroStatus, dispatch]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
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
            {libroStatus === 'succeeded' && libros.length > 0 ? (
            libros.map((product) => (
                <div className="col-md-4 col-sm-6 mb-3" key={product.id}>
                <div className="card my-3 py-3 border-0">
                    <CardMod {...product} />
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
            formData={formData}
        />
        </div>
    );
}

export default MisLibros;
