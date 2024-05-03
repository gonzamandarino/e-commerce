import React, { useState } from 'react';

function InicioSesion() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    contrasena: ''
  });

  const [errores, setErrores] = useState({
    nombre: '',
    contrasena: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario({
      ...usuario,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
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
      // Agregar la lógica para el inicio de sesión
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
  )
}

export default InicioSesion;
