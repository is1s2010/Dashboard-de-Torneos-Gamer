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


function mostrarTorneos() {
    let contenidoTabla = "";
    
    for (let i = 0; i < torneos.length; i++) {
        let t = torneos[i];
        contenidoTabla += "<tr>";
        contenidoTabla += "<td>" + t.nombre  + "</td>";
        contenidoTabla += "<td>" + t.categoria  + "</td>";
        contenidoTabla += "<td>" + t.participantes  + "</td>";
        contenidoTabla += "<td>$" + t.valorInscripcion.toFixed(2)  + "</td>";
        contenidoTabla += "<td>" + t.email  + "</td>";
        contenidoTabla += "<td>$" + t.recaudacion.toFixed(2)  + "</td>";
        contenidoTabla += "</tr>";
    }
    
    document.getElementById("cuerpoTabla").innerHTML = contenidoTabla;
}

function limpiarFormulario() {
    mostrarTextoEnCaja("nombre", "");
    mostrarTextoEnCaja("categoria", "");
    mostrarTextoEnCaja("participantes", "");
    mostrarTextoEnCaja("valorInscripcion", "");
    mostrarTextoEnCaja("email", "");
}










































