import Buscador from "../../componentes/buscador";
import HomeCarousel from "../../componentes/HomeCarousel";


function Inicio(){
    return(
    
    <>
    <div className="Inicio container-fluid w-100 p-3">
      <div className="row">
        <div className="col-md-12">
          <div className="inicio-central position-relative">
            <h2 className="text-start">Bienvenidos</h2>
            <p>El catálogo más genial de todos los catálogos <strong>geniales</strong></p>
            <Buscador ></Buscador>
          </div>
          <div>
            <HomeCarousel></HomeCarousel>
          </div>
        </div>
        
      </div>
      
    </div>
        
    </>
    
    )


}export default Inicio