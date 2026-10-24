
/* =========================================================
   ELITE ARENA
   Dashboard de gestión de torneos
   HTML + CSS + JavaScript puro
   ========================================================= */

"use strict";

const CLAVE_ALMACENAMIENTO = "eliteArenaTorneos";

let torneos = cargarTorneos();
let indiceEdicion = -1;
let indiceEliminacion = -1;

// Elementos del formulario
const formulario = document.getElementById("formularioTorneo");
const campoNombre = document.getElementById("nombre");
const campoCategoria = document.getElementById("categoria");
const campoParticipantes = document.getElementById("participantes");
const campoValor = document.getElementById("valorInscripcion");
const campoEmail = document.getElementById("email");

// Elementos de visualización
const cuerpoTabla = document.getElementById("cuerpoTabla");
const buscarTorneo = document.getElementById("buscarTorneo");
const estadoVacio = document.getElementById("estadoVacio");
const dialogoEliminar = document.getElementById("dialogoEliminar");

// ---------------------------------------------------------
// 1. INICIALIZACIÓN
// ---------------------------------------------------------

document.addEventListener("DOMContentLoaded", iniciarDashboard);

function iniciarDashboard() {
    actualizarFecha();
    mostrarTorneos();
    actualizarEstadisticas();

    formulario.addEventListener("submit", guardarTorneo);

    buscarTorneo.addEventListener("input", function () {
        mostrarTorneos(buscarTorneo.value);
    });

    document.getElementById("btnCancelar").addEventListener(
        "click",
        cancelarEdicion
    );

    document.getElementById("btnLimpiarBusqueda").addEventListener(
        "click",
        function () {
            buscarTorneo.value = "";
            mostrarTorneos();
            buscarTorneo.focus();
        }
    );

    // Delegación de eventos: identifica el índice de cada torneo.
    cuerpoTabla.addEventListener("click", function (evento) {
        const boton = evento.target.closest("button[data-accion]");

        if (!boton) {
            return;
        }

        const indice = Number(boton.dataset.indice);

        if (!Number.isInteger(indice) ||
            indice < 0 ||
            indice >= torneos.length) {
            notificar("Registro no válido", "No se encontró ese torneo.", "error");
            return;
        }

        if (boton.dataset.accion === "editar") {
            editarTorneo(indice);
        }

        if (boton.dataset.accion === "eliminar") {
            solicitarEliminacion(indice);
        }
    });

    document.getElementById("btnNoEliminar").addEventListener(
        "click",
        function () {
            dialogoEliminar.close();
            indiceEliminacion = -1;
        }
    );

    document.getElementById("btnConfirmarEliminar").addEventListener(
        "click",
        confirmarEliminacion
    );

    // Cierra el diálogo al pulsar fuera de su contenido.
    dialogoEliminar.addEventListener("click", function (evento) {
        if (evento.target === dialogoEliminar) {
            dialogoEliminar.close();
            indiceEliminacion = -1;
        }
    });

    // Quita el mensaje de error de cada campo al modificarlo.
    [campoNombre, campoCategoria, campoParticipantes,
        campoValor, campoEmail].forEach(function (campo) {
        campo.addEventListener("input", function () {
            limpiarError(campo.id);
        });

        campo.addEventListener("change", function () {
            limpiarError(campo.id);
        });
    });
}

// ---------------------------------------------------------
// 2. FECHA ACTUAL
// ---------------------------------------------------------

function actualizarFecha() {
    const ahora = new Date();

    document.getElementById("fechaActual").textContent =
        new Intl.DateTimeFormat("es-EC", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }).format(ahora);
}

// ---------------------------------------------------------
// 3. ALMACENAMIENTO LOCAL
// ---------------------------------------------------------

function cargarTorneos() {
    try {
        const datos = localStorage.getItem(CLAVE_ALMACENAMIENTO);

        if (!datos) {
            return [];
        }

        const registros = JSON.parse(datos);

        if (!Array.isArray(registros)) {
            return [];
        }

        // Verifica que cada registro tenga la estructura esperada.
        return registros.filter(function (torneo) {
            return torneo &&
                typeof torneo.nombre === "string" &&
                typeof torneo.categoria === "string" &&
                Number.isInteger(torneo.participantes) &&
                Number.isFinite(torneo.valorInscripcion) &&
                typeof torneo.email === "string";
        }).map(function (torneo) {
            return {
                nombre: torneo.nombre,
                categoria: torneo.categoria,
                participantes: torneo.participantes,
                valorInscripcion: torneo.valorInscripcion,
                email: torneo.email,
                recaudacion:
                    torneo.participantes * torneo.valorInscripcion
            };
        });
    } catch (error) {
        console.error("No se pudieron cargar los torneos:", error);
        return [];
    }
}

function guardarEnAlmacenamiento() {
    try {
        localStorage.setItem(
            CLAVE_ALMACENAMIENTO,
            JSON.stringify(torneos)
        );

        return true;
    } catch (error) {
        console.error("Error al guardar los torneos:", error);

        notificar(
            "Error de almacenamiento",
            "El navegador no permitió guardar los cambios. Revisa el espacio disponible.",
            "error"
        );

        return false;
    }
}

// ---------------------------------------------------------
// 4. VALIDACIONES
// ---------------------------------------------------------

function validarFormulario() {
    limpiarTodosLosErrores();

    let valido = true;
    const nombre = campoNombre.value.trim();
    const categoria = campoCategoria.value;
    const participantesTexto = campoParticipantes.value.trim();
    const valorTexto = campoValor.value.trim();
    const email = campoEmail.value.trim();

    const participantes = Number(participantesTexto);
    const valorInscripcion = Number(valorTexto);

    if (nombre.length < 4) {
        mostrarError(
            "nombre",
            "El nombre debe tener al menos 4 caracteres."
        );
        valido = false;
    } else if (nombre.length > 80) {
        mostrarError(
            "nombre",
            "El nombre no puede superar los 80 caracteres."
        );
        valido = false;
    }

    const categoriasPermitidas = [
        "Lucha",
        "Estrategia",
        "Arcade",
        "Deportes",
        "Aventura"
    ];

    if (!categoriasPermitidas.includes(categoria)) {
        mostrarError("categoria", "Selecciona una categoría válida.");
        valido = false;
    }

    if (
        participantesTexto === "" ||
        !Number.isInteger(participantes) ||
        participantes < 1 ||
        participantes > 100
    ) {
        mostrarError(
            "participantes",
            "Ingresa un número entero entre 1 y 100."
        );
        valido = false;
    }

    if (
        valorTexto === "" ||
        !Number.isFinite(valorInscripcion) ||
        valorInscripcion <= 0 ||
        valorInscripcion > 1000000
    ) {
        mostrarError(
            "valorInscripcion",
            "El importe debe ser mayor que 0 y no superar $1.000.000."
        );
        valido = false;
    }

    // Formato básico de correo: texto@dominio.extensión
    const patronEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    if (email.length > 120 || !patronEmail.test(email)) {
        mostrarError(
            "email",
            "Introduce un correo válido, por ejemplo usuario@dominio.com."
        );
        valido = false;
    }

    return {
        valido: valido,
        datos: {
            nombre: nombre,
            categoria: categoria,
            participantes: participantes,
            valorInscripcion: valorInscripcion,
            email: email,
            recaudacion: participantes * valorInscripcion
        }
    };
}

function mostrarError(idCampo, mensaje) {
    const campo = document.getElementById(idCampo);
    const contenedor = campo.closest(".field");
    const error = document.getElementById("error" + (
        idCampo === "valorInscripcion" ? "Valor" :
        idCampo.charAt(0).toUpperCase() + idCampo.slice(1)
    ));

    if (contenedor) {
        contenedor.classList.add("has-error");
    }

    if (error) {
        error.textContent = mensaje;
    }
}

function limpiarError(idCampo) {
    const campo = document.getElementById(idCampo);
    const contenedor = campo.closest(".field");
    const idError = "error" + (
        idCampo === "valorInscripcion" ? "Valor" :
        idCampo.charAt(0).toUpperCase() + idCampo.slice(1)
    );

    const error = document.getElementById(idError);

    if (contenedor) {
        contenedor.classList.remove("has-error");
    }

    if (error) {
        error.textContent = "";
    }
}

function limpiarTodosLosErrores() {
    [
        "nombre",
        "categoria",
        "participantes",
        "valorInscripcion",
        "email"
    ].forEach(limpiarError);
}

// ---------------------------------------------------------
// 5. REGISTRAR Y ACTUALIZAR
// ---------------------------------------------------------

function guardarTorneo(evento) {
    evento.preventDefault();

    const resultado = validarFormulario();

    if (!resultado.valido) {
        const primerError = document.querySelector(".field.has-error input, .field.has-error select");

        if (primerError) {
            primerError.focus();
        }

        notificar(
            "Revisa los datos",
            "Hay campos incorrectos. Corrígelos antes de continuar.",
            "error"
        );

        return;
    }

    const torneoAnterior = indiceEdicion >= 0
        ? { ...torneos[indiceEdicion] }
        : null;

    if (indiceEdicion >= 0) {
        torneos[indiceEdicion] = resultado.datos;
    } else {
        torneos.push(resultado.datos);
    }

    // No confirma la operación si no se pudo guardar.
    if (!guardarEnAlmacenamiento()) {
        if (torneoAnterior) {
            torneos[indiceEdicion] = torneoAnterior;
        } else {
            torneos.pop();
        }

        return;
    }

    const estabaEditando = indiceEdicion >= 0;

    cancelarEdicion();
    formulario.reset();

    mostrarTorneos(buscarTorneo.value);
    actualizarEstadisticas();

    notificar(
        estabaEditando ? "Torneo actualizado" : "Registro exitoso",
        estabaEditando
            ? "Los cambios se guardaron correctamente."
            : "El nuevo torneo se ha registrado correctamente.",
        "success"
    );
}

// ---------------------------------------------------------
// 6. MOSTRAR TABLA Y BÚSQUEDA
// ---------------------------------------------------------

function escaparHTML(valor) {
    return String(valor).replace(/[&<>"']/g, function (caracter) {
        const entidades = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        };

        return entidades[caracter];
    });
}

function formatearDinero(valor) {
    return new Intl.NumberFormat("es-EC", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(valor);
}

function mostrarTorneos(filtro = "") {
    const busqueda = filtro.trim().toLocaleLowerCase("es");
    let html = "";
    let cantidadVisible = 0;

    torneos.forEach(function (torneo, indice) {
        const nombre = torneo.nombre.toLocaleLowerCase("es");
        const categoria = torneo.categoria.toLocaleLowerCase("es");

        if (
            busqueda !== "" &&
            !nombre.includes(busqueda) &&
            !categoria.includes(busqueda)
        ) {
            return;
        }

        cantidadVisible++;

        html += `
            <tr>
                <td>
                    <div class="tournament-name">
                        ${escaparHTML(torneo.nombre)}
                    </div>
                </td>
                <td>
                    <span class="category-badge">
                        ${escaparHTML(torneo.categoria)}
                    </span>
                </td>
                <td>${torneo.participantes}</td>
                <td class="money">
                    $${formatearDinero(torneo.valorInscripcion)}
                </td>
                <td class="email-cell">
                    ${escaparHTML(torneo.email)}
                </td>
                <td class="money">
                    $${formatearDinero(torneo.recaudacion)}
                </td>
                <td>
                    <div class="action-group">
                        <button type="button"
                            class="btn btn-action btn-edit"
                            data-accion="editar"
                            data-indice="${indice}"
                            aria-label="Editar ${escaparHTML(torneo.nombre)}">
                            Editar
                        </button>
                        <button type="button"
                            class="btn btn-action btn-delete"
                            data-accion="eliminar"
                            data-indice="${indice}"
                            aria-label="Eliminar ${escaparHTML(torneo.nombre)}">
                            Eliminar
                        </button>
                    </div>
                </td>
            </tr>
        `;
    });

    cuerpoTabla.innerHTML = html;

    estadoVacio.hidden = cantidadVisible > 0;

    if (cantidadVisible === 0 && busqueda !== "") {
        estadoVacio.querySelector("h3").textContent =
            "No se encontraron resultados";

        estadoVacio.querySelector("p").textContent =
            "Prueba con otro nombre o categoría.";
    } else {
        estadoVacio.querySelector("h3").textContent =
            "Aún no hay torneos";

        estadoVacio.querySelector("p").textContent =
            "Registra tu primera competición para comenzar.";
    }

    document.getElementById("contadorRegistros").textContent =
        `${cantidadVisible} ${cantidadVisible === 1 ? "TORNEO" : "TORNEOS"}`;

    document.getElementById("resumenTabla").textContent =
        `Mostrando ${cantidadVisible} de ${torneos.length} registros`;
}

// ---------------------------------------------------------
// 7. EDITAR TORNEO
// ---------------------------------------------------------

function editarTorneo(indice) {
    if (indice < 0 || indice >= torneos.length) {
        notificar("Error", "No se encontró el torneo seleccionado.", "error");
        return;
    }

    const torneo = torneos[indice];

    indiceEdicion = indice;

    campoNombre.value = torneo.nombre;
    campoCategoria.value = torneo.categoria;
    campoParticipantes.value = torneo.participantes;
    campoValor.value = torneo.valorInscripcion;
    campoEmail.value = torneo.email;

    limpiarTodosLosErrores();

    document.getElementById("tituloFormulario").textContent =
        "Editar torneo";

    document.getElementById("textoBoton").textContent =
        "Guardar cambios";

    document.getElementById("btnCancelar").hidden = false;

    formulario.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

    campoNombre.focus();

    notificar(
        "Modo de edición",
        `Editando: ${torneo.nombre}`,
        "success"
    );
}

function cancelarEdicion() {
    indiceEdicion = -1;

    formulario.reset();
    limpiarTodosLosErrores();

    document.getElementById("tituloFormulario").textContent =
        "Registrar torneo";

    document.getElementById("textoBoton").textContent =
        "＋ Registrar torneo";

    document.getElementById("btnCancelar").hidden = true;
}

// ---------------------------------------------------------
// 8. ELIMINAR CON CONFIRMACIÓN
// ---------------------------------------------------------

function solicitarEliminacion(indice) {
    indiceEliminacion = indice;

    document.getElementById("mensajeEliminar").textContent =
        `¿Deseas eliminar "${torneos[indice].nombre}"? Esta acción no se puede deshacer.`;

    dialogoEliminar.showModal();
}

function confirmarEliminacion() {
    if (
        indiceEliminacion < 0 ||
        indiceEliminacion >= torneos.length
    ) {
        dialogoEliminar.close();
        indiceEliminacion = -1;
        return;
    }

    const indice = indiceEliminacion;
    const eliminado = torneos[indice];

    // Evita borrar accidentalmente un torneo que se está editando.
    if (indiceEdicion === indice) {
        cancelarEdicion();
    } else if (indiceEdicion > indice) {
        indiceEdicion--;
    }

    torneos.splice(indice, 1);

    if (!guardarEnAlmacenamiento()) {
        torneos.splice(indice, 0, eliminado);
        actualizarEstadisticas();
        mostrarTorneos(buscarTorneo.value);
        dialogoEliminar.close();
        indiceEliminacion = -1;
        return;
    }

    dialogoEliminar.close();
    indiceEliminacion = -1;

    mostrarTorneos(buscarTorneo.value);
    actualizarEstadisticas();

    notificar(
        "Torneo eliminado",
        `"${eliminado.nombre}" se eliminó correctamente.`,
        "success"
    );
}

// ---------------------------------------------------------
// 9. ESTADÍSTICAS DEL DASHBOARD
// ---------------------------------------------------------

function actualizarEstadisticas() {
    const totalTorneos = torneos.length;

    const totalParticipantes = torneos.reduce(
        (suma, torneo) => suma + torneo.participantes,
        0
    );

    const recaudacionTotal = torneos.reduce(
        (suma, torneo) => suma + torneo.recaudacion,
        0
    );

    // Promedio por participante, no por torneo.
    const promedioInscripcion = totalParticipantes > 0
        ? recaudacionTotal / totalParticipantes
        : 0;

    document.getElementById("totalTorneos").textContent =
        totalTorneos;

    document.getElementById("totalParticipantes").textContent =
        totalParticipantes;

    document.getElementById("recaudacionTotal").textContent =
        formatearDinero(recaudacionTotal);

    document.getElementById("promedioInscripcion").textContent =
        formatearDinero(promedioInscripcion);
}

// ---------------------------------------------------------
// 10. NOTIFICACIONES VISUALES
// ---------------------------------------------------------

function notificar(titulo, mensaje, tipo = "success") {
    const contenedor = document.getElementById("notificaciones");
    const aviso = document.createElement("div");

    aviso.className = `toast ${tipo}`;
    aviso.setAttribute("role", "status");

    const simbolo = tipo === "error" ? "!" : "✓";

    const icono = document.createElement("span");
    icono.className = "toast-mark";
    icono.textContent = simbolo;

    const contenido = document.createElement("div");
    const encabezado = document.createElement("strong");
    const descripcion = document.createElement("p");

    encabezado.textContent = titulo;
    descripcion.textContent = mensaje;

    contenido.append(encabezado, descripcion);
    aviso.append(icono, contenido);
    contenedor.appendChild(aviso);

    // Elimina la notificación después de 4 segundos.
    setTimeout(function () {
        aviso.remove();
    }, 4000);
}
