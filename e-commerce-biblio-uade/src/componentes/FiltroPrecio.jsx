/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Button, TextField } from '@mui/material';

const PriceFilter = ({ onFilter }) => {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    const handleFilter = () => {
        onFilter({ minPrice: parseFloat(minPrice), maxPrice: parseFloat(maxPrice) });
    };

    return (
        <div>
            <TextField
                label="Precio Mínimo"
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Precio Máximo"
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                margin="normal"
                fullWidth
            />
            <Button variant="contained" color="primary" onClick={handleFilter} fullWidth>
                Filtrar
            </Button>
        </div>
    );
};

export default PriceFilter;
