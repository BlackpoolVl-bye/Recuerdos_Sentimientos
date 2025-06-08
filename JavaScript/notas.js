// Guardar y mostrar notas usando localStorage

function cargarNotas() {
    const notas = JSON.parse(localStorage.getItem('notasBonitas') || '[]');
    const listaDiv = document.getElementById('notas-lista');
    listaDiv.innerHTML = '';
    notas.forEach(n => {
        listaDiv.innerHTML += `
            <div class="nota">
                <span class="autor">${n.autor}</span>
                <span class="fecha">${n.fecha}</span>
                <br>${n.texto}
            </div>
        `;
    });
}

function agregarNota(e) {
    e.preventDefault();
    const autor = document.getElementById('autor').value.trim();
    const texto = document.getElementById('nota').value.trim();
    if (!autor || !texto) return;
    const fecha = new Date().toLocaleString();
    const nueva = { autor, texto, fecha };
    const notas = JSON.parse(localStorage.getItem('notasBonitas') || '[]');
    notas.unshift(nueva);
    localStorage.setItem('notasBonitas', JSON.stringify(notas));
    document.getElementById('autor').value = '';
    document.getElementById('nota').value = '';
    cargarNotas();
}

cargarNotas();