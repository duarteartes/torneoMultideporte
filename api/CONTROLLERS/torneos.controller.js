//IMPORTAMOS EL MODELO
const Torneos = require('../models/torneos.model');

//CONTROLADOR DE TORNEOS
const TorneosController = {
    /* Obtiene todos los torneos */
    getAll: async (req, res) => {
        try {
            const torneos = await Torneos.getAll();
            res.json(torneos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener torneos', error: error.message });
        }
    },
    /* Obtiene todos los años en los que existen torneos registrados */
    getAnios: async (req, res) => {
        try {
            const anios = await Torneos.getAnios();
            res.json(anios);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener años de torneos', error: error.message });
        }
    },
    /* Busca un torneo específico por su ID  */
    getById: async (req, res) => {
        try {
            const torneo = await Torneos.getById(req.params.id);
            if (!torneo) return res.status(404).json({ message: 'Torneo no encontrado' });
            res.json(torneo);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener torneo', error: error.message });
        }
    },
    /* Crea un nuevo torneo */
    create: async (req, res) => {
        try {
            const id = await Torneos.create(req.body);
            res.status(201).json({ message: 'Torneo creado', id });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear torneo', error: error.message });
        }
    },
    /* Actualiza un torneo existente identificado por su ID */
    update: async (req, res) => {
        try {
            await Torneos.update(req.params.id, req.body);
            res.json({ message: 'Torneo actualizado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar torneo', error: error.message });
        }
    },
    /* Elimina un torneo existente por su ID */
    delete: async (req, res) => {
        try {
            await Torneos.delete(req.params.id);
            res.json({ message: 'Torneo eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar torneo', error: error.message });
        }
    },
};

module.exports = TorneosController;