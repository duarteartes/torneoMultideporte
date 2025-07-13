//IMPORTAMOS EL MODELO
const Administradores = require('../models/administradores.model');

//CONTROLADOR DE ADMINISTRADORES
const AdministradoresController = {
    /* Obtener todos los administradores */
    getAll: async (req, res) => {
        try {
            const admins = await Administradores.getAll();
            res.json(admins);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener administradores', error: error.message });
        }
    },
    /* Obtener un administrador por ID */
    getById: async (req, res) => {
        try {
            const admin = await Administradores.getById(req.params.id);
            if (!admin) return res.status(404).json({ message: 'Administrador no encontrado' });
            res.json(admin);
        } catch (error) {
            res.status(500).json({ message: 'Error al obtener administrador', error: error.message });
        }
    },
    /* Crear un nuevo administrador */
    create: async (req, res) => {
        try {
            const id = await Administradores.create(req.body);
            res.status(201).json({ message: 'Administrador creado', id });
        } catch (error) {
            res.status(500).json({ message: 'Error al crear administrador', error: error.message });
        }
    },
    /* Actualizar un administrador por ID */
    update: async (req, res) => {
        try {
            await Administradores.update(req.params.id, req.body);
            res.json({ message: 'Administrador actualizado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al actualizar administrador', error: error.message });
        }
    },
    /* Eliminar un administrador por ID */
    delete: async (req, res) => {
        try {
            await Administradores.delete(req.params.id);
            res.json({ message: 'Administrador eliminado' });
        } catch (error) {
            res.status(500).json({ message: 'Error al eliminar administrador', error: error.message });
        }
    },
};

module.exports = AdministradoresController;