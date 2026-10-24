let torneo [];






// Actividad 3. Declarar el arreglo (10 puntos)
// Declarar un arreglo global vacío llamado torneos.
// Cada elemento deberá ser un objeto con las propiedades:
// nombre, categoria, participantes, valorInscripcion, email y recaudacion.
let torneos = [];

/**
 * Actividad 4. Registrar y validar un torneo (30 puntos)
 * 12. Crear la función registrarTorneo() sin parámetros.
 */
function registrarTorneo() {
    // 13. Obtener los valores de todos los campos con document.getElementById()

    // 14. Validar que el nombre tenga al menos 4 caracteres

    // 15. Validar que se haya seleccionado una categoría

    // 16. Validar que los participantes sean un entero entre 1 y 100

    // 17. Validar que el valor de inscripción sea mayor que 0

    // 18. Validar que el email no esté vacío. No se requiere validación avanzada de formato.

    // Si alguna validación falla, mostrar mensajes de error y detener la ejecución

    // 19. Calcular la recaudación estimada con: participantes × valor de inscripción

    // 20. Crear el objeto nuevoTorneo con los datos obtenidos

    // 21. Agregar el objeto al arreglo con push()

    // 22. Llamar a mostrarTorneos() y limpiarFormulario()

    // 23. Mostrar un mensaje de registro exitoso
}

/**
 * Actividad 5. Mostrar los torneos (15 puntos)
 * 24. Crear la función mostrarTorneos() sin parámetros.
 */
function mostrarTorneos() {
    // 25. Crear una variable vacía para concatenar el HTML

    // 26. Recorrer el arreglo torneos utilizando obligatoriamente un ciclo for

    // 27. En cada vuelta, obtener el objeto actual y construir una fila de la tabla (<tr>...</tr>)

    // 28. Mostrar todos los datos y la recaudación calculada

    // 29. Insertar el HTML final en el cuerpo de la tabla sin duplicar filas (usando innerHTML)
}

/**
 * Actividad 6. Limpiar el formulario (5 puntos)
 * 30. Crear la función limpiarFormulario().
 */
function limpiarFormulario() {
    // 31. Vaciar los campos del formulario, restablecer la categoría y limpiar los mensajes de error
}
