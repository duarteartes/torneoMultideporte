-- INSERT DE TORNEOS
INSERT INTO torneos (anio, nombre) VALUES
(2025, 'Torneo Multideporte 2025'),
(2024, 'Torneo Multideporte 2024');

-- INSERT DE DISCIPLINAS
INSERT INTO disciplinas (id, nombre) VALUES
(1, 'Futbol Sala'),
(2, 'Basket'),
(3, 'Ping Pong'),
(4, 'Tenis'),
(5, 'Frontón'),
(6, 'Padel');

-- INSERT DE EQUIPOS
-- Equipos 2025
INSERT INTO equipos (nombre, disciplina_id, torneo_id) VALUES
-- Futbol Sala
('FS Tornado', 1, 1),
('FS Rápidos', 1, 1),
('FS Titanes', 1, 1),
('FS Relámpago', 1, 1),
-- Basket
('Basket Raptors', 2, 1),
('Basket Bulls', 2, 1),
('Basket Warriors', 2, 1),
('Basket Giants', 2, 1),
-- Ping Pong
('Ping Pong Masters', 3, 1),
('Ping Pong Rockets', 3, 1),
('Ping Pong Dragons', 3, 1),
('Ping Pong Ninjas', 3, 1),
-- Tenis
('Tenis Stars', 4, 1),
('Tenis Eagles', 4, 1),
('Tenis Tigers', 4, 1),
('Tenis Falcons', 4, 1),
-- Frontón
('Frontón Aces', 5, 1),
('Frontón Blazers', 5, 1),
('Frontón Hawks', 5, 1),
('Frontón Wolves', 5, 1),
-- Padel
('Padel Kings', 6, 1),
('Padel Queens', 6, 1),
('Padel Knights', 6, 1),
('Padel Princes', 6, 1);
-- Equipos 2024
INSERT INTO equipos (nombre, disciplina_id, torneo_id) VALUES
-- Futbol Sala
('FS Cometas', 1, 2),
('FS Vipers', 1, 2),
('FS Gladiadores', 1, 2),
('FS Dragones', 1, 2),
-- Basket
('Basket Lions', 2, 2),
('Basket Sharks', 2, 2),
('Basket Eagles', 2, 2),
('Basket Thunder', 2, 2),
-- Ping Pong
('Ping Pong Falcons', 3, 2),
('Ping Pong Titans', 3, 2),
('Ping Pong Warriors', 3, 2),
('Ping Pong Panthers', 3, 2),
-- Tenis
('Tenis Gladiators', 4, 2),
('Tenis Legends', 4, 2),
('Tenis Rockets', 4, 2),
('Tenis Bulls', 4, 2),
-- Frontón
('Frontón Tigers', 5, 2),
('Frontón Lions', 5, 2),
('Frontón Dragons', 5, 2),
('Frontón Phoenix', 5, 2),
-- Padel
('Padel Warriors', 6, 2),
('Padel Eagles', 6, 2),
('Padel Sharks', 6, 2),
('Padel Falcons', 6, 2);

-- INSERT DE PARTIDOS
-- PARTIDOS 2025
-- Fútbol Sala (disciplina_id = 1)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(1, 1, 1, 2, 'Dieciseisavos', 4, 2, 1, '2025-04-01 18:00:00'),
(1, 1, 3, 4, 'Dieciseisavos', 3, 1, 3, '2025-04-01 20:00:00'),
(1, 1, 1, 3, 'Octavos', 2, 3, 3, '2025-04-10 18:00:00'),
(1, 1, 3, 2, 'Cuartos', 5, 4, 3, '2025-04-20 19:00:00'),
(1, 1, 3, 1, 'Semifinales', 1, 2, 1, '2025-04-30 20:00:00'),
(1, 1, 1, 4, 'Final', 3, 1, 1, '2025-05-10 21:00:00');
-- Basket (disciplina_id = 2)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(1, 2, 5, 6, 'Dieciseisavos', 80, 70, 5, '2025-04-02 18:00:00'),
(1, 2, 7, 8, 'Dieciseisavos', 75, 65, 7, '2025-04-02 20:00:00'),
(1, 2, 5, 7, 'Octavos', 82, 77, 5, '2025-04-12 18:00:00'),
(1, 2, 5, 8, 'Cuartos', 88, 70, 5, '2025-04-22 19:00:00'),
(1, 2, 5, 7, 'Semifinales', 78, 85, 7, '2025-05-02 20:00:00'),
(1, 2, 7, 6, 'Final', 90, 85, 7, '2025-05-12 21:00:00');
-- Ping Pong (disciplina_id = 3)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(1, 3, 9, 10, 'Dieciseisavos', 3, 1, 9, '2025-04-03 18:00:00'),
(1, 3, 11, 12, 'Dieciseisavos', 2, 3, 12, '2025-04-03 20:00:00'),
(1, 3, 9, 12, 'Octavos', 3, 2, 9, '2025-04-13 18:00:00'),
(1, 3, 9, 11, 'Cuartos', 3, 0, 9, '2025-04-23 19:00:00'),
(1, 3, 9, 10, 'Semifinales', 3, 2, 9, '2025-05-03 20:00:00'),
(1, 3, 9, 12, 'Final', 3, 1, 9, '2025-05-13 21:00:00');
-- Tenis (disciplina_id = 4)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(1, 4, 13, 14, 'Dieciseisavos', 6, 4, 13, '2025-04-04 18:00:00'),
(1, 4, 15, 16, 'Dieciseisavos', 5, 7, 16, '2025-04-04 20:00:00'),
(1, 4, 13, 16, 'Octavos', 7, 5, 13, '2025-04-14 18:00:00'),
(1, 4, 13, 15, 'Cuartos', 6, 2, 13, '2025-04-24 19:00:00'),
(1, 4, 13, 16, 'Semifinales', 6, 7, 16, '2025-05-04 20:00:00'),
(1, 4, 16, 14, 'Final', 6, 8, 14, '2025-05-14 21:00:00');
-- Frontón (disciplina_id = 5)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(1, 5, 17, 18, 'Dieciseisavos', 11, 7, 17, '2025-04-05 18:00:00'),
(1, 5, 19, 20, 'Dieciseisavos', 9, 12, 20, '2025-04-05 20:00:00'),
(1, 5, 17, 20, 'Octavos', 14, 10, 17, '2025-04-15 18:00:00'),
(1, 5, 17, 18, 'Cuartos', 13, 8, 17, '2025-04-25 19:00:00'),
(1, 5, 17, 20, 'Semifinales', 10, 14, 20, '2025-05-05 20:00:00'),
(1, 5, 20, 18, 'Final', 15, 13, 20, '2025-05-15 21:00:00');
-- Padel (disciplina_id = 6)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(1, 6, 21, 22, 'Dieciseisavos', 2, 1, 21, '2025-04-06 18:00:00'),
(1, 6, 23, 24, 'Dieciseisavos', 3, 4, 24, '2025-04-06 20:00:00'),
(1, 6, 21, 24, 'Octavos', 4, 2, 21, '2025-04-16 18:00:00'),
(1, 6, 21, 22, 'Cuartos', 3, 2, 21, '2025-04-26 19:00:00'),
(1, 6, 21, 24, 'Semifinales', 2, 4, 24, '2025-05-06 20:00:00'),
(1, 6, 24, 22, 'Final', 4, 3, 24, '2025-05-16 21:00:00');
-- PARTIDOS 2024
-- Fútbol Sala (disciplina_id = 1)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(2, 1, 25, 26, 'Dieciseisavos', 3, 4, 26, '2024-03-01 18:00:00'),
(2, 1, 27, 28, 'Dieciseisavos', 2, 2, NULL, '2024-03-01 20:00:00'),
(2, 1, 26, 27, 'Octavos', 1, 3, 27, '2024-03-10 18:00:00'),
(2, 1, 27, 25, 'Cuartos', 2, 0, 27, '2024-03-20 19:00:00'),
(2, 1, 27, 28, 'Semifinales', 3, 2, 27, '2024-03-30 20:00:00'),
(2, 1, 27, 25, 'Final', 2, 1, 27, '2024-04-10 21:00:00');
-- Basket (disciplina_id = 2)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(2, 2, 29, 30, 'Dieciseisavos', 68, 72, 30, '2024-03-02 18:00:00'),
(2, 2, 31, 32, 'Dieciseisavos', 74, 70, 31, '2024-03-02 20:00:00'),
(2, 2, 30, 31, 'Octavos', 71, 69, 30, '2024-03-12 18:00:00'),
(2, 2, 30, 32, 'Cuartos', 66, 70, 32, '2024-03-22 19:00:00'),
(2, 2, 30, 31, 'Semifinales', 69, 75, 31, '2024-04-01 20:00:00'),
(2, 2, 31, 29, 'Final', 80, 78, 31, '2024-04-11 21:00:00');
-- Ping Pong (disciplina_id = 3)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(2, 3, 33, 34, 'Dieciseisavos', 3, 2, 33, '2024-03-03 18:00:00'),
(2, 3, 35, 36, 'Dieciseisavos', 1, 3, 36, '2024-03-03 20:00:00'),
(2, 3, 33, 36, 'Octavos', 3, 1, 33, '2024-03-13 18:00:00'),
(2, 3, 33, 35, 'Cuartos', 3, 2, 33, '2024-03-23 19:00:00'),
(2, 3, 33, 34, 'Semifinales', 3, 0, 33, '2024-04-02 20:00:00'),
(2, 3, 33, 36, 'Final', 3, 1, 33, '2024-04-12 21:00:00');
-- Tenis (disciplina_id = 4)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(2, 4, 37, 38, 'Dieciseisavos', 7, 5, 37, '2024-03-04 18:00:00'),
(2, 4, 39, 40, 'Dieciseisavos', 6, 7, 40, '2024-03-04 20:00:00'),
(2, 4, 37, 40, 'Octavos', 6, 4, 37, '2024-03-14 18:00:00'),
(2, 4, 37, 39, 'Cuartos', 7, 2, 37, '2024-03-24 19:00:00'),
(2, 4, 37, 40, 'Semifinales', 5, 7, 40, '2024-04-04 20:00:00'),
(2, 4, 40, 38, 'Final', 7, 6, 40, '2024-04-14 21:00:00');
-- Frontón (disciplina_id = 5)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(2, 5, 41, 42, 'Dieciseisavos', 10, 9, 41, '2024-03-05 18:00:00'),
(2, 5, 43, 44, 'Dieciseisavos', 8, 12, 44, '2024-03-05 20:00:00'),
(2, 5, 41, 44, 'Octavos', 14, 11, 41, '2024-03-15 18:00:00'),
(2, 5, 41, 42, 'Cuartos', 13, 7, 41, '2024-03-25 19:00:00'),
(2, 5, 41, 44, 'Semifinales', 12, 13, 44, '2024-04-05 20:00:00'),
(2, 5, 44, 42, 'Final', 14, 12, 44, '2024-04-15 21:00:00');
-- Padel (disciplina_id = 6)
INSERT INTO partidos (torneo_id, disciplina_id, equipo_local_id, equipo_visitante_id, fase, resultado_local, resultado_visitante, ganador_id, fecha) VALUES
(2, 6, 45, 46, 'Dieciseisavos', 3, 2, 45, '2024-03-06 18:00:00'),
(2, 6, 47, 48, 'Dieciseisavos', 2, 4, 48, '2024-03-06 20:00:00'),
(2, 6, 45, 48, 'Octavos', 3, 1, 45, '2024-03-16 18:00:00'),
(2, 6, 45, 46, 'Cuartos', 4, 2, 45, '2024-03-26 19:00:00'),
(2, 6, 45, 48, 'Semifinales', 2, 4, 48, '2024-04-06 20:00:00'),
(2, 6, 48, 46, 'Final', 5, 3, 48, '2024-04-16 21:00:00');

-- INSERT DE ADMINISTRADORES
-- Usuario: admin -> Conraseña: root
INSERT INTO administradores (usuario, contrasena) VALUES
('admin', '$2b$10$q3EgK.9IPG7jC23jitm/a./qZUU.TDOuCIIhYt1mt/AW/GRM2/w5S');