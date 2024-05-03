import React, { useState } from 'react';

function InicioSesion(){
    const [usuario, setUsuario] = useState({
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

      };

      const recuperUsuario=()=>{
        console.log("el usuario necesita cambiar la contraseña :)")
        alert("esta parte está en proceso :) ")
      };
    
    return(
    <>
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-4">
        <h1 className="text-center">Entrá, locura!</h1>
        <form className="card" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="form-group">
              {/* <label htmlFor="Nombre-usuario">Nombre de usuario</label> */}
              <input className="form-control" type="text" name="nombre" id="nombre" placeholder="Ingrese su nombre de usuario"
                value={usuario.nombre}
                onChange={handleChange}/>
            </div>
            <br />
            <br />
            <div className="form-group">
              {/* <label htmlFor="Contrasena-usuario">Contraseña</label> */}
              <input className="form-control" type="password" name="contrasena" id="contrasena" placeholder="Defina su contraseña" 
              value={usuario.contrasena}
              onChange={handleChange}/>
            </div>
            <br />
            <button type="submit" className="btn btn-primary">Enviar</button>
          </div>
        </form>
            <button className="btn btn-second" onClick={recuperUsuario}>Recuperar contraseña </button>
      </div>
    </div>
  </div>
    </>

)
}export default InicioSesion