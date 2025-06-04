
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.8.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyD9npKvnNzcQ61vgRa2uA3QzP5TxURNwKI",
    authDomain: "recuerdos-y-sentimientos.firebaseapp.com",
    projectId: "recuerdos-y-sentimientos",
    storageBucket: "recuerdos-y-sentimientos.firebasestorage.app",
    messagingSenderId: "622037759074",
    appId: "1:622037759074:web:efa57469764eb766730d3b",
    measurementId: "G-MQTMDQJRVB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  firebase.initializeApp(firebaseConfig);
        const db = firebase.database();

        // 2. Mostrar mensajes en tiempo real
        function cargarMensajes() {
            db.ref('libroMensajes').orderByChild('fechaNum').limitToLast(50).on('value', snapshot => {
                const mensajesDiv = document.getElementById('mensajes');
                mensajesDiv.innerHTML = '';
                const mensajes = [];
                snapshot.forEach(child => mensajes.push(child.val()));
                mensajes.reverse().forEach(m => {
                    mensajesDiv.innerHTML += `
                        <div class="mensaje">
                            <span class="autor">${m.autor}</span>
                            <span class="fecha">${m.fecha}</span>
                            <br>${m.texto}
                        </div>
                    `;
                });
            });
        }

        // 3. Agregar mensaje
        function agregarMensaje(e) {
            e.preventDefault();
            const autor = document.getElementById('autor').value.trim();
            const texto = document.getElementById('mensaje').value.trim();
            if (!autor || !texto) return;
            const fechaObj = new Date();
            const fecha = fechaObj.toLocaleString();
            const fechaNum = fechaObj.getTime();
            db.ref('libroMensajes').push({ autor, texto, fecha, fechaNum });
            document.getElementById('autor').value = '';
            document.getElementById('mensaje').value = '';
        }

        cargarMensajes();
