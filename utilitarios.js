function recuperaraTexto(idComponente) {
    let componente = document.getElementById(idComponente);
    let valorIngresado = componente.value;
    return valorIngresado;
}

function recuperarInt(idComponente) {
    let valorCaja = recuperaraTexto(idComponente);
    let valorEntero = parseInt(valorCaja);
    return valorEntero;
}

function recuperarFloat(idComponente) {
    let valorCaja = recuperaraTexto(idComponente);
    let valorFlotante = parseFloat(valorCaja);
    return valorFlotante;
}

function mostrarTextoEnCaja(idComponente, mensaje) {
    let componente = document.getElementById(idComponente);
    componente.value = mensaje;
}