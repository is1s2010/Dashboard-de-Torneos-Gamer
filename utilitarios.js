window.alert = function(mensaje) {
    // Contenedor principal oscuro y translúcido
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(11, 12, 16, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '9999';
    overlay.style.backdropFilter = 'blur(4px)'; // Efecto de desenfoque de fondo

    // Caja de la alerta con borde neón magenta
    const caja = document.createElement('div');
    caja.style.backgroundColor = '#1f2833';
    caja.style.border = '2px solid #ff007f';
    caja.style.boxShadow = '0 0 20px #ff007f';
    caja.style.borderRadius = '10px';
    caja.style.padding = '30px';
    caja.style.textAlign = 'center';
    caja.style.fontFamily = "'Press Start 2P', cursive"; // Mantiene la fuente arcade
    caja.style.maxWidth = '400px';
    caja.style.width = '80%';

    // Texto del mensaje
   // Texto del mensaje
    const texto = document.createElement('p');
    texto.textContent = mensaje;
    texto.style.color = '#ffffff';
    texto.style.fontSize = '14px'; // Aumentamos el tamaño
    texto.style.lineHeight = '2'; // Mayor espacio entre líneas
    texto.style.letterSpacing = '1.5px'; // Separa las letras para evitar que se peguen
    texto.style.marginBottom = '25px';
    texto.style.textShadow = '2px 2px 0px #000000'; // Sombra negra para resaltar el texto

    // Botón ACEPTAR
    const boton = document.createElement('button');
    boton.textContent = 'OK';
    boton.style.backgroundColor = '#ff007f';
    boton.style.color = '#ffffff';
    boton.style.border = 'none';
    boton.style.padding = '12px 25px';
    boton.style.fontFamily = "'Press Start 2P', cursive";
    boton.style.fontSize = '12px';
    boton.style.cursor = 'pointer';
    boton.style.borderRadius = '5px';
    boton.style.boxShadow = '0 0 10px #ff007f';
    boton.style.transition = 'all 0.3s ease';

    // Efecto Hover del botón
    boton.onmouseover = () => {
        boton.style.backgroundColor = '#ffffff';
        boton.style.color = '#ff007f';
        boton.style.boxShadow = '0 0 20px #ff007f';
    };
    boton.onmouseout = () => {
        boton.style.backgroundColor = '#ff007f';
        boton.style.color = '#ffffff';
        boton.style.boxShadow = '0 0 10px #ff007f';
    };

    // Cerrar la alerta al hacer clic
    boton.onclick = () => {
        document.body.removeChild(overlay);
    };

    // Ensamblar e inyectar en el documento
    caja.appendChild(texto);
    caja.appendChild(boton);
    overlay.appendChild(caja);
    document.body.appendChild(overlay);
};


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