const Equipos = require('../models/equipos.model');

const EquiposController = {
    getAll: async (req, res) => {
        try {
            const equipos = await Equipos.getAll();
            res.json(equipos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener equipos', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const equipo = await Equipos.getById(req.params.id);
            if (!equipo) return res.status(404).json({ message: 'Equipo no encontrado' });
            res.json(equipo);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener equipo', error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const id = await Equipos.create(req.body);
            res.status(201).json({ message: 'Equipo creado', id });
        } catch (error) {
            if (error.code === 'DUPLICATE_TEAM') {
                return res.status(400).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error al crear equipo', error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            await Equipos.update(req.params.id, req.body);
            res.json({ message: 'Equipo actualizado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar equipo', error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await Equipos.delete(req.params.id);
            res.json({ message: 'Equipo eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar equipo', error: error.message });
        }
    },
};

module.exports = EquiposController;