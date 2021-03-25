-- CREAR LA BASE DE DATOS -- 

CREATE DATABASE delilah_resto;

-- CREAR TABLAS --

-- CREAR TABLA USUARIO

CREATE TABLE usuario (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username varchar (256) NOT NULL,
    fullname varchar (256) NOT NULL,
    mail varchar (256) NOT NULL,
    phone INT,
    adress varchar (256),
    pass varchar (256) NOT NULL,
    rol varchar (256) NOT NULL
)

-- CREAR TABLA PLATOS

CREATE TABLE platos(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name varchar (256) NOT NULL,
    price DEC NOT NULL,
    imagen varchar (256) -- Poner el SRC de la imagen
)

-- CREAR PEDIDOS

CREATE TABLE pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    estado varchar (256) NOT NULL,
    fechaHora datetime NOT NULL,
    formaDePago varchar (256) NOT NULL,
    usuario_fk INT NOT NULL,
    FOREIGN KEY (usuario_fk) REFERENCES usuario(ID)
),

-- CREAR DETALLE PEDIDO

CREATE TABLE itemPedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_fk INT NOT NULL,
    FOREIGN KEY (pedido_fk) REFERENCES pedido(ID),
    cantidad INT NOT NULL,
    platos_fk INT NOT NULL,
    FOREIGN KEY (platos_fk) REFERENCES platos(ID)
)