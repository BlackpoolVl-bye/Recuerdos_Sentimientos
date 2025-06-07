const Pagina = require('../models/paginaModel');

exports.mostrarPagina = async (req, res) => {
  try {
    const pagina = await Pagina.obtenerPorUrl(req.params.url);
    if (!pagina) {
      return res.status(404).render('error', { mensaje: 'Página no encontrada' });
    }
    res.render('pagina', { pagina });
  } catch (error) {
    res.status(500).render('error', { mensaje: error.message });
  }
};

exports.listarPaginas = async (req, res) => {
  try {
    const paginas = await Pagina.listarPublicadas();
    res.render('listar', { paginas });
  } catch (error) {
    res.status(500).render('error', { mensaje: error.message });
  }
};

exports.mostrarFormulario = (req, res) => {
  res.render('formulario');
};

exports.crearPagina = async (req, res) => {
  try {
    const { titulo, contenido, url, estado } = req.body;
    await Pagina.crear(titulo, contenido, url, estado);
    res.redirect(`/pagina/${url}`);
  } catch (error) {
    res.status(500).render('error', { mensaje: error.message });
  }
};