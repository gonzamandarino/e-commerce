import React, { useState } from 'react';

function Registro(){
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

      if(usuario.nombre.trim()===""){
        alert("Por favor, rellene su nombre")
        return;
    }
    if(usuario.email.trim()===""){
      alert("Por favor, Escriba un email")
      return;
  }
    if(usuario.contrasena.trim()===""){
      alert("Por favor, Escriba una contraseña")
      return;
  }


        console.log(usuario);
        // Aquí puedes enviar los datos a tu backend o realizar cualquier otra acción que necesites.
      };

    return(
    <>
    <div className="container">
    <div className="row justify-content-center">
      <div className="col-md-4">
        <h1 className="text-center">Regístrate, locura!</h1>
        <form className="card" onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="form-group">
              {/* <label htmlFor="Nombre-usuario">Nombre de usuario</label> */}
              <input className="form-control" type="text" name="nombre" id="nombre" placeholder="Ingrese su nombre de usuario"
                value={usuario.nombre}
                onChange={handleChange}/>
            </div>
            <br />
            <div className="form-group">
              {/* <label htmlFor="Mail-usuario">Mail</label> */}
              <input className="form-control" type="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Ingrese su correo electrónico"
              value={usuario.email}
              onChange={handleChange}/>
              {/* <small id="emailHelp" className="form-text text-muted">No lo compartimos con ningún servicio externo</small> */}
            </div>
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
      </div>
    </div>
  </div>
    </>

)
}export default Registro