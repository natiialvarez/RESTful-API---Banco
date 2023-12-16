create database dindin

CREATE TABLE usuarios(
  id  serial PRIMARY KEY,
  nome varchar(100),
  email varchar(100) UNIQUE NOT NULL,
  senha varchar(100) NOT NULL 
);

CREATE TABLE categorias (
    id SERIAL PRIMARY KEY,
    descricao VARCHAR(50)
);

CREATE TABLE transacoes(
  id SERIAL PRIMARY KEY,
  descricao TEXT,
  valor INTEGER,
  data TIMESTAMP WITH TIME ZONE,
  usuario_id INTEGER REFERENCES usuarios(id),
  categoria_id INTEGER REFERENCES categorias(id),
  tipo VARCHAR(20)
  );
