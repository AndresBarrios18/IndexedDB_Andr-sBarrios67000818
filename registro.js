// registro.js
function registrar(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;
    const rol = document.querySelector('input[name="rol"]:checked').value;

    let data = { nombre, apellido, correo, password };

    const transaction = db.transaction([rol], "readwrite");
    const store = transaction.objectStore(rol);

    if (rol === "estudiantes") {
        const codigo = document.getElementById('codigo').value;
        const programa = document.getElementById('programa').value;
        data.codigo = codigo;
        data.programa = programa;
    } else if (rol === "profesores") {
        const profesion = document.getElementById('profesion').value;
        const experiencia = document.getElementById('experiencia').value;
        data.profesion = profesion;
        data.experiencia = experiencia;
    }

    const addRequest = store.add(data);

    addRequest.onsuccess = function() {
        alert('Registro exitoso');
        window.location.href = 'login.html';  // Redirigir a login
    };

    addRequest.onerror = function(event) {
        console.error('Error al registrar:', event.target.errorCode);
    };
}
