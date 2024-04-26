import Buscador from "../../componentes/buscador";
import personaje from'/personaje-inicio.svg';
import Footer from '../footer'

function Inicio(){
    return(
    
    <>
    <div className="Inicio container-fluid w-100 p-3">
      <div className="row">
        <div className="col-md-6">
          <div className="inicio-central position-relative">
            <h2 className="text-start">Bienvenidos</h2>
            <p>El catálogo más genial de todos los catálogos <strong>geniales</strong></p>
            <Buscador></Buscador>
          </div>
        </div>
        <div className="col-md-6">
          <div className="inicio-secundario position-relative">
            <img className="img-fluid" src={personaje} alt="personaje leyendo libro" />
          </div>
        </div>
      </div>
      <Footer/>
    </div>
        
    </>
    
    )


}export default Inicio