// IMPORTACIÓN DE MÓDULOS NECESARIOS
/*
Express para rutas, Multer para gestión de archivos, PATH y FS para manipulación de directorios,
MySQL para BBDD, y dotenv para variables de entorno
*/
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const mysql = require('mysql2/promise');
require('dotenv').config();

const router = express.Router();

// CONFIGURACIÓN DE ALMACENAMIENTO PARA SUBIR IMÁGENES EN CUADRO ELIMINATORIO
/*
Se verifica el parámetro ID y se consulta el nombre en la BBDD, se crea la carpeta correspondiente si no existe,
y se genera un nombre de archivo único para evitar colisiones
*/
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

// RUTA POST PARA SUBIR UNA IMAGEN DEL CUADRO ELIMINATORIO
/*
Recibe los parámetros y valida la existencia de datos, guarda el archivo y registra la información en la BBDD
*/
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

// RUTA GET PARA OBTENER TODAS LAS IMÁGENES POR TORNEO Y DISCIPLINA DE CUADRO ELIMINATORIO
/*
Valida los parámetros numéricos y consulta y devuelve las imágenes relacionadas en la BBDD
*/
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
        const [disciplinaRows] = await connection.execute(
            'SELECT nombre FROM disciplinas WHERE id = ?',
            [disciplinaId]
        );
        if (disciplinaRows.length === 0) {
            await connection.end();
            return res.status(404).json({ error: 'Disciplina no encontrada' });
        }
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

// RUTA GET PARA OBTENER LA ÚLTIMA IMAGEN SUBIDA DE CUADRO ELIMINATORIO
/*
Devuelve solo la imagen más reciente
*/
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
        const [disciplinaRows] = await connection.execute(
            'SELECT nombre FROM disciplinas WHERE id = ?',
            [disciplinaId]
        );
        if (disciplinaRows.length === 0) {
            await connection.end();
            return res.status(404).json({ error: 'Disciplina no encontrada' });
        }
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

// CONFIGURACIÓN DE ALMACENAMIENTO PARA SUBIR IMÁGENES EN GANADORES
/*
Se verifica el parámetro ID y se consulta el nombre en la BBDD, se crea la carpeta correspondiente si no existe,
y se genera un nombre de archivo único para evitar colisiones
*/
const storageGanadores = multer.diskStorage({
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
            const dir = path.join(__dirname, '../uploads/ganadores', nombreDisciplina);
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

const uploadGanadores = multer({ storage: storageGanadores });

// RUTA POST PARA SUBIR UNA IMAGEN DE GANADORES
router.post('/uploadGanador/:disciplinaId', uploadGanadores.single('imagen'), async (req, res) => {
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
        const rutaRelativa = `/ganadores/${disciplinaNombre}/${filename}`;
        await connection.execute(
            `INSERT INTO ganadores_imagenes (filename, ruta, disciplina_id, torneo_id)
            VALUES (?, ?, ?, ?)`,
            [filename, rutaRelativa, disciplinaId, torneoId]
        );
        await connection.end();
        res.status(200).json({
            mensaje: 'Imagen de ganador subida y registrada',
            filename,
            ruta: rutaRelativa,
        });
    } catch (err) {
        console.error('Error al guardar imagen ganador:', err);
        res.status(500).json({ error: 'Error al guardar imagen de ganador' });
    }
});

// RUTA GET PARA OBTENER TODAS LAS IMÁGENES POR TORNEO Y DISCIPLINA DE GANADORES
router.get('/ganadores/:torneoId/:disciplinaId', async (req, res) => {
    const torneoId = parseInt(req.params.torneoId, 10);
    const disciplinaId = parseInt(req.params.disciplinaId, 10);

    if (isNaN(torneoId) || isNaN(disciplinaId)) {
        return res.status(400).json({ error: 'Parámetros inválidos' });
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'torneoMultideporte',
            port: process.env.DB_PORT,
        });
        const [result] = await connection.execute(
            `SELECT id, filename, ruta, fecha_subida
            FROM ganadores_imagenes
            WHERE torneo_id = ? AND disciplina_id = ?`,
            [torneoId, disciplinaId]
        );
        await connection.end();
        res.json(result);
    } catch (err) {
        console.error('Error al obtener imágenes de ganadores:', err);
        res.status(500).json({ error: 'Error accediendo a la base de datos' });
    }
});

// RUTA GET PARA OBTENER LA ÚLTIMA IMAGEN SUBIDA DE GANADORES
router.get('/ganadores/ultima/:torneoId/:disciplinaId', async (req, res) => {
    const torneoId = parseInt(req.params.torneoId, 10);
    const disciplinaId = parseInt(req.params.disciplinaId, 10);

    if (isNaN(torneoId) || isNaN(disciplinaId)) {
        return res.status(400).json({ error: 'Parámetros inválidos' });
    }

    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: 'torneoMultideporte',
            port: process.env.DB_PORT,
        });
        const [result] = await connection.execute(
                `SELECT id, filename, ruta, fecha_subida
                FROM ganadores_imagenes
                WHERE torneo_id = ? AND disciplina_id = ?
                ORDER BY fecha_subida DESC
                LIMIT 1`,
                [torneoId, disciplinaId]
        );
        await connection.end();
        if (result.length === 0) {
            return res.status(404).json({ error: 'No se encontró ninguna imagen del ganador' });
        }
        res.json(result[0]);
    } catch (err) {
        console.error('Error al obtener última imagen de ganador:', err);
        res.status(500).json({ error: 'Error accediendo a la base de datos' });
    }
});

module.exports = router;