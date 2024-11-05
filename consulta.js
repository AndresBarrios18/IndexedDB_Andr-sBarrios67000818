// consulta.js
window.onload = function() {
    const transaction = db.transaction(["estudiantes", "profesores"], "readonly");
    const estudianteStore = transaction.objectStore("estudiantes");
    const profesorStore = transaction.objectStore("profesores");
    const tbody = document.querySelector('tbody');

    estudianteStore.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            const { nombre, apellido, correo } = cursor.value;
            agregarFila(nombre, apellido, correo, 'estudiantes');
            cursor.continue();
        }
    };

    profesorStore.openCursor().onsuccess = function(event) {
        const cursor = event.target.result;
        if (cursor) {
            const { nombre, apellido, correo } = cursor.value;
            agregarFila(nombre, apellido, correo, 'profesores');
            cursor.continue();
        }
    };
}

function agregarFila(nombre, apellido, correo, rol) {
    const tbody = document.querySelector('tbody');
    const fila = document.createElement('tr');
    fila.innerHTML = `
        <td>${nombre}</td>
        <td>${apellido}</td>
        <td>${correo}</td>
        <td><button onclick="editarUsuario('${correo}', '${rol}')">Editar</button> | 
            <button onclick="eliminarUsuario('${correo}', '${rol}')">Eliminar</button></td>
    `;
    tbody.appendChild(fila);
}

function eliminarUsuario(correo, rol) {
    const transaction = db.transaction([rol], "readwrite");
    const store = transaction.objectStore(rol);

    const request = store.delete(correo);
    request.onsuccess = function() {
        alert('Usuario eliminado');
        window.location.reload();
    };
}

function editarUsuario(correo, rol) {
    // Redirigir a la página de edición con parámetros
    window.location.href = `edit.html?correo=${correo}&rol=${rol}`;
}
