const pool = require('../config/database');

class Pagina {
  static async crear(titulo, contenido, url, estado = 'borrador') {
    const [result] = await pool.execute(
      'INSERT INTO paginas (titulo, contenido, url, estado) VALUES (?, ?, ?, ?)',
      [titulo, contenido, url, estado]
    );
    return result.insertId;
  }

  static async obtenerPorUrl(url) {
    const [rows] = await pool.execute(
      'SELECT * FROM paginas WHERE url = ? AND estado = "publicado"',
      [url]
    );
    return rows[0];
  }

  static async listarPublicadas() {
    const [rows] = await pool.execute(
      'SELECT id, titulo, url FROM paginas WHERE estado = "publicado" ORDER BY fecha_creacion DESC'
    );
    return rows;
  }

  static async actualizar(id, titulo, contenido, estado) {
    await pool.execute(
      'UPDATE paginas SET titulo = ?, contenido = ?, estado = ? WHERE id = ?',
      [titulo, contenido, estado, id]
    );
  }

  static async eliminar(id) {
    await pool.execute(
      'UPDATE paginas SET estado = "eliminado" WHERE id = ?',
      [id]
    );
  }
}

module.exports = Pagina;