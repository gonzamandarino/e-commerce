
import AgregarCategoria from '../../componentes/AgregarCategoria';
import MostrarCategorias from '../../componentes/MostrarCategoria';

const AdministrarCategorias = () => {
    return (
        <div className="container mt-4">
            <h1>Administrar Categorías</h1>
            <div className="mb-4">
                <AgregarCategoria/>
            </div>
            <div>
                <MostrarCategorias />
            </div>
        </div>
    );
};

export default AdministrarCategorias;
