import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import { connectDB } from './config/database.js';
import { logger } from './config/logger.js';
import { errorHandler } from './middlewares/errorHandler.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

// Conectar a la base de datos
connectDB();

const app = express();

// Middlewares
app.use(cors({
  origin: config.frontendUrl,
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger de peticiones
app.use((req, res, next) => {
  logger.http(`${req.method} ${req.url}`);
  next();
});

// Rutas
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API de Librería funcionando correctamente',
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);

// Manejador de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = config.port;
app.listen(PORT, () => {
  logger.info(`Servidor corriendo en puerto ${PORT} en modo ${config.nodeEnv}`);
});