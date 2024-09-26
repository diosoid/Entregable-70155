import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { create } from 'express-handlebars';
import path from 'path';
import __dirname from './utils.js';
import productRouter from './routes/products.router.js';
import cartRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import ProductManager from './services/ProductManager.js';
import mongoose from 'mongoose';

// Conexión a MongoDB
const mongoURI = 'mongodb://localhost:27017/EntregaFinal';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch(err => console.error('Error al conectar a MongoDB', err));

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// Configuración de Handlebars con helper personalizado
const hbs = create({
  extname: '.handlebars',
  defaultLayout: 'main',
  helpers: {
    eq: (a, b) => a === b, // Helper para comparar igualdad
  }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/', viewsRouter);

// Socket.io para tiempo real
const productManager = new ProductManager('./src/data/productos.json');
io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  
  socket.on('addProduct', async (product) => {
    console.log('Producto recibido en el servidor:', product);
    const addedProduct = await productManager.add(product);
    const products = await productManager.getAll();
    io.emit('updateProductList', products);
  });
  
  // Aquí podrías agregar más eventos con socket.on()
});

// Servidor escuchando en puerto 8080
const PORT = 8080;
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

export { io };
