const planetas = document.querySelectorAll('.orbita');

planetas.forEach(planeta => {
  const velocidad = Math.random() * 0.3 + 0.1;
  let angulo = 0;

  function animar() {
    angulo += velocidad;
    planeta.style.transform = `rotate(${angulo}deg)`;
    requestAnimationFrame(animar);
  }

  animar();
});