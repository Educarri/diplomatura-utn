import mongoose from 'mongoose';
import { config } from './config.js';
import { logger } from './logger.js';

export const connectDB = async () => {
  try {
    console.log('Conectando a MongoDB con URI:', config.mongodbUri ? '[REDACTED]' : config.mongodbUri);
    const conn = await mongoose.connect(config.mongodbUri);
    logger.info(`MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`Error al conectar MongoDB: ${error.message}`);
    process.exit(1);
  }
};