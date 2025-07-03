const Torneos = require('../models/torneos.model');

const TorneosController = {
    getAll: async (req, res) => {
        try {
            const torneos = await Torneos.getAll();
            res.json(torneos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener torneos', error: error.message });
        }
    },

    getAnios: async (req, res) => {
        try {
            const anios = await Torneos.getAnios();
            res.json(anios);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener años de torneos', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const torneo = await Torneos.getById(req.params.id);
            if (!torneo) return res.status(404).json({ message: 'Torneo no encontrado' });
            res.json(torneo);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener torneo', error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const id = await Torneos.create(req.body);
            res.status(201).json({ message: 'Torneo creado', id });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear torneo', error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            await Torneos.update(req.params.id, req.body);
            res.json({ message: 'Torneo actualizado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar torneo', error: error.message });
        }
    },

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