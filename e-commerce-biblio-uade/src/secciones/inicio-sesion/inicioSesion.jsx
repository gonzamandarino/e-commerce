import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken, setUsername, authenticateUser } from '../../features/auth/authSlice';
import { isAdmin } from '../../features/usuario/usuarioSlice'; // Importa el thunk isAdmin

function InicioSesion() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    contrasena: ''
  });

  const [errores, setErrores] = useState({
    nombre: '',
    contrasena: ''
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let newErrores = { ...errores };

    if (usuario.nombre.trim() === "") {
      newErrores.nombre = "Por favor, ingrese su nombre de usuario";
    } else {
      newErrores.nombre = "";
    }

    if (usuario.contrasena.trim() === "") {
      newErrores.contrasena = "Por favor, ingrese su contraseña";
    } else {
      newErrores.contrasena = "";
    }

    setErrores(newErrores);

    if (Object.values(newErrores).every(error => error === "")) {
      try {
        const actionResult = await dispatch(authenticateUser({ nombre: usuario.nombre, pass: usuario.contrasena }));
        
        const token = actionResult.payload;
        dispatch(setToken(token));
        dispatch(setUsername(usuario.nombre));

        // Verificar si el usuario es administrador
        const adminResult = await dispatch(isAdmin());
        if (adminResult.payload) {
          console.log("El usuario es administrador");
        } else {
          console.log("El usuario no es administrador");
        }

        navigate('/'); 
      } catch (error) {
        console.error('Error de autenticación:', error);
        alert("Error de autenticación.");
      }
    }
  };

  const recuperUsuario = () => {
    console.log("El usuario necesita cambiar la contraseña :)");
    alert("Esta parte está en proceso :)");
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h1 className="text-center">Entrá, locura!</h1>
            <form className="card" onSubmit={handleSubmit}>
              <div className="card-body">
                <div className="form-group">
                  <input className="form-control" type="text" name="nombre" id="nombre" placeholder="Ingrese su nombre de usuario"
                    value={usuario.nombre}
                    onChange={handleChange} />
                  {errores.nombre && <small className="text-danger">{errores.nombre}</small>}
                </div>
                <br />
                <div className="form-group">
                  <input className="form-control" type="password" name="contrasena" id="contrasena" placeholder="Defina su contraseña"
                    value={usuario.contrasena}
                    onChange={handleChange} />
                  {errores.contrasena && <small className="text-danger">{errores.contrasena}</small>}
                </div>
                <br />
                <button type="submit" className="btn btn-primary">Enviar</button>
              </div>
              <button className="btn btn-second" onClick={recuperUsuario}>Recuperar contraseña</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default InicioSesion;
