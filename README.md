# Galería Arte

Galería arte es una plataforma web para la compraventa de obras de arte. La aplicación está construida utilizando un enfoque de monorepo, con un frontend desarrollado en React y un backend en Node.js.

## Tecnologías Utilizadas

- **Frontend:**
  - React
  - React Router
  - Bootstrap
- **Backend:**
  - Node.js
  - Express
  - pg (PostgreSQL)
  - jsonwebtoken
  - bcryptjs
  - jest

## Uso

La carpeta backend necesita un archivo `.env` con las siguientes variables que se deben reemplazar de acuerdo a la implementación local de tu PostgreSQL

```text
PORT=<puerto del servidor> 
PGUSER=postgres
PGPASSWORD=postgres
PGHOST=localhost
PGPORT=5432
PGDATABASE=galeria_arte
JWT_SECRET=<contraseña segura>
```
