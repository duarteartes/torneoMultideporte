-- Crear la base de datos solo si no existe
CREATE DATABASE IF NOT EXISTS torneoMultideporte CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE torneoMultideporte;

-- Tabla torneos
CREATE TABLE IF NOT EXISTS torneos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    anio YEAR NOT NULL,
    nombre VARCHAR(100)
);

-- Tabla disciplinas
CREATE TABLE IF NOT EXISTS disciplinas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

-- Tabla equipos
CREATE TABLE IF NOT EXISTS equipos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    disciplina_id INT NOT NULL,
    torneo_id INT NOT NULL,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (torneo_id) REFERENCES torneos(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Tabla partidos
CREATE TABLE IF NOT EXISTS partidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    torneo_id INT NOT NULL,
    disciplina_id INT NOT NULL,
    equipo_local_id INT NOT NULL,
    equipo_visitante_id INT NOT NULL,
    fase VARCHAR(50) NOT NULL,
    resultado_local INT DEFAULT NULL,
    resultado_visitante INT DEFAULT NULL,
    ganador_id INT DEFAULT NULL,
    fecha DATETIME DEFAULT NULL,
    FOREIGN KEY (torneo_id) REFERENCES torneos(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (disciplina_id) REFERENCES disciplinas(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (equipo_local_id) REFERENCES equipos(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (equipo_visitante_id) REFERENCES equipos(id)
        ON UPDATE CASCADE ON DELETE RESTRICT,
    FOREIGN KEY (ganador_id) REFERENCES equipos(id)
        ON UPDATE CASCADE ON DELETE RESTRICT
);

-- Tabla administradores
CREATE TABLE IF NOT EXISTS administradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasena VARCHAR(255) NOT NULL
);