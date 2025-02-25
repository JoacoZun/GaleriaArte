CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  rol VARCHAR(50) DEFAULT 'cliente',
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  telefono VARCHAR(20),
  direccion TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS obras (
  id SERIAL PRIMARY KEY,
  estado VARCHAR(20) NOT NULL DEFAULT 'disponible',
  nombre VARCHAR(255) NOT NULL,
  autor VARCHAR(255) NOT NULL,
  precio DECIMAL(10, 2) NOT NULL,
  img_url VARCHAR(255),
  descripcion TEXT,
  categoria VARCHAR(50),
  tecnica VARCHAR(255),
  alto SMALLINT,
  ancho SMALLINT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT estados CHECK (estado IN ('disponible', 'vendida', 'no disponible'))
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  estado VARCHAR(20) DEFAULT 'pendiente',
  precio_total DECIMAL(10, 2) NOT NULL,
  direccion TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE IF NOT EXISTS orders_obra (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  obra_id INTEGER,
  CONSTRAINT fk_order FOREIGN KEY (order_id) REFERENCES orders (id),
  CONSTRAINT fk_obra FOREIGN KEY (obra_id) REFERENCES obras (id)
);
