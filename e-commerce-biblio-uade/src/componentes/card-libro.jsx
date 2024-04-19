import React
 from "react";
class LibroCard extends React.Component {
    render() {
      const { nombre, autor, resumen, img,id } = this.props;
  
      return (
        <div className="card ">
            <img className="card-img-top" src={img} alt="imagen" srcset={img} />
          <div className="card-body">
            <h5 className="card-title">{nombre}</h5>
            <h6 className="card-subtitle mb-2 text-muted">{autor}</h6>
            <p className="card-text">{resumen}</p>
            
          </div>
        </div>
      );
    }
  }
  
  export default LibroCard;