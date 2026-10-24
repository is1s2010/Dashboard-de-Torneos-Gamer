window.alert = function(mensaje) {
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
    overlay.style.backdropFilter = 'blur(4px)'; 

    const caja = document.createElement('div');
    caja.classList.add('modal-animado'); // Clase CSS para la animación
    caja.style.backgroundColor = '#1f2833';
    caja.style.border = '2px solid #ff007f';
    caja.style.boxShadow = '0 0 20px #ff007f';
    caja.style.borderRadius = '10px';
    caja.style.padding = '30px';
    caja.style.textAlign = 'center';
    caja.style.maxWidth = '400px';
    caja.style.width = '80%';

    const texto = document.createElement('p');
    texto.textContent = mensaje;
    texto.style.color = '#ffffff';
    texto.style.fontFamily = "'Roboto', sans-serif"; // Más legible para textos largos
    texto.style.fontSize = '16px'; 
    texto.style.lineHeight = '1.6'; 
    texto.style.marginBottom = '25px';

    const boton = document.createElement('button');
    boton.textContent = 'OK';
    
    boton.onclick = () => {
        document.body.removeChild(overlay);
    };

    caja.appendChild(texto);
    caja.appendChild(boton);
    overlay.appendChild(caja);
    document.body.appendChild(overlay);
};

// NUEVO: Reemplazo para el confirm() del navegador (Mantiene el estilo Arcade)
window.confirmar = function(mensaje) {
    return new Promise((resolve) => {
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
        overlay.style.backdropFilter = 'blur(4px)';

        const caja = document.createElement('div');
        caja.classList.add('modal-animado');
        caja.style.backgroundColor = '#1f2833';
        caja.style.border = '2px solid #00ffff'; // Bordes cyan para diferenciar del alert
        caja.style.boxShadow = '0 0 20px #00ffff';
        caja.style.borderRadius = '10px';
        caja.style.padding = '30px';
        caja.style.textAlign = 'center';
        caja.style.maxWidth = '400px';
        caja.style.width = '80%';

        const texto = document.createElement('p');
        texto.textContent = mensaje;
        texto.style.color = '#ffffff';
        texto.style.fontFamily = "'Roboto', sans-serif";
        texto.style.fontSize = '16px';
        texto.style.marginBottom = '25px';

        const contenedorBotones = document.createElement('div');
        contenedorBotones.style.display = 'flex';
        contenedorBotones.style.gap = '15px';

        const btnCancelar = document.createElement('button');
        btnCancelar.textContent = 'CANCELAR';
        btnCancelar.style.backgroundColor = '#343a46'; // Color oscuro
        btnCancelar.style.boxShadow = 'none';

        const btnAceptar = document.createElement('button');
        btnAceptar.textContent = 'CONFIRMAR';

        btnCancelar.onclick = () => {
            document.body.removeChild(overlay);
            resolve(false); // Retorna falso si cancela
        };

        btnAceptar.onclick = () => {
            document.body.removeChild(overlay);
            resolve(true); // Retorna verdadero si acepta
        };

        contenedorBotones.appendChild(btnCancelar);
        contenedorBotones.appendChild(btnAceptar);
        caja.appendChild(texto);
        caja.appendChild(contenedorBotones);
        overlay.appendChild(caja);
        document.body.appendChild(overlay);
    });
};

function recuperaraTexto(idComponente) {
    return document.getElementById(idComponente).value;
}

function recuperarInt(idComponente) {
    return parseInt(recuperaraTexto(idComponente));
}

function recuperarFloat(idComponente) {
    return parseFloat(recuperaraTexto(idComponente));
}

function mostrarTextoEnCaja(idComponente, mensaje) {
    document.getElementById(idComponente).value = mensaje;
}
