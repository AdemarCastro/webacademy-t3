# Criando um Banco de Dados
CREATE DATABASE lojaweb
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_general_ci
;

# Usar Banco de Dados
USE lojaweb;

CREATE TABLE IF NOT EXISTS Cliente (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome_completo VARCHAR(120) NOT NULL,
cpf VARCHAR(14) NOT NULL UNIQUE,
numeros_celular VARCHAR(60) NOT NULL,
email VARCHAR(120) NOT NULL,
data_nascimento VARCHAR(10) NOT NULL
) DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS Endereco (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
cep  VARCHAR(10) NOT NULL,
pais VARCHAR(100) NOT NULL,
estado VARCHAR(50) NOT NULL,
cidade VARCHAR(100) NOT NULL,
bairro VARCHAR(100) NOT NULL,
rua VARCHAR(255) NOT NULL,
numero VARCHAR(10) NOT NULL,
ts_adiciona TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ts_exclui TIMESTAMP DEFAULT NULL,
id_cliente INT NOT NULL,
FOREIGN KEY (id_cliente) REFERENCES Cliente(id)
) DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS Categoria (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(60) NOT NULL,
descricao VARCHAR(120) NOT NULL
) DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS Subcategoria (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(60) NOT NULL,
descricao VARCHAR(120) NOT NULL,
id_categoria INT NOT NULL,
FOREIGN KEY (id_categoria) REFERENCES Categoria(id)
) DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS Produto (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
modelo VARCHAR(120) NOT NULL,
fabricante VARCHAR(120) NOT NULL,
preco_base FLOAT NOT NULL,
estoque VARCHAR(12),
id_subcategoria INT NOT NULL,
FOREIGN KEY (id_subcategoria) REFERENCES Subcategoria(id)
) DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS Numero_de_Serie (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
num_serie VARCHAR(30) NOT NULL,
status VARCHAR(20) NOT NULL,
ts_adiciona TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ts_vende TIMESTAMP DEFAULT NULL,
id_produto INT NOT NULL,
FOREIGN KEY (id_produto) REFERENCES Produto(id)
) DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS Compra (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
desconto VARCHAR(10) NOT NULL,
forma_pagamento VARCHAR(60) NOT NULL,
total_compra FLOAT NOT NULL,
id_endereco INT NOT NULL,
FOREIGN KEY (id_endereco) REFERENCES Endereco(id)
) DEFAULT CHARACTER SET utf8mb4;

CREATE TABLE IF NOT EXISTS Detalhes_Compra (
id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
id_compra INT NOT NULL,
id_produto INT NOT NULL,
id_numero_de_serie INT NOT NULL,
FOREIGN KEY (id_compra) REFERENCES Compra(id),
FOREIGN KEY (id_produto) REFERENCES Produto(id),
FOREIGN KEY (id_numero_de_serie) REFERENCES Numero_de_Serie(id)
) DEFAULT CHARACTER SET utf8mb4;

# Inserindo dados na tabela Cliente
INSERT INTO Cliente (nome_completo, cpf, numeros_celular, email, data_nascimento)
VALUES ('João Silva', '123.456.789-10', '(99) 9999-9999', 'joao@example.com', '1990-05-15');

# Inserindo dados na tabela Endereco
INSERT INTO Endereco (cep, pais, estado, cidade, bairro, rua, numero, id_cliente)
VALUES ('12345-678', 'Brasil', 'São Paulo', 'São Paulo', 'Centro', 'Rua Principal', '123', 1);

# Inserindo dados na tabela Categoria
INSERT INTO Categoria (nome, descricao)
VALUES ('Eletrônicos', 'Produtos eletrônicos em geral');

# Inserindo dados na tabela Subcategoria
INSERT INTO Subcategoria (nome, descricao, id_categoria)
VALUES ('Smartphones', 'Telefones inteligentes', 1);

# Inserindo dados na tabela Produto
INSERT INTO Produto (modelo, fabricante, preco_base, estoque, id_subcategoria)
VALUES ('iPhone 12', 'Apple', 6999.99, '10', 1);

# Inserindo dados na tabela Numero_de_Serie
INSERT INTO Numero_de_Serie (num_serie, status, id_produto)
VALUES ('1234567890', 'Disponível', 1);

# Inserindo dados na tabela Compra
INSERT INTO Compra (desconto, forma_pagamento, total_compra, id_endereco)
VALUES ('0.00', 'Cartão de crédito', 6999.99, 1);

# Inserindo dados na tabela Detalhes_Compra
INSERT INTO Detalhes_Compra (id_compra, id_produto, id_numero_de_serie)
VALUES (1, 1, 1);
