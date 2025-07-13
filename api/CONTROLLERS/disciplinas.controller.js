//IMPORTAMOS EL MODELO
const Disciplinas = require('../MODELS/disciplinas.model');

//CONTROLADOR DE DISCIPLINAS
const DisciplinasController = {
    /* Obtiene todas las disciplinas */
    getAll: async (req, res) => {
        try {
            const disciplinas = await Disciplinas.getAll();
            res.json(disciplinas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener disciplinas', error: error.message });
        }
    },
    /* Obtiene una disciplina específica por su ID */
    getById: async (req, res) => {
        try {
            const disciplina = await Disciplinas.getById(req.params.id);
            if (!disciplina) return res.status(404).json({ message: 'Disciplina no encontrada' });
            res.json(disciplina);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener disciplina', error: error.message });
        }
    },
    /* Obtiene disciplinas filtradas por año */
    getByAnio: async (req, res) => {
        try {
            const { anio } = req.params;
            const disciplinas = await Disciplinas.getByAnio(anio);
            res.json(disciplinas);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener disciplinas por año', error: error.message });
        }
    },
    /* Obtiene todos los equipos relacionados con una disciplina específica */
    getEquiposPorDisciplina: async (req, res) => {
        try {
            const equipos = await Disciplinas.getEquiposPorDisciplina(req.params.id);
            res.json(equipos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener equipos', error: error.message });
        }
    },
    /* Obtiene todos los partidos relacionados con una disciplina específica */
    getPartidosPorDisciplina: async (req, res) => {
        try {
            const partidos = await Disciplinas.getPartidosPorDisciplina(req.params.id);
            res.json(partidos);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener partidos', error: error.message });
        }
    },
    /* Crea una nueva disciplina */
    create: async (req, res) => {
        try {
            const id = await Disciplinas.create(req.body);
            res.status(201).json({ message: 'Disciplina creada', id });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear disciplina', error: error.message });
        }
    },
    /* Actualiza una disciplina existente identificada por ID */
    update: async (req, res) => {
        try {
            await Disciplinas.update(req.params.id, req.body);
            res.json({ message: 'Disciplina actualizada' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar disciplina', error: error.message });
        }
    },
    /* Elimina una disciplina específica por su ID */
    delete: async (req, res) => {
        try {
            await Disciplinas.delete(req.params.id);
            res.json({ message: 'Disciplina eliminada' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar disciplina', error: error.message });
        }
    },
};

module.exports = DisciplinasController;