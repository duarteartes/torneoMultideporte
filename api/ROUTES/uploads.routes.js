const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const router = express.Router();

// Configuración de almacenamiento dinámico (con async para obtener nombre de disciplina)
const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const disciplinaId = parseInt(req.params.disciplinaId, 10);
        if (isNaN(disciplinaId)) {
            return cb(new Error('disciplinaId inválido'));
        }

        try {
            const connection = await mysql.createConnection({
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: 'torneoMultideporte',
                port: process.env.DB_PORT,
            });

            const [rows] = await connection.execute('SELECT nombre FROM disciplinas WHERE id = ?', [disciplinaId]);
            await connection.end();

            if (rows.length === 0) {
                return cb(new Error('Disciplina no encontrada'));
            }

            const nombreDisciplina = rows[0].nombre;
            const dir = path.join(__dirname, '../uploads/cuadroEliminatorias', nombreDisciplina);

            if (!fs.existsSync(dir)) {
                fs.mkdirSync(dir, { recursive: true });
            }

            cb(null, dir);
        } catch (error) {
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// POST: subir imagen con disciplinaId numérico y torneo_id en body
router.post('/upload/:disciplinaId', upload.single('imagen'), async (req, res) => {
    const disciplinaId = parseInt(req.params.disciplinaId, 10);
    const torneoId = req.body.torneo_id;

    if (!req.file || isNaN(disciplinaId) || !torneoId) {
        return res.status(400).json({ error: 'Faltan datos necesarios (imagen, disciplina, torneo_id)' });
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'torneoMultideporte',
            port: process.env.DB_PORT,
        });

        // Obtener nombre de disciplina para construir la ruta relativa
        const [disciplinaRows] = await connection.execute(
            'SELECT nombre FROM disciplinas WHERE id = ?',
            [disciplinaId]
        );

        if (disciplinaRows.length === 0) {
            await connection.end();
            return res.status(404).json({ error: 'Disciplina no encontrada' });
        }

        const disciplinaNombre = disciplinaRows[0].nombre;
        const filename = req.file.filename;
        const rutaRelativa = `/cuadroEliminatorias/${disciplinaNombre}/${filename}`;

        // Insertar registro en la tabla cuadros_eliminatorios
        await connection.execute(
                `INSERT INTO cuadros_eliminatorios (filename, ruta, disciplina_id, torneo_id)
                VALUES (?, ?, ?, ?)`,
            [filename, rutaRelativa, disciplinaId, torneoId]
        );

        await connection.end();

        res.status(200).json({
            mensaje: 'Imagen subida y registrada en la base de datos',
            filename,
            ruta: rutaRelativa,
        });
    } catch (err) {
        console.error('Error al guardar en la BBDD:', err);
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
});

// GET: obtener imágenes por torneoId y disciplinaId (ambos numéricos)
router.get('/:torneoId/:disciplinaId', async (req, res) => {
    const torneoId = parseInt(req.params.torneoId, 10);
    const disciplinaId = parseInt(req.params.disciplinaId, 10);

    if (isNaN(torneoId) || isNaN(disciplinaId)) {
        return res.status(400).json({ error: 'Parámetros inválidos: torneoId y disciplinaId deben ser números' });
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'torneoMultideporte',
            port: process.env.DB_PORT,
        });

        // Verificar que la disciplina existe
        const [disciplinaRows] = await connection.execute(
            'SELECT nombre FROM disciplinas WHERE id = ?',
            [disciplinaId]
        );

        if (disciplinaRows.length === 0) {
            await connection.end();
            return res.status(404).json({ error: 'Disciplina no encontrada' });
        }

        // Obtener imágenes filtradas
        const [result] = await connection.execute(
                `SELECT id, filename, ruta, fecha_subida FROM cuadros_eliminatorios
                WHERE torneo_id = ? AND disciplina_id = ?`,
            [torneoId, disciplinaId]
        );

        await connection.end();

        res.json(result);
    } catch (err) {
        console.error('Error al obtener imágenes:', err);
        res.status(500).json({ error: 'Error al acceder a la base de datos' });
    }
});

// GET: obtener la última imagen subida por torneoId y disciplinaId
router.get('/ultima/:torneoId/:disciplinaId', async (req, res) => {
    const torneoId = parseInt(req.params.torneoId, 10);
    const disciplinaId = parseInt(req.params.disciplinaId, 10);

    if (isNaN(torneoId) || isNaN(disciplinaId)) {
        return res.status(400).json({ error: 'Parámetros inválidos: torneoId y disciplinaId deben ser números' });
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'torneoMultideporte',
            port: process.env.DB_PORT,
        });

        // Verificar que la disciplina existe
        const [disciplinaRows] = await connection.execute(
            'SELECT nombre FROM disciplinas WHERE id = ?',
            [disciplinaId]
        );

        if (disciplinaRows.length === 0) {
            await connection.end();
            return res.status(404).json({ error: 'Disciplina no encontrada' });
        }

        // Obtener la última imagen ordenando por fecha_subida descendente, limit 1
        const [result] = await connection.execute(
                `SELECT id, filename, ruta, fecha_subida FROM cuadros_eliminatorios
                WHERE torneo_id = ? AND disciplina_id = ?
                ORDER BY fecha_subida DESC
                LIMIT 1`,
            [torneoId, disciplinaId]
        );

        await connection.end();

        if (result.length === 0) {
            return res.status(404).json({ error: 'No se encontró ninguna imagen para esta disciplina y torneo' });
        }

        res.json(result[0]);
    } catch (err) {
        console.error('Error al obtener última imagen:', err);
        res.status(500).json({ error: 'Error al acceder a la base de datos' });
    }
});

module.exports = router;