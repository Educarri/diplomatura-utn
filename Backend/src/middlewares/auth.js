import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';
import { User } from '../models/User.js';
import { logger } from '../config/logger.js';

export const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    logger.warn('No hay token en la petición');
    return res.status(401).json({
      success: false,
      message: 'No autorizado, no hay token',
    });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    logger.error(`Error en autenticación: ${error.message}`);
    return res.status(401).json({
      success: false,
      message: 'No autorizado, token inválido',
    });
  }
};

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.rol)) {
      logger.warn(`Usuario ${req.user.email} sin permisos para esta ruta`);
      return res.status(403).json({
        success: false,
        message: `El rol ${req.user.rol} no tiene autorización para acceder a esta ruta`,
      });
    }
    next();
  };
};