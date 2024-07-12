// src/components/Perfil.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsuarios, selectItems, selectUsuarioStatus, selectUsuarioError } from '../../features/usuario/usuarioSlice';
import { selectUsername } from '../../features/auth/authSlice';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Perfil = () => {
    const dispatch = useDispatch();
    const usuarios = useSelector(selectItems);
    const usuarioStatus = useSelector(selectUsuarioStatus);
    const error = useSelector(selectUsuarioError);
    const username = useSelector(selectUsername);

    useEffect(() => {
        dispatch(fetchUsuarios());
    }, [dispatch]);

    return (
        <div className="container mt-4  ">
            
            <div className="mb-3 bg-warning p-2 rounded-5">
            <h2>Perfil de Usuario</h2>
                <strong>Nombre de usuario:</strong> {username}
                <Link to="/modificar-perfil">
                    <Button variant="contained" className="mx-2">Modificar</Button>
                </Link>
            </div >
            
            <div className='mb-3 bg-warning p-2 rounded-5'>
            <h3>Lista de Todos los Usuarios</h3>
                <div className='row rounded-5'>
                    <div className='col-md-2'>
                        Nombre
                    </div>
                    <div className='col-md-4'>
                        Rol
                    </div>
                    <div className='col-md-2'>
                        Modificar Permisos
                    </div>
                    <div className='col-md-2'>
                        Eliminar Usuario
                    </div>
                </div>
            {usuarioStatus === 'loading' && <p>Cargando...</p>}
            {usuarioStatus === 'failed' && <p>{error}</p>}
            {usuarioStatus === 'succeeded' && usuarios.length > 0 ? (



                <ul className="list-group">
                    {usuarios.map((usuario) => (
                        <li key={usuario.id} className="list-group-item">
                            <div className='row'>
                                <div className='col-md-2 justify-content-start'>
                                {usuario.nombre}
                                </div>
                                <div className='col-md-4'>
                                    {usuario.role}
                                </div>
                                <div className='col-md-2'>
                                    <Button variant='contained'>
                                        Modificar
                                    </Button>
                                </div>
                                <div className='col-md-2'>
                                    <Button variant='contained'>
                                        Borrar
                                    </Button>

                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay usuarios disponibles</p>
                
            )}
            
            </div>
        </div>
    );
};

export default Perfil;
