//Busca una caja por su ID
function recuperarTexto(idcomponente){
    let componente = document.getElementById(idcomponente);
    let valor = componente.value;
    
    return valor;
}

//Convierte Texto a Numeros decimales
function recuperarFloat(idcomponente){
    let valorTexto = recuperarTexto(idcomponente);
    let valorFloat = parseFloat(valorTexto);

    return valorFloat;
}

//Convierte Textoi a Numeros enteros 
function recuperarEntero(idcomponente){
    let valorTexto = recuperarTexto(idcomponente);
    let valorEntero = parseInt(valorTexto);

    return valorEntero;
}

//Resultado a los span de html
function mostrarEnSpan(idcomponente,valor){
    let componente = document.getElementById(idcomponente);
    componente.textContent = valor;
}
    

function recuperaraTexto(idComponente){
    let componente;
    let valorIngresado;
    componente=document.getElementById(idComponente);
    valorIngresado=componente.value;
    return valorIngresado;
    }
    
function recuperarInt(idComponente){
    let valorCaja=recuperaraTexto(idComponente);
    let valorEntero=parseInt(valorCaja);
    return valorEntero;
    }
function recuperarFloat(idComponente){
    let valorCaja=recuperaraTexto(idComponente);
    let valorFlotante=parseFloat(valorCaja);
    return valorFlotante;
    }
function mostrarTexto(idComponente,mensaje){
    let componente;
    componente=document.getElementById(idComponente);
    componente.innerText=mensaje;
    }
function mostrarTextoEnCaja(idComponente,mensaje){
    let componente;
    componente=document.getElementById(idComponente);
    componente.value=mensaje;
    }
    
function mostrarImagen(idComponente,rutaImagen){
    let componente;
    componente=document.getElementById(idComponente);
    componente.src = rutaImagen;
    
    }