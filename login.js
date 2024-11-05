// login.js
function login(event) {
    event.preventDefault();
    const correo = document.getElementById('correo').value;
    const password = document.getElementById('password').value;

    const transaction = db.transaction(["estudiantes", "profesores"], "readonly");
    const estudianteStore = transaction.objectStore("estudiantes");
    const profesorStore = transaction.objectStore("profesores");

    let encontrado = false;

    estudianteStore.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            if (cursor.value.correo === correo && cursor.value.password === password) {
                alert('Bienvenido Estudiante');
                encontrado = true;
                window.location.href = "consulta.html";  // Redirigir a consulta
            }
            cursor.continue();
        }
    };

    profesorStore.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor && !encontrado) {
            if (cursor.value.correo === correo && cursor.value.password === password) {
                alert('Bienvenido Profesor');
                window.location.href = "consulta.html";  // Redirigir a consulta
            }
            cursor.continue();
        }
    };
}
