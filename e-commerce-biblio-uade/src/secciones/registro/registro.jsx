import React, { useState } from 'react';

function Registro() {
  const [usuario, setUsuario] = useState({
    nombre: '',
    email: '',
    contrasena: ''
  });

  const [errores, setErrores] = useState({
    nombre: '',
    email: '',
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
      newErrores.nombre = "Por favor, rellene su nombre";
    } else {
      newErrores.nombre = "";
    }

    if (usuario.email.trim() === "") {
      newErrores.email = "Por favor, Escriba un email";
    } else {
      newErrores.email = "";
    }

    if (usuario.contrasena.trim() === "") {
      newErrores.contrasena = "Por favor, Escriba una contraseña";
    } else {
      newErrores.contrasena = "";
    }
    console.log(usuario)
    setErrores(newErrores);

    if (Object.values(newErrores).every(error => error === "")) {

    }
  };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h1 className="text-center">Regístrate, locura!</h1>
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
                  <input className="form-control" type="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Ingrese su correo electrónico"
                    value={usuario.email}
                    onChange={handleChange} />
                  {errores.email && <small className="text-danger">{errores.email}</small>}
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
          </div>
        </div>
      </div>
    </>
  )
}

export default Registro;
