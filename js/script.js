//Función para obtener el ID del valor seleccionado
document.getElementById('agencia').addEventListener('change', function() {

    //Se obtiene el valor seleccionado del campo agencia
    var agenciaValue = this.value;
    
    //Se obtiene el texto de la opción seleccionada
    var agenciaText = this.options[this.selectedIndex].text;
    
    //Se actualiza el valor del campo idAgencia con el valor seleccionado
    document.getElementById('idAgencia').value = agenciaValue;
});

//Función para generar el tipo de archivo
function generarArchivo(tipoArchivo){

    //Se obtienen los campos del formulario
    var mascara = document.getElementById('mascara').value;
    var tipoDocumento = document.getElementById('tipoDocumento').value;
    var numeroCliente = document.getElementById('numCliente').value;
    var nombreCliente = document.getElementById('nombreCliente').value;
    var agencia = document.getElementById('agencia').querySelector('option:checked').textContent;
    var idAgencia = document.getElementById('idAgencia').value;
    var nombreDocumento = document.getElementById('nombreDocumento').value;
    var numeroDocumento = document.getElementById('numDocumento').value;
    var fechaVigencia = document.getElementById('fechaVigencia').value;
    var fechaExpiracion = document.getElementById('fechaExp').value;
    var fechaDocumento = document.getElementById('fechaDoc').value;
    var fechaArchivado = document.getElementById('fechaArchivado').value;
    var nombreArchivado = document.getElementById('nombreArchivado').value;
    var numeroCrediticio = document.getElementById('numCrediticio').value;

    var archivo;
    
    if(tipoArchivo === 'xml'){ //Se crea un objeto XML
        archivo = '<?xml version="1.0" encoding="UTF-8"?>\n';
        archivo += '<formulario>\n';
        archivo += '    <mascara>' + mascara + '</mascara>\n';
        archivo += '    <tipoDocumento>' + tipoDocumento + '</tipoDocumento>\n';
        archivo += '    <numeroCliente>' + numeroCliente + '</numeroCliente>\n';
        archivo += '    <nombreCliente>' + nombreCliente + '</nombreCliente>\n';
        archivo += '    <agencia>' + agencia + '</agencia>\n';
        archivo += '    <idAgencia>' + idAgencia + '</idAgencia>\n';
        archivo += '    <nombreDocumento>' + nombreDocumento + '</nombreDocumento>\n';
        archivo += '    <numeroDocumento>' + numeroDocumento + '</numeroDocumento>\n';
        archivo += '    <fechaVigencia>' + fechaVigencia + '</fechaVigencia>\n';
        archivo += '    <fechaExpiracion>' + fechaExpiracion + '</fechaExpiracion>\n';
        archivo += '    <fechaDocumento>' + fechaDocumento + '</fechaDocumento>\n';
        archivo += '    <fechaArchivado>' + fechaArchivado + '</fechaArchivado>\n';
        archivo += '    <nombreArchivado>' + nombreArchivado + '</nombreArchivado>\n';
        archivo += '    <numeroCrediticio>' + numeroCrediticio + '</numeroCrediticio>\n';
        archivo += '</formulario>';
    }
    else if(tipoArchivo === 'json'){ //Se crea un objeto JSON
        archivo = {
            mascara: mascara,
            tipoDocumento: tipoDocumento,
            numeroCliente: numeroCliente,
            nombreCliente: nombreCliente,
            agencia: agencia,
            idAgencia: idAgencia,
            nombreDocumento: nombreDocumento,
            numeroDocumento: numeroDocumento,
            fechaVigencia: fechaVigencia,
            fechaExpiracion: fechaExpiracion,
            fechaDocumento: fechaDocumento,
            fechaArchivado: new Date(fechaArchivado).toISOString(),
            nombreArchivado: nombreArchivado,
            numeroCrediticio: numeroCrediticio
        };
    }

    var contenido;
    if (tipoArchivo === 'xml'){
        contenido = archivo;
    }else if(tipoArchivo === 'json'){
        contenido = JSON.stringify(archivo, null, 2); //Convirtiendo JSON a una cadena
    }

    //Se crea un Blob con el contenido del archivo
    var blob = new Blob([contenido], {type: tipoArchivo === 'xml' ? 'text/xml' : 'application/json'});

    //Se crea enlace de descarga 
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(blob);
    a.download = 'formulario.' + tipoArchivo;
    a.click();
}

//Función para generar y descargar archivo XML
document.getElementById('descargarXML').addEventListener('click', function(){
    generarArchivo('xml');
});

//Función para generar y descargar documento JSON
document.getElementById('descargarJSON').addEventListener('click', function(){
    generarArchivo('json');
});

function limpiarFormulario(){

    //Se obtiene el formulario
    var form = document.getElementById('formulario');

    //Se recorren los elementos del formulario
    for(var i = 0; i<form.elements.length; i++){
        var elemento = form.elements[i];

        //Se limpian los campos de texto y los campos de selección
        if(elemento.type === 'text' || elemento.tagName === 'SELECT'){
            elemento.value = '';
        }
    }

}

document.getElementById('limpiar').addEventListener('click', function(){
    limpiarFormulario();
});