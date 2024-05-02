import { useParams } from "react-router-dom";


export  const DetalleLibro = () =>{

const{DetalleLibro} =useParams();

return(
<>


<div>{DetalleLibro}</div>












</>)}
export default DetalleLibro