# 📚 Librería Frontend - Aplicación SPA con React

Frontend de sistema de gestión de librería desarrollado con React, React Router y Vite.

## 📋 Descripción

Aplicación web SPA (Single Page Application) para la gestión de una librería online, permitiendo visualizar productos, crear y gestionar inventario de productos y categorías con autenticación de usuarios.

## ✨ Funcionalidades Principales

### 1. Autenticación
- **Login**: Inicio de sesión con email y contraseña
- **Registro**: Creación de nuevas cuentas
- **Protección de rutas**: Rutas privadas solo accesibles con autenticación
- **Persistencia de sesión**: Token JWT almacenado en localStorage

### 2. Módulo de ABMC - Productos
- **Listar**: Vista de todos los productos con paginación
- **Crear**: Formulario para agregar nuevos productos
- **Editar**: Modificación de productos existentes
- **Eliminar**: Eliminación de productos con confirmación
- **Filtrado**: Por categoría
- **Paginación**: Navegación entre páginas de resultados

### 3. Módulo de ABMC - Categorías
- **Listar**: Vista de todas las categorías
- **Crear**: Formulario para agregar nuevas categorías con iconos
- **Editar**: Modificación de categorías existentes
- **Eliminar**: Eliminación con validación de productos asociados
- **Selector de iconos**: Selección visual de emojis para categorías

### 4. Navegación SPA
- React Router DOM v6
- Navegación sin recargas de página
- Rutas protegidas para usuarios autenticados
- Redirección automática al login si no está autenticado

### 5. Uso de Hooks
- **useState**: Manejo de estado local en componentes
- **useEffect**: Efectos secundarios y llamadas a API
- **useContext**: Context API para autenticación global
- **useCallback**: Optimización de funciones en hooks personalizados
- **useNavigate**: Navegación programática
- **useParams**: Parámetros de URL
- **Custom Hooks**: 
  - `useProducts`: Lógica de productos
  - `useCategories`: Lógica de categorías
  - `useAuth`: Autenticación global

## 🛠️ Tecnologías Utilizadas

- **React 18**: Librería de UI
- **React Router DOM v6**: Navegación SPA
- **Vite**: Build tool y dev server
- **Axios**: Cliente HTTP para API
- **CSS3**: Estilos personalizados
- **Context API**: Manejo de estado global
- **Git**: Control de versiones
- **Vercel/Netlify**: Hosting gratuito

## 📁 Estructura del Proyecto

```
libreria-frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Navbar.css
│   │   ├── ProtectedRoute.jsx
│   │   ├── Pagination.jsx
│   │   └── Pagination.css
│   ├── config/
│   │   └── api.js
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useProducts.js
│   │   └── useCategories.js
│   ├── pages/
│   │   ├── home/
│   │   │   ├── HomePage.jsx
│   │   │   └── HomePage.css
│   │   ├── login/
│   │   │   ├── LoginPage.jsx
│   │   │   └── LoginPage.css
│   │   ├── register/
│   │   │   ├── RegisterPage.jsx
│   │   │   └── RegisterPage.css
│   │   ├── products/
│   │   │   ├── ProductsPage.jsx
│   │   │   ├── ProductCard.jsx
│   │   │   ├── ProductForm.jsx
│   │   │   └── ProductsPage.css
│   │   └── categories/
│   │       ├── CategoriesPage.jsx
│   │       ├── CategoryCard.jsx
│   │       ├── CategoryForm.jsx
│   │       └── CategoriesPage.css
│   ├── services/
│   │   ├── authService.js
│   │   ├── productService.js
│   │   └── categoryService.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── .env
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## 🚀 Instrucciones de Uso

### Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/libreria-frontend.git
cd libreria-frontend
```

### Instalar dependencias
```bash
npm install
```

### Configurar variables de entorno
Crear archivo `.env` en la raíz del proyecto:
```bash
VITE_API_URL=http://localhost:5000/api
```

Para producción, cambiar por la URL de tu API desplegada:
```bash
VITE_API_URL=https://tu-api.onrender.com/api
```

### Iniciar el servidor de desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### Compilar para producción
```bash
npm run build
```

### Previsualizar build de producción
```bash
npm run preview
```

## 🎨 Convenciones de Código

### Componentes
- **PascalCase** para nombres de componentes
- Cada componente en su propio archivo
- Estilos específicos junto al componente

### Hooks
- Prefijo **use** para custom hooks
- **camelCase** para el nombre

### Variables y Funciones
- **camelCase** para variables y funciones
- Nombres descriptivos

### Carpetas
- **kebab-case** para nombres de carpetas

## 📸 Capturas de Pantalla

*(Agregar capturas aquí tras el despliegue)*

## 🌐 Deploy

### Vercel
1. Instalar Vercel CLI:
```bash
npm i -g vercel
```

2. Ejecutar deploy:
```bash
vercel
```

3. Configurar variables de entorno en el dashboard de Vercel

### Netlify
1. Instalar Netlify CLI:
```bash
npm i -g netlify-cli
```

2. Ejecutar deploy:
```bash
netlify deploy --prod
```

3. Configurar variables de entorno en el dashboard de Netlify

## 🔗 Enlaces

- **Repositorio**: [GitHub](https://github.com/tu-usuario/libreria-frontend)
- **Deploy**: [URL del deploy]
- **Backend**: [GitHub del backend](https://github.com/tu-usuario/libreria-backend)

## 👥 Contribuidores

- **[Tu Nombre]** - Desarrollo Frontend
- **[Compañero/a]** - Desarrollo Frontend

## 📄 Licencia

ISC

---

Desarrollado como Trabajo Práctico Integrador - UTN Diplomatura MERN 2025