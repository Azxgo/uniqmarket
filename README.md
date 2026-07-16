# UniqMarket

UniqMarket es una plataforma de e-commerce enfocada en la gestión y venta de productos que no suelen encontrarse en tiendas tradicionales.

Permite a los usuarios explorar un catálogo dinámico, filtrar productos, gestionar su carrito de compra y realizar una administración completa de la tienda mediante un panel de administrador.

## Características

- 🛒 Catálogo dinámico de productos.
- 🔎 Búsqueda y filtrado de productos.
- 👤 Sistema de autenticación de usuarios.
- 🛍️ Carrito de compra asociado a usuarios.
- 📦 Gestión de productos, categorías y vendedores.
- 🔐 Panel de administración completo.
- 📊 Control y gestión de la información de la tienda.

## Tecnologías

### Frontend

- React
- TypeScript
- Tailwind CSS
- React Router

### Backend

- Node.js
- Express
- SQL
- JWT

## Estructura del proyecto

```
UniqMarket/
│
├── backend/
│   ├── controllers/
|   ├── middlewares/
|   ├── routers/
|   ├── utils/
│   ├── package.json
│
├── frontend/
│   ├── src/
│   ├── package.json
│
└── database/
    └── uniqmarket_db.sql
```

# Instalación

## Requisitos

Antes de iniciar asegúrate de tener instalado:

- Node.js
- MySQL
- Git

## Clonar el repositorio

```bash
git clone https://github.com/usuario/uniqmarket.git
cd uniqmarket
```

---

# Configuración de Base de Datos

Crear la base de datos utilizando el archivo SQL incluido:

```
database/uniqmarket_db.sql
```

Puedes importarlo mediante MySQL:

```bash
mysql -u root -p uniqmarket_db < database/uniqmarket_db.sql
```

Este archivo contiene la estructura de la base de datos y los datos iniciales necesarios para ejecutar la aplicación.

---

# Backend

Ingresar a la carpeta del backend:

```bash
cd backend
```

Instalar dependencias:

```bash
npm install
```

Crear un archivo `.env`:

```env
DB_ENGINE=mysql

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_password
DB_PORT=3306
DATABASE=uniqmarket_db

JWT_SECRET=tu_secret_key
```

Ejecutar el servidor:

```bash
npm run dev
```

El backend estará disponible en:

```
http://localhost:3000
```

---

# Frontend

Abrir una nueva terminal e ingresar a la carpeta del frontend:

```bash
cd frontend
```

Instalar dependencias:

```bash
npm install
```

Ejecutar la aplicación:

```bash
npm run dev
```

El frontend estará disponible en:

```
http://localhost:5173
```

---

## Base de datos

El proyecto en principio utilizó MySql para su desarrollo, pero posteriormente fue cambiado a PostgreSQL

Para ejecutar la aplicación se debe crear una base de datos llamada:

uniqmarket_db

y configurar las credenciales en el archivo `.env`.

# Demo

https://uniqmarket.vercel.app/

> ⚠️ El backend utiliza un servicio gratuito. La primera carga puede tardar unos segundos.

---

# Aviso

Este repositorio se publica únicamente con fines de demostración y evaluación de habilidades.

Todos los derechos sobre el código están reservados. No está permitida su copia, redistribución o reutilización sin autorización expresa del autor.