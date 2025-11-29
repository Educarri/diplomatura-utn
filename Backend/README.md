# 📚 Librería Backend - API REST

Backend de sistema de gestión de librería desarrollado con Node.js, Express y MongoDB.

## 📋 Descripción

API RESTful completa para la gestión de una librería, permitiendo realizar operaciones CRUD sobre productos y categorías, con autenticación JWT y validación de datos.

## ✨ Funcionalidades Principales

### 1. Autenticación
- **Registro de usuarios**: Creación de cuentas con validación
- **Login**: Autenticación con JWT
- **Protección de rutas**: Middleware de autenticación
- **Obtener perfil**: Endpoint para datos del usuario actual

### 2. Módulo de ABMC - Productos
- **Listar todos** con paginación y filtros
- **Obtener uno** por ID con detalles de categoría
- **Crear** nuevo producto (requiere autenticación)
- **Actualizar** producto existente (requiere autenticación)
- **Eliminar** producto (requiere autenticación)

### 3. Módulo de ABMC - Categorías
- **Listar todas** con paginación
- **Obtener una** por ID con contador de productos
- **Crear** nueva categoría (requiere autenticación)
- **Actualizar** categoría existente (requiere autenticación)
- **Eliminar** categoría (requiere autenticación, valida productos asociados)

### 4. Validación
- Validación de datos de entrada con express-validator
- Validación de formato de email
- Validación de IDs de MongoDB
- Validación de tipos de datos y rangos

### 5. Logger
- Sistema de logging con Winston
- Registro de errores en archivo `logs/error.log`
- Registro general en archivo `logs/all.log`
- Logs en consola con colores

## 🛠️ Tecnologías Utilizadas

- **Node.js**: Entorno de ejecución
- **Express.js**: Framework web
- **MongoDB**: Base de datos NoSQL
- **Mongoose**: ODM para MongoDB
- **JWT**: Autenticación con tokens
- **bcryptjs**: Encriptación de contraseñas
- **express-validator**: Validación de datos
- **Winston**: Sistema de logging
- **dotenv**: Variables de entorno
- **CORS**: Configuración de acceso cross-origin
- **Git**: Control de versiones
- **Render/Vercel**: Hosting gratuito

## 📁 Estructura del Proyecto

```
libreria-backend/
├── src/
│   ├── config/
│   │   ├── config.js          # Configuración general
│   │   ├── database.js        # Conexión a MongoDB
│   │   └── logger.js          # Configuración de Winston
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   └── categoryController.js
│   ├── middlewares/
│   │   ├── auth.js            # Protección y autorización
│   │   └── errorHandler.js    # Manejo centralizado de errores
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   └── Category.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   └── categoryRoutes.js
│   ├── validators/
│   │   └── validators.js      # Validaciones con express-validator
│   └── index.js               # Punto de entrada
├── logs/                      # Archivos de logs (gitignored)
├── .env                       # Variables de entorno (gitignored)
├── .env.example              # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Instrucciones de Uso

### Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/libreria-backend.git
cd libreria-backend
```

### Instalar dependencias
```bash
npm install
```

### Configurar variables de entorno
Crear archivo `.env` basado en `.env.example`:
```bash
PORT=5000
MONGODB_URI=tu_conexion_mongodb
JWT_SECRET=tu_clave_secreta
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

### Iniciar el servidor de desarrollo
```bash
npm run dev
```

### Iniciar el servidor de producción
```bash
npm start
```

## 📡 Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registrar usuario
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Obtener perfil (requiere token)

### Productos
- `GET /api/products` - Listar todos (con paginación)
- `GET /api/products/:id` - Obtener uno
- `POST /api/products` - Crear (requiere token)
- `PUT /api/products/:id` - Actualizar (requiere token)
- `DELETE /api/products/:id` - Eliminar (requiere token)

### Categorías
- `GET /api/categories` - Listar todas (con paginación)
- `GET /api/categories/:id` - Obtener una
- `POST /api/categories` - Crear (requiere token)
- `PUT /api/categories/:id` - Actualizar (requiere token)
- `DELETE /api/categories/:id` - Eliminar (requiere token)

## 📝 Ejemplos de Uso

### Registro
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "123456"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "123456"
  }'
```

### Crear Producto (con token)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer tu_token_jwt" \
  -d '{
    "nombre": "Cuaderno A4",
    "descripcion": "Cuaderno tapa dura 100 hojas",
    "precio": 2500,
    "stock": 50,
    "categoria": "id_categoria",
    "marca": "Gloria"
  }'
```

## 🌐 Deploy

### Render
1. Crear cuenta en [Render](https://render.com)
2. Conectar repositorio de GitHub
3. Configurar variables de entorno
4. Deploy automático desde la rama main

### Vercel
1. Instalar Vercel CLI: `npm i -g vercel`
2. Ejecutar: `vercel`
3. Seguir instrucciones
4. Configurar variables de entorno en el dashboard

## 👥 Contribuidores

- **Carnascari Solange** - Desarrollo Backend / Frontend
- **Carrizo Eduardo** - Desarrollo Backend / Frontend

## 📄 Licencia

ISC

---

Desarrollado como Trabajo Práctico Integrador - UTN Diplomatura MERN 2025
