const Partidos = require('../MODELS/partidos.model');

const PartidosController = {
    getAll: async (req, res) => {
        try {
            const partidos = await Partidos.getAll();
            res.json(partidos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener partidos', error: error.message });
        }
    },

    getByDisciplinaYAnio: async (req, res) => {
        try {
            const { disciplinaId, anio } = req.params;
            const partidos = await Partidos.getByDisciplinaYAnio(disciplinaId, anio);
            res.json(partidos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener partidos por disciplina y año', error: error.message });
        }
    },

    getById: async (req, res) => {
        try {
            const partido = await Partidos.getById(req.params.id);
            if (!partido) return res.status(404).json({ message: 'Partido no encontrado' });
            res.json(partido);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener partido', error: error.message });
        }
    },

    getGanadorPorDisciplinaYAnio: async (req, res) => {
        try {
            const { disciplinaId, anio } = req.params;
            const ganador = await Partidos.getGanadorPorDisciplinaYAnio(disciplinaId, anio);
            if (!ganador) {
                return res.status(404).json({ message: 'No se encontró ganador para esta disciplina y año' });
            }
            res.json(ganador);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener ganador', error: error.message });
        }
    },


    create: async (req, res) => {
        try {
            const id = await Partidos.create(req.body);
            res.status(201).json({ message: 'Partido creado', id });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear partido', error: error.message });
        }
    },

    update: async (req, res) => {
        try {
            await Partidos.update(req.params.id, req.body);
            res.json({ message: 'Partido actualizado' });
        } catch (error) {
            console.error('Error al actualizar partido:', error);
            if (error.status) {
                return res.status(error.status).json({ message: error.message });
            }
            res.status(500).json({ message: 'Error al actualizar partido', error: error.message });
        }
    },

    delete: async (req, res) => {
        try {
            await Partidos.delete(req.params.id);
            res.json({ message: 'Partido eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar partido', error: error.message });
        }
    },
};

module.exports = PartidosController;