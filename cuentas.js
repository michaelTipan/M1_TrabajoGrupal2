cuentas=[
    {numeroCuenta:"02234567", cedula:"1714616123",nombre:"Juan",apellido:"Perez",saldo:0.0},
    {numeroCuenta:"02345211",cedula:"1281238233",nombre:"Felipe",apellido:"Caicedo",saldo:0.0}
]

cargar=function(){
    mostrarComponente("divCuentas");
    ocultarComponente("divMovimientos");
    ocultarComponente("divTransacciones");
    
}

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
