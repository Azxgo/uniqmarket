# UniqMarket

UniqMarket is an e-commerce platform focused on the management and sale of products that are not commonly found in traditional stores.

It allows users to explore a dynamic catalog, filter products, manage their shopping cart, and perform complete store administration through an administrator panel.

## Features

- 🛒 Dynamic product catalog.
- 🔎 Product search and filtering.
- 👤 User authentication system.
- 🛍️ User-associated shopping cart.
- 📦 Management of products, categories, and vendors.
- 🔐 Complete administration panel.
- 📊 Store information management and control.

## Technologies

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

## Project Structure

```
UniqMarket/
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── routers/
│   ├── utils/
│   ├── package.json
│
├── frontend/
│   ├── src/
│   ├── package.json
│
└── database/
    └── uniqmarket_db.sql
```

# Installation

## Requirements

Before starting, make sure you have installed:

- Node.js
- MySQL
- Git

## Clone the repository

```bash
git clone https://github.com/usuario/uniqmarket.git
cd uniqmarket
```

---

# Database Configuration

Create the database using the included SQL file:

```
database/uniqmarket_db.sql
```

You can import it using MySQL:

```bash
mysql -u root -p uniqmarket_db < database/uniqmarket_db.sql
```

This file contains the database structure and the initial data required to run the application.

---

# Backend

Navigate to the backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
DB_ENGINE=mysql

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_PORT=3306
DATABASE=uniqmarket_db

JWT_SECRET=your_secret_key
```

Run the server:

```bash
npm run dev
```

The backend will be available at:

```
http://localhost:3000
```

---

# Frontend

Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the application:

```bash
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

---

## Database

The project was initially developed using MySQL, but it was later migrated to PostgreSQL.

To run the application, create a database named:

```
uniqmarket_db
```

and configure the database credentials in the `.env` file.

# Demo

https://uniqmarket.vercel.app/

> ⚠️ The backend uses a free service. The first load may take a few seconds.

---

# Notice

This repository is published solely for demonstration and skill evaluation purposes.

All rights to the code are reserved. Copying, redistribution, or reuse of the code is not permitted without explicit authorization from the author.