import  { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import AgregarLibroDialog from '../../componentes/AgregarLibroDialog';
import getLibros from '../../service/getLibros';
import { CardMod } from '../../componentes/CardModificar';



    function MisLibros() {


    // TODO Filtrar libros q sean de este usuario
    const [libros,setLibros]=useState([])

    useEffect(() => {
        getLibros().then((data) => {
            setLibros(data);
        });
    }, []);
    
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
        titulo: '',
        autor: '',
        descripcion: '',
        imagen: null,
        precio: ''
    });


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
        [name]: value
        });
    };

    const handleFileChange = (e) => {
        setFormData({
        ...formData,
        imagen: e.target.files[0]
        });
    };

    // TODO - Agregar el libro en la BD
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        handleClose();
    };

    return (
        <div className="container">
        
        <div >
        <h1>Mis Libros  </h1>    
        </div>
        
        <div className="row bg-warning">
            <Button className="item-plus-Button" onClick={handleClickOpen}>
            + Agregar Libro
            </Button>
        </div>

        <div className="row justify-content-center">
            {libros.map((product) => (
            <div className="col-md-4 col-sm-6 mb-3" key={product.id}>
                <div className="card my-3 py-3 border-0">
                <CardMod {...product} />
                </div>
            </div>
            ))}
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
