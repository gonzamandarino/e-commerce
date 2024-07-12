
import AgregarCategoria from '../../componentes/AgregarCategoria';
import MostrarCategorias from '../../componentes/MostrarCategoria';

const AdministrarCategorias = () => {
    return (
        <div className="container mt-4 ">
            <h1>Administrar Categorías</h1>
            <div className="mb-4 bg-warning p-2 rounded-5">
                <AgregarCategoria/>
            </div>
            <div className="mb-4 bg-warning p-2 rounded-5">
                <MostrarCategorias />
            </div>
        </div>
    );
};

export default AdministrarCategorias;
