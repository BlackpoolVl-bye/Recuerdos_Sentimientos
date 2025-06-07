const express = require('express');
const app = express();
const path = require('path');

// Configuración básica
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('¡Node.js está funcionando en mi página web!');
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});