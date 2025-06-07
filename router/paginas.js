const express = require('express');
const router = express.Router();
const paginaController = require('../controllers/paginaController');

// Mostrar formulario de creación
router.get('/nueva', paginaController.mostrarFormulario);

// Procesar formulario
router.post('/nueva', paginaController.crearPagina);

// Mostrar una página específica
router.get('/:url', paginaController.mostrarPagina);

// Listar todas las páginas
router.get('/', paginaController.listarPaginas);

module.exports = router;