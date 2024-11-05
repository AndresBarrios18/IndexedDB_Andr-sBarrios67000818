// edit.js
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    const correo = params.get('correo');
    const rol = params.get('rol');
    
    document.getElementById('rol').value = rol;
    const transaction = db.transaction([rol], "readonly");
    const store = transaction.objectStore(rol);

    const request = store.get(correo);
    request.onsuccess = function(event) {
        const usuario = event.target.result;
        document.getElementById('nombre').value = usuario.nombre;
        document.getElementById('apellido').value = usuario.apellido;
        document.getElementById('correo').value = usuario.correo;
    };
}

function actualizarUsuario(event) {
    event.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const correo = document.getElementById('correo').value;
    const rol = document.getElementById('rol').value;

    const transaction = db.transaction([rol], "readwrite");
    const store = transaction.objectStore(rol);

    const request = store.get(correo);
    request.onsuccess = function(event) {
        const usuario = event.target.result;
        usuario.nombre = nombre;
        usuario.apellido = apellido;

        const updateRequest = store.put(usuario);
        updateRequest.onsuccess = function() {
            alert('Usuario actualizado');
            window.location.href = 'consulta.html';
        };
    };
}
