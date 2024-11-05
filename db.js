// db.js
let db;

window.onload = function() {
    const request = indexedDB.open("miBaseDeDatos", 1);

    request.onerror = function(event) {
        console.log("Error al abrir la base de datos:", event.target.errorCode);
    };

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("Base de datos abierta:", db);
    };

    request.onupgradeneeded = function(event) {
        db = event.target.result;

        if (!db.objectStoreNames.contains('estudiantes')) {
            const estudianteStore = db.createObjectStore('estudiantes', { keyPath: 'correo' });
        }

        if (!db.objectStoreNames.contains('profesores')) {
            const profesorStore = db.createObjectStore('profesores', { keyPath: 'correo' });
        }

        console.log("Base de datos actualizada");
    };
}
