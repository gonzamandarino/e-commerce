import React from "react";
import storeItems from "../DATOS/datos.json"
import { Card } from "./card-libro";

const ListaCard = () => {
    return (
        <div className="items-list">
        {storeItems.map((product, idx) => {
            return <Card key={product.id} {...product} />;
        })}
        </div>
    );
};

export default ListaCard