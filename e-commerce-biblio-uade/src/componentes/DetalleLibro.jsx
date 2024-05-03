import { useParams,useLocation, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import getLibrosxId from "../service/getLibrosxId"
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export  const DetalleLibro = () =>{

    const cadena = "/catalogo/1";
    const indice = "/catalogo/".length;
    const numero = cadena.substring(indice);
    const [libros,setLibros]=useState([])
    const location = useLocation();
   


    let { id } = useParams();
    useEffect(() => {
        getLibrosxId(id).then((data) => {
            setLibros(data);
        });
    }, [id]);



    return (

        <Card sx={{ maxWidth: 600 }}>
            <CardMedia
                sx={{ height: 400 }}
                image={libros.imagen}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                {libros.nombre} - {libros.autor}
                </Typography>
                ${libros.precio}
                <Typography variant="body2" color="text.secondary">
                {libros.resumen}
                </Typography>
            </CardContent>
            <CardActions style={{justifyContent: 'center'}}>
                <Link to="/catalogo">
                    <Button size="small" variant="contained">Cerrar</Button>
                </Link>
            </CardActions>
        </Card>
    );
}
export default DetalleLibro