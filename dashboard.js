
/* =========================================================
   DASHBOARD DE TORNEOS GAMER
   Actividades 1, 2, 3, 4, 5 y 6
   ========================================================= */

// Arreglo global donde se guardan los torneos.
let torneos = [];

// -1 significa que no estamos editando ningún torneo.
let indiceEdicion = -1;


/* =========================================================
   FUNCIONES AUXILIARES
   ========================================================= */

// Obtener un elemento por su ID.
function obtenerElemento(id) {
    return document.getElementById(id);
}

// Mostrar un mensaje en el formulario.
function mostrarMensaje(mensaje, tipo = "error") {
    const elemento = obtenerElemento("mensajeFormulario");

    elemento.textContent = mensaje;
    elemento.className = tipo;
}

// Evitar que los datos escritos por el usuario se interpreten
// como etiquetas HTML al construir la tabla y las tarjetas.
function escaparHTML(valor) {
    return String(valor).replace(/[&<>"']/g, function (caracter) {
        const caracteres = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return caracteres[caracter];
    });
}

// Dar formato monetario a los valores.
function formatoMoneda(valor) {
    return Number(valor).toFixed(2);
}


/* =========================================================
   ACTIVIDAD 1 Y ACTIVIDAD 2
   REGISTRAR O ACTUALIZAR UN TORNEO
   ========================================================= */

function registrarTorneo() {

    // Recuperar los datos del formulario.
    const nombre = obtenerElemento("nombre").value.trim();
    const categoria = obtenerElemento("categoria").value;
    const participantesTexto =
        obtenerElemento("participantes").value.trim();
    const valorTexto =
        obtenerElemento("valorInscripcion").value.trim();
    const email = obtenerElemento("email").value.trim();

    const participantes = Number(participantesTexto);
    const valorInscripcion = Number(valorTexto);

    // VALIDACIÓN DEL NOMBRE.
    if (nombre.length < 4) {
        mostrarMensaje(
            "El nombre debe tener al menos 4 caracteres."
        );
        obtenerElemento("nombre").focus();
        return;
    }

    // VALIDACIÓN DE LA CATEGORÍA.
    if (categoria === "") {
        mostrarMensaje("Debes seleccionar una categoría.");
        obtenerElemento("categoria").focus();
        return;
    }

    // VALIDACIÓN DE LOS PARTICIPANTES.
    if (
        participantesTexto === "" ||
        !Number.isInteger(participantes) ||
        participantes < 1 ||
        participantes > 100
    ) {
        mostrarMensaje(
            "Los participantes deben ser un número entero entre 1 y 100."
        );
        obtenerElemento("participantes").focus();
        return;
    }

    // VALIDACIÓN DEL VALOR DE INSCRIPCIÓN.
    if (
        valorTexto === "" ||
        !Number.isFinite(valorInscripcion) ||
        valorInscripcion <= 0
    ) {
        mostrarMensaje(
            "El valor de inscripción debe ser mayor que cero."
        );
        obtenerElemento("valorInscripcion").focus();
        return;
    }

    // VALIDACIÓN DEL CORREO.
    const campoEmail = obtenerElemento("email");

    if (
        email === "" ||
        !campoEmail.checkValidity() ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        mostrarMensaje(
            "Ingresa un correo válido, por ejemplo jugador@gmail.com."
        );
        campoEmail.focus();
        return;
    }

    // Calcular nuevamente la recaudación.
    const recaudacion = participantes * valorInscripcion;

    // Construir el objeto del torneo.
    const torneo = {
        nombre: nombre,
        categoria: categoria,
        participantes: participantes,
        valorInscripcion: valorInscripcion,
        email: email,
        recaudacion: recaudacion
    };

    // Si el índice es -1, registramos un torneo nuevo.
    if (indiceEdicion === -1) {

        torneos.push(torneo);

        mostrarMensaje(
            "¡Torneo registrado correctamente!",
            "exito"
        );

    } else {

        // Si estamos editando, reemplazamos el objeto existente.
        // No utilizamos push(), porque crearía un registro adicional.
        torneos[indiceEdicion] = torneo;

        mostrarMensaje(
            "¡Torneo actualizado correctamente!",
            "exito"
        );
    }

    // Actualizar todas las vistas.
    mostrarTorneos();
    actualizarEstadisticas();

    // Restablecer el formulario.
    limpiarFormulario();
}


/* =========================================================
   PINTAR LA TABLA
   ACTIVIDAD 1: BOTONES EDITAR Y ELIMINAR
   ========================================================= */

function mostrarTorneos() {

    const cuerpoTabla = obtenerElemento("cuerpoTabla");
    const textoBusqueda =
        obtenerElemento("buscarTorneo").value.trim().toLowerCase();

    let contenidoTabla = "";

    for (let i = 0; i < torneos.length; i++) {

        const torneo = torneos[i];

        // Buscar por nombre o categoría.
        const coincideNombre =
            torneo.nombre.toLowerCase().includes(textoBusqueda);

        const coincideCategoria =
            torneo.categoria.toLowerCase().includes(textoBusqueda);

        if (coincideNombre || coincideCategoria) {

            contenidoTabla += `
                <tr>
                    <td>${escaparHTML(torneo.nombre)}</td>

                    <td>${escaparHTML(torneo.categoria)}</td>

                    <td>${torneo.participantes}</td>

                    <td>$${formatoMoneda(torneo.valorInscripcion)}</td>

                    <td>${escaparHTML(torneo.email)}</td>

                    <td>$${formatoMoneda(torneo.recaudacion)}</td>

                    <td>
                        <button
                            type="button"
                            onclick="editarTorneo(${i})"
                        >
                            EDITAR
                        </button>

                        <button
                            type="button"
                            onclick="eliminarTorneo(${i})"
                        >
                            ELIMINAR
                        </button>
                    </td>
                </tr>
            `;
        }
    }

    if (contenidoTabla === "") {
        contenidoTabla = `
            <tr>
                <td colspan="7">
                    No se encontraron torneos.
                </td>
            </tr>
        `;
    }

    cuerpoTabla.innerHTML = contenidoTabla;

    // Volver a generar las tarjetas.
    generarTarjetas();
}


/* =========================================================
   ACTIVIDAD 2: EDITAR UN TORNEO
   ========================================================= */

function editarTorneo(indice) {

    // Comprobar que el índice corresponde a un torneo existente.
    if (
        !Number.isInteger(indice) ||
        indice < 0 ||
        indice >= torneos.length
    ) {
        mostrarMensaje("El torneo seleccionado no existe.");
        return;
    }

    // Obtener el objeto seleccionado.
    const torneo = torneos[indice];

    // Cargar los datos en el formulario.
    obtenerElemento("nombre").value = torneo.nombre;
    obtenerElemento("categoria").value = torneo.categoria;

    obtenerElemento("participantes").value =
        torneo.participantes;

    obtenerElemento("valorInscripcion").value =
        torneo.valorInscripcion;

    obtenerElemento("email").value = torneo.email;

    // Guardar el índice del torneo que se está editando.
    indiceEdicion = indice;

    // Cambiar el texto del botón principal.
    obtenerElemento("btnRegistrarTorneo").textContent =
        "ACTUALIZAR TORNEO";

    // Mostrar el botón para cancelar la edición.
    obtenerElemento("btnCancelarEdicion").hidden = false;

    mostrarMensaje(
        "Editando torneo. Modifica los datos y pulsa ACTUALIZAR TORNEO.",
        "info"
    );

    // Llevar al usuario al formulario.
    obtenerElemento("registro").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    obtenerElemento("nombre").focus();
}


/* =========================================================
   ACTIVIDAD 3: ELIMINAR UN TORNEO
   ========================================================= */

function eliminarTorneo(indice) {

    // Comprobar que el índice es válido.
    if (
        !Number.isInteger(indice) ||
        indice < 0 ||
        indice >= torneos.length
    ) {
        mostrarMensaje("El torneo seleccionado no existe.");
        return;
    }

    const torneo = torneos[indice];

    // Solicitar confirmación antes de borrar.
    const confirmar = confirm(
        `¿Seguro que deseas eliminar el torneo "${torneo.nombre}"?`
    );

    // Si cancela, no se modifica el arreglo.
    if (!confirmar) {
        return;
    }

    // Si se estaba editando este torneo, cancelar la edición.
    if (indiceEdicion === indice) {
        limpiarFormulario();
    } else if (indiceEdicion > indice) {
        // Los índices posteriores disminuyen una posición
        // después de eliminar un elemento anterior.
        indiceEdicion--;
    }

    // Eliminar exactamente un objeto en la posición seleccionada.
    torneos.splice(indice, 1);

    // Actualizar las vistas y estadísticas.
    mostrarTorneos();
    actualizarEstadisticas());

    mostrarMensaje(
        "El torneo se eliminó correctamente.",
        "exito"
    );
}


/* =========================================================
   ACTIVIDAD 4: GENERAR TARJETAS DINÁMICAS
   Esta función no recibe parámetros.
   ========================================================= */

function generarTarjetas() {

    const contenedor = obtenerElemento("contenedorTarjetas");

    const textoBusqueda =
        obtenerElemento("buscarTorneo").value.trim().toLowerCase();

    let contenidoTarjetas = "";

    // Recorrer el arreglo original.
    for (let i = 0; i < torneos.length; i++) {

        const torneo = torneos[i];

        const coincideNombre =
            torneo.nombre.toLowerCase().includes(textoBusqueda);

        const coincideCategoria =
            torneo.categoria.toLowerCase().includes(textoBusqueda);

        // Aplicar el filtro de búsqueda también a las tarjetas.
        if (coincideNombre || coincideCategoria) {

            contenidoTarjetas += `
                <article class="tarjeta">

                    <h3>${escaparHTML(torneo.nombre)}</h3>

                    <p>
                        <strong>Categoría:</strong>
                        ${escaparHTML(torneo.categoria)}
                    </p>

                    <p>
                        <strong>Participantes:</strong>
                        ${torneo.participantes}
                    </p>

                    <p>
                        <strong>Inscripción:</strong>
                        $${formatoMoneda(torneo.valorInscripcion)}
                    </p>

                    <p>
                        <strong>Recaudación:</strong>
                        $${formatoMoneda(torneo.recaudacion)}
                    </p>

                    <div class="acciones-tarjeta">

                        <button
                            type="button"
                            onclick="editarTorneo(${i})"
                        >
                            EDITAR
                        </button>

                        <button
                            type="button"
                            onclick="eliminarTorneo(${i})"
                        >
                            ELIMINAR
                        </button>

                    </div>

                </article>
            `;
        }
    }

    if (contenidoTarjetas === "") {
        contenidoTarjetas = `
            <p class="sin-resultados">
                No hay torneos que mostrar.
            </p>
        `;
    }

    // Insertar todas las tarjetas en el contenedor.
    contenedor.innerHTML = contenidoTarjetas;
}


/* =========================================================
   ACTIVIDAD 5: BUSCAR TORNEOS
   ========================================================= */

function buscarTorneos() {

    // La tabla y las tarjetas vuelven a dibujarse
    // con el contenido actual de la caja de búsqueda.
    mostrarTorneos();
}


/* =========================================================
   ACTIVIDAD 6: ACTUALIZAR ESTADÍSTICAS
   ========================================================= */

function actualizarEstadisticas() {

    let totalParticipantes = 0;
    let recaudacionTotal = 0;

    // Recorrer todos los torneos, no solo los filtrados.
    for (let i = 0; i < torneos.length; i++) {

        totalParticipantes += torneos[i].participantes;

        recaudacionTotal += torneos[i].recaudacion;
    }

    // Actualizar los indicadores.
    obtenerElemento("totalTorneos").textContent =
        torneos.length;

    obtenerElemento("totalParticipantes").textContent =
        totalParticipantes;

    obtenerElemento("recaudacionTotal").textContent =
        formatoMoneda(recaudacionTotal);
}


/* =========================================================
   LIMPIAR Y RESTABLECER EL FORMULARIO
   ========================================================= */

function limpiarFormulario() {

    obtenerElemento("nombre").value = "";
    obtenerElemento("categoria").value = "";
    obtenerElemento("participantes").value = "";
    obtenerElemento("valorInscripcion").value = "";
    obtenerElemento("email").value = "";

    // Finalizar el modo de edición.
    indiceEdicion = -1;

    // Recuperar el texto original del botón.
    obtenerElemento("btnRegistrarTorneo").textContent =
        "REGISTRAR TORNEO";

    // Ocultar el botón de cancelar edición.
    obtenerElemento("btnCancelarEdicion").hidden = true;
}


/* =========================================================
   INICIALIZAR LOS EVENTOS
   ========================================================= */

// Controlar el envío del formulario sin recargar la página.
obtenerElemento("formularioTorneo").addEventListener(
    "submit",
    function (evento) {

        evento.preventDefault();

        registrarTorneo();
    }
);

// Buscar mientras el usuario escribe.
obtenerElemento("buscarTorneo").addEventListener(
    "input",
    buscarTorneos
);

// Cancelar una edición sin modificar el torneo guardado.
obtenerElemento("btnCancelarEdicion").addEventListener(
    "click",
    function () {

        limpiarFormulario();

        mostrarMensaje(
            "Edición cancelada. El torneo no fue modificado.",
            "info"
        );
    }
);

// Mostrar el estado inicial.
mostrarTorneos();
actualizarEstadisticas();
