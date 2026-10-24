let torneos = [];


function registrarTorneo() {
    let nombre = recuperaraTexto("nombre");
    let categoria = recuperaraTexto("categoria");
    let participantes = recuperarInt("participantes");
    let valorInscripcion = recuperarFloat("valorInscripcion");
    let email = recuperaraTexto("email");


    if (nombre.trim().length < 4) {
        alert("El nombre debe tener al menos 4 caracteres.");
        return;
    }
    if (categoria === "") {
        alert("Debe seleccionar una categoria.");
        return;
    }
    if (isNaN(participantes) || participantes < 1 || participantes > 100) {
        alert("Los participantes deben ser un numero entero entre 1 y 100.");
        return;
    }
    if (isNaN(valorInscripcion) || valorInscripcion <= 0) {
        alert("El valor de inscripcion debe ser mayor que 0.");
        return;
    }
    if (email.trim() === "") {
        alert("El email no puede estar vacio.");
        return;
    }

    let recaudacion = participantes * valorInscripcion;

    let nuevoTorneo = {
        nombre: nombre,
        categoria: categoria,
        participantes: participantes,
        valorInscripcion: valorInscripcion,
        email: email,
        recaudacion: recaudacion
    };

    torneos.push(nuevoTorneo);

    mostrarTorneos();
    limpiarFormulario();

    alert("Registro exitoso.");
}


function mostrarTorneos(filtro = "") {
    let contenidoTabla = "";
    let contenidoTarjetas = "";
    
    for (let i = 0; i < torneos.length; i++) {
        let t = torneos[i];
        
        let textoBusqueda = filtro.toLowerCase();
        let coincideNombre = t.nombre.toLowerCase().includes(textoBusqueda);
        let coincideCategoria = t.categoria.toLowerCase().includes(textoBusqueda);
        
        if (coincideNombre || coincideCategoria || filtro === "") {
            contenidoTabla += "<tr>";
            contenidoTabla += "<td>" + t.nombre  + "</td>";
            contenidoTabla += "<td>" + t.categoria  + "</td>";
            contenidoTabla += "<td>" + t.participantes  + "</td>";
            contenidoTabla += "<td>$" + t.valorInscripcion.toFixed(2)  + "</td>";
            contenidoTabla += "<td>" + t.email  + "</td>";
            contenidoTabla += "<td>$" + t.recaudacion.toFixed(2)  + "</td>";
            contenidoTabla += "<td>";
            contenidoTabla += "<button onclick='editarTorneo(" + i + ")'>EDITAR</button> ";
            contenidoTabla += "<button onclick='eliminarTorneo(" + i + ")'>ELIMINAR</button>";
            contenidoTabla += "</td>";
            contenidoTabla += "</tr>";

            contenidoTarjetas += "<div class='tarjeta'>";
            contenidoTarjetas += "<h3>" + t.nombre + "</h3>";
            contenidoTarjetas += "<p>Categoria: " + t.categoria + "</p>";
            contenidoTarjetas += "<p>Participantes: " + t.participantes + "</p>";
            contenidoTarjetas += "<p>Recaudación: $" + t.recaudacion.toFixed(2) + "</p>";
            contenidoTabla += "<td><button onclick='eliminarTorneo(" + i + ")'>ELIMINAR</button></td>";
            contenidoTarjetas += "</div>";

        }

        document.getElementById("cuerpoTabla").innerHTML = contenidoTabla;
    
        let contenedorTarjetas = document.getElementById("contenedorTarjetas");
        if(contenedorTarjetas) {
            contenedorTarjetas.innerHTML = contenidoTarjetas;
        }
    }
    
    document.getElementById("cuerpoTabla").innerHTML = contenidoTabla;
    
    let contenedorTarjetas = document.getElementById("contenedorTarjetas");
    if(contenedorTarjetas) {
        contenedorTarjetas.innerHTML = contenidoTarjetas;
    }
}

function limpiarFormulario() {
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("categoria", "");
    mostrarTextoEnCaja("participantes", "");
    mostrarTextoEnCaja("valorInscripcion", "");
    mostrarTextoEnCaja("email", "");
}
function actualizarEstadisticas() {

    let totalTorneos = torneos.length;
    let totalParticipantes = 0;
    let recaudacionTotal = 0;
    for (let i = 0; i < torneos.length; i++) {

        totalParticipantes = totalParticipantes + torneos[i].participantes;
        recaudacionTotal = recaudacionTotal + torneos[i].recaudacion;
    }
    document.getElementById("totalTorneos").innerText = totalTorneos;
    document.getElementById("totalParticipantes").innerText = totalParticipantes;
    document.getElementById("recaudacionTotal").innerText = recaudacionTotal.toFixed(2);
}
 function eliminarTorneo (indice){
    if(confirm("¿Seguro que deseas eliminar este torneo?")){
        torneos.splice(indice, 1);
        mostrarTorneos();
}
 }

/* =========================================================
   ACTIVIDAD 5: BUSCAR TORNEOS
   ========================================================= */

function buscarTorneos() {

    // La tabla y las tarjetas vuelven a dibujarse
    // con el contenido actual de la caja de búsqueda.
    mostrarTorneos();
}




