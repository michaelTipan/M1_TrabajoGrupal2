cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]
movimientos=[
    {numeroCuenta:"02234567",monto:10.24,tipo:"D"},
    {numeroCuenta:"02345211",monto:45.90,tipo:"D"},
    {numeroCuenta:"02234567",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:65.23,tipo:"C"},
    {numeroCuenta:"02345211",monto:12.0,tipo:"D"},
]
cargarCuentas=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    mostrarCuentas();
}

cargarMovimientos=function(){
    mostrarComponente("divMovimientos");
    ocultarComponente("divCuentas");
    ocultarComponente("divTransacciones");
}

cargarTransacciones=function(){
    mostrarComponente("divTransacciones");
    ocultarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    deshabilitarComponente("lblDepositar");
    deshabilitarComponente("lblRetirar");
    deshabilitarComponente("lblMonto");
    mostrarTransacciones();
}


/*-----------------------------------------CUENTAS.JS----------------------------------------

/*
Muestra en pantalla una tabla con la información de todas las cuentas del arreglo.
Columnas: NUMERO CUENTA, NOMBRE, SALDO
En la columna NOMBRE concatenar el nombre y el apellido
*/
mostrarCuentas = function () {
    let cmptabla = document.getElementById("tablaCuentas");
    let tabla = "<table><tr><th>Numero Cuenta</th><th>Nombre</th><th>Saldo</th></tr>"
    for (let i = 0; i < cuentas.length; i++) {
        tabla += "<tr><td>" + cuentas[i].numeroCuenta + "</td>" +
            "<td>" + cuentas[i].nombre + " " + cuentas[i].apellido + "</td>"
            + "<td>" + cuentas[i].saldo + "</td></tr>"

    }
    cmptabla.innerHTML = tabla;

}

/*
    Busca la cuenta en el arreglo en función del número de cuenta,
    si existe retorna el objeto cuenta, caso contrario retorna null. 
*/
buscarCuenta = function (numeroCuenta) {
    for (let i = 0; i < cuentas.length; i++) {
        if (cuentas[i].numeroCuenta == numeroCuenta) {
            return cuentas[i];
        } else {
            return null;
        }
    }
}

/*
    Agrega una cuenta al arreglo, solamente si no existe otra cuenta con el mismo numero.
    No retorna nada
*/
//Si ya existe mostrar un alert CUENTA EXISTENTE
//Si se agrega, mostrar un alert CUENTA AGREGADA
agregarCuenta = function (cuenta) {
    if ((buscarCuenta(cuenta.numeroCuenta)) != null) {
        alert("CUENTA EXISTENTE");
    } else {
        cuentas.push(cuenta);
        alert("CUENTA AGREGADA");
    }
}

//Toma los valores de las cajas de texto, sin validaciones
//Crea un objeto cuenta y agrega los atributos con los valores de las cajas respectivas
//Invoca a agregarCuenta
//Invoca a mostrarCuentas
agregar = function () {
    let numCuenta = recuperarTexto("txtNumCuenta")
    let nombre = recuperarTexto("txtNombre")
    let apellido = recuperarTexto("txtApellido")
    let cedula = recuperarTexto("txtCedula")
    cuenta = []
    cuenta.numeroCuenta = numCuenta
    cuenta.cedula = cedula
    cuenta.nombre = nombre
    cuenta.apellido = apellido
    cuenta.saldo = 0
    agregarCuenta(cuenta)
    mostrarCuentas()


}

//--------------------------------------Transacciones-----------------------------------------------------

buscarCuenta=function(numeroCuenta){
    let cuenta=null;
    let elementoCliente;
    for(let i=0;i<cuentas.length;i++){
        elementoCliente=cuentas[i];
        if(elementoCliente.numeroCuenta==numeroCuenta){
            cuenta=elementoCliente;
        }
    }
    if(cuenta!=null){
        return cuenta;
    }else{
        return cuenta;
    }

}


ejecutarBusqueda=function(){
    let numeroDeCuenta=recuperarTexto("lblNumeroCuenta");
    let cuentaEncontrado=buscarCuenta(numeroDeCuenta);
    if(cuentaEncontrado!=null){
        mostrarTransacciones(numeroDeCuenta);
        habilitarComponente("lblMonto");
        habilitarComponente("lblDepositar");
        habilitarComponente("lblRetirar");
    }else{
        alert("CUENTA INEXISTENTE");
    }
}
    //toma el numero de cuenta de la caja de texto
    //invoca a buscarCuenta y guarda el resultado en una variable
    //Si el resultado es diferente de null, muestra en pantalla, caso contrario muestra un alert


    depositar=function(numeroCuenta,monto){
        let cuentaAfectada;
        cuentaAfectada=buscarCuenta(numeroCuenta);
        cuentaAfectada.saldo=cuentaAfectada.saldo+monto
        return cuentaAfectada;
    }
    
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro


    ejecutarDeposito=function(){
        let numeroDeCuenta=recuperarTexto("lblNumeroCuenta");
        let monto=recuperarInt("lblMonto");
        let depositadoMonto=depositar(numeroDeCuenta,monto);
        alert("TRANSACCION EXITOSA")
        mostrarTransacciones(depositadoMonto.numeroCuenta);
            let movimiento = {
                tipo: 'C',
                numeroCuenta:numeroDeCuenta,
                monto:monto
            };
            movimientos.push(movimiento);
        
    }
        //Toma el numero de cuenta ingresado en la caja de texto
    //Toma el monto ingresado en la caja de texto
    //invoca a depositar
    //Muestra un mensaje TRANSACCION EXITOSA
    //Muestra en pantalla el nuevo saldo de la cuenta


    depositar=function(numeroCuenta,monto){
        let cuentaAfectada;
        cuentaAfectada=buscarCuenta(numeroCuenta);
        cuentaAfectada.saldo=cuentaAfectada.saldo+monto
        return cuentaAfectada;
    }
    
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Al saldo actual de la cuenta afectada, le suma el monto que recibe como parámetro


    retirar=function(numeroCuenta,monto){
        let cuentaAfectada;
        cuentaAfectada=buscarCuenta(numeroCuenta);
        if(cuentaAfectada.saldo>monto){
            cuentaAfectada.saldo=cuentaAfectada.saldo-monto
            alert("TRANSACCION EXITOSA")
            return cuentaAfectada;
        }else{
            alert("SALDO INSUFICIENTE")
        }
    }
    //invoca a buscarCuenta, guarda el resultado en la variable cuentaAfectada;
    //Valida si la cuenta tiene el saldo suficiente para retirar el monto
    //Si el saldo es suficiente,al saldo actual de la cuenta afectada, le resta el monto que recibe como parámetro
    //Si el saldo no es suficiente, muestra un alert SALDO INSUFICIENTE
    //Si logra retirar muestra un mensaje TRANSACCION EXITOSA y muestra en pantalla el nuevo saldo de la cuenta

    ejecutarRetiro=function(){
        let numeroDeCuenta=recuperarTexto("lblNumeroCuenta");
        let monto=recuperarInt("lblMonto");
        let retiroMonto=retirar(numeroDeCuenta,monto);
        mostrarTransacciones(retiroMonto.numeroCuenta);
            let movimiento = {
                tipo: 'D',
                numeroCuenta:numeroDeCuenta,
                monto:monto
            };
            movimientos.push(movimiento);
        
    }
    
    //Para mostrar en pantalla los datos
    mostrarTransacciones=function(numeroCuenta){
        let cmpTabla=document.getElementById("lblTabla");
        let contenidoTabla="<table id=\"contenidoTabla\"><tr>"+
        "<th>CEDULA</th>"+
        "<th>NOMBRES COMPLETOS</th>"+
        "<th>SALDO </th>"+
        "</tr>"
        let elementoCuenta;
        for(let i=0;i<cuentas.length;i++){
            elementoCuenta=cuentas[i]
            if(elementoCuenta.numeroCuenta==numeroCuenta){
                contenidoTabla+=
                "<tr><td>"+elementoCuenta.cedula+"</td>"+
                "<td>"+elementoCuenta.nombre+" "+elementoCuenta.apellido+"</td>"+
                "<td>"+elementoCuenta.saldo+"</td></tr>"
            }
        }
        contenidoTabla+="</table>"
        cmpTabla.innerHTML=contenidoTabla;
    }

//------------------------------------------MOVIMIENTOS-------------------------------------------------------

   //Se barre el arreglo de movimientos
    //En cada iteración, verifica si el numero de cuenta del movimiento es igual al que recibe como parametro
    //En caso de serlo, agrega la cuenta al arreglo movimientosCuenta
    //Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
    filtrarMovimientos=function(numeroCuenta){
        let movimientosCuenta = [];
        numeroCuenta=recuperarTexto("txtNumCuentaMovimientos")
        // Se barre el arreglo de movimientos
        for (let i = 0; i < movimientos.length; i++) {
            // Verifica si el número de cuenta del movimiento es igual al que recibe como parámetro
            if (numeroCuenta == movimientos[i].numeroCuenta) {
                // Agrega el movimiento al arreglo movimientosCuenta
                movimientosCuenta.push(movimientos[i]);
            }
        }
        // Invoca a mostrarMovimientos, pasándole como parámetro movimientosCuenta
        mostrarMovimientos(movimientosCuenta);
    }
    
    /*
        Recibe un arreglo con los movimientos que va a mostrar en pantalla
    */
    mostrarMovimientos=function(misMovimientos){
        //Muestra en pantalla una tabla con los movimientos que recibe en misMovimientos
        //Columnas: NUMERO CUENTA, MONTO, OPERACION
        let cmpTabla = document.getElementById("tablaMovimientos");
        let contenidoTabla = "<table><tr>" +
            "<th>Cuenta</th>" +
            "<th>Monto</th>" +
            "<th>Operación</th>" +
            "</tr>";
        for (let i = 0; i < misMovimientos.length; i++) {
            let movimiento = misMovimientos[i];
        //Si ya pinta correctamente la tabla, hacer el siguiente cambio:
        //Si el tipo es D(DEBITO), mostrar el monto en negativo (multiplicar por -1)
        //Si el tipo es C(CREDITO), mostrar el monto en positivo (tal como está guardado)
        let monto
            if (movimiento.tipo == "D") {
                monto = movimiento.monto*-1
            }else{
                monto = movimiento.monto
            }
            contenidoTabla +=
                "<tr><td>" + movimiento.numeroCuenta + "</td>"
                + "<td>" + monto + "</td>"
                + "<td>" + movimiento.tipo  + "</td>"
                + "</tr>";
        }
        contenidoTabla += "</table>";
        cmpTabla.innerHTML = contenidoTabla;  
    }

    //Cuando se realiza un depósito de forma exitosa, se debe crear un objeto movimiento
//con el tipo C, que corresponde a CREDITO, el número de cuenta a la que se hizo el depósito
//y el monto que se depositó. Este objeto movimiento se agrega al arreglo movimientos

//Cuando se realiza un retiro de forma exitosa, se debe crear un objeto movimiento
//con el tipo D, que corresponde a DEBITO, el número de cuenta a la que se hizo el retiro
//y el monto que se retiró. Este objeto movimiento se agrega al arreglo movimientos
