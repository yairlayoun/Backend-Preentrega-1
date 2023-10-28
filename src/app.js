import express from 'express';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express();
app.use(express.urlencoded({extended:true}))
const port = 8080;



app.use(express.json());

// Rutas para productos
app.use('/api/products', productsRouter);

// Rutas para carritos
app.use('/api/carts', cartsRouter);

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
