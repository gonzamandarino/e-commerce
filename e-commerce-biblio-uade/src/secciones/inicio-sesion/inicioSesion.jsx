import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setToken, setUsername, authenticateUser } from '../../features/auth/authSlice';

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
        // Llama a authenticateUser y espera su respuesta
        const actionResult = await dispatch(authenticateUser({ nombre: usuario.nombre, pass: usuario.contrasena }));
        
        console.log("Respuesta completa de authenticateUser:", actionResult);
        // La acción devuelve un objeto con 'payload' si fue exitosa
        const token = actionResult.payload;
      // Verifica que el token se haya guardado correctamente
      console.log("Token SIN GUARDAR:", token);  
        // Actualiza el estado con el token y el nombre de usuario
        dispatch(setToken(token));
        dispatch(setUsername(usuario.nombre));

        console.log('Autenticación exitosa');
        // Verifica que el token se haya guardado correctamente
      console.log("Token guardado en el estado:", token);
        navigate('/'); // Redirige al inicio
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
            </form>
            <button className="btn btn-second" onClick={recuperUsuario}>Recuperar contraseña</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default InicioSesion;
