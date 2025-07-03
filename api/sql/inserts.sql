-- Insertar algunos torneos
INSERT INTO torneos (anio, nombre) VALUES
(2025, 'Torneo Primavera 2025'),
(2024, 'Torneo Verano 2024');

-- Insertar disciplinas
INSERT INTO disciplinas (nombre) VALUES
('Futbol Sala'),
('Basket'),
('Ping Pong'),
('Tenis'),
('Fronton'),
('Padel');

-- Insertar equipos
INSERT INTO equipos (nombre, disciplina_id, torneo_id) VALUES
('Los Invencibles', 1, 1),
('Los Titanes', 1, 1),
('Basket Kings', 2, 1),
('Ping Pong Masters', 3, 2),
('Tenistas Pro', 4, 2),
('Padel Warriors', 6, 1),
('Los Rápidos', 1, 1),
('Fútbol Stars', 1, 1),
('Basket Pros', 2, 1),
('Basket Legends', 2, 1),
('Ping Pong Fighters', 3, 2),
('Tenis Masters', 4, 2),
('Fronton Elite', 5, 2),
('Padel Team A', 6, 1),
('Padel Team B', 6, 1);

-- Insertar partidos
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(1, 1, 1, 2, 'Cuartos', 3, 1, 1, '2025-07-10 18:00:00'),
(1, 2, 3, 6, 'Semifinal', NULL, NULL, NULL, '2025-07-11 20:00:00'),
(2, 3, 4, 5, 'Final', 2, 3, 5, '2024-08-15 19:00:00'),
(1, 1, 1, 7, 'Semifinal', NULL, NULL, NULL, '2025-07-12 17:00:00'),
(1, 1, 2, 8, 'Semifinal', NULL, NULL, NULL, '2025-07-12 19:00:00'),
(1, 1, 1, 2, 'Final', NULL, NULL, NULL, '2025-07-13 20:00:00'),
(1, 2, 3, 4, 'Cuartos', 55, 60, 4, '2025-07-10 18:00:00'),
(1, 2, 5, 6, 'Cuartos', 68, 70, 6, '2025-07-11 20:00:00'),
(2, 3, 5, 7, 'Semifinal', 3, 1, 5, '2024-08-10 18:00:00'),
(2, 4, 6, 7, 'Final', NULL, NULL, NULL, '2024-08-15 19:00:00'),
(2, 5, 7, 8, 'Cuartos', 5, 4, 7, '2024-08-05 16:00:00'),
(1, 6, 9, 10, 'Semifinal', NULL, NULL, NULL, '2025-07-14 18:00:00');

-- Insertar administrador de prueba
INSERT INTO administradores (usuario, contrasena) VALUES
('admin', 'root');
