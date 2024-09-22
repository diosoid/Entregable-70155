import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';

import path from 'path';
import __dirname from './utils.js';

import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './services/ProductManager.js';

import mongoose from 'mongoose';

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

const mongoURI = 'mongodb://localhost:27017/EntregaFinal';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

app.set('views', path.join(__dirname, 'views'));

const productManager = new ProductManager('./src/data/productos.json');

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  socket.on('addProduct', async (product) => {
    console.log('Producto recibido en el servidor:', product); // <-- Agrega este console.log
    const addedProduct = await productManager.add(product);
    const products = await productManager.getAll();
    io.emit('updateProductList', products);
});
  // Aquí podrías escuchar y emitir eventos usando socket.emit() y socket.on()
  
});

const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export { io };
