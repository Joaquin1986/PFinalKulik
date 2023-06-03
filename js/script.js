//ARCHIVO JS DE PRE-ENTREGA 1 - JOAQUIN KULIK

//FUNCIONES DE IMPRESION DE MENU
function imprimirMenuPrincipal() {
    console.log("-- Bienvenid@ al Menú Principal -- \n\n");
    console.log(" 1- Calculadora \n 2- Tabla de X \n 3- Promedio de N números \n \n 0- Salir \n \n Elija su opcion, por favor: ");
}

function imprimirMenuCalculadora() {
    console.log("-- Calculadora -- \n\n");
    console.log(" 1- Suma \n 2- Resta \n 3- Multiplicación \n 4- División \n \n 0- Volver \n \n Elija su opcion, por favor: ");
}

//FUNCION DE CONTROL DE INGRESO DE NUMERO, MUESTRA UN MENSAJE COMO PARÁMETRO DE ENTRADA Y DEVUELVE EL NÚMERO INGRESADO
function ingresarNumero(mensaje) {
    let numeroOk = false;
    let numero;
    while (!numeroOk) {
        numero = parseInt(prompt(mensaje));
        if (isNaN(numero)) {
            console.log("Valor ingresado no es válido \n");
        }
        else {
            numeroOk = true;
        }
    }
    return numero;
}

//FUNCIONES DE CALCULADORA

function suma(numero1, numero2) {
    return numero1 + numero2;
}

function resta(numero1, numero2) {
    return numero1 - numero2;
}

function multiplica(numero1, numero2) {
    return numero1 * numero2;
}

function divide(numero1, numero2) {
    return numero1 / numero2;
}

//MENU PRINCIPAL
imprimirMenuPrincipal();
let opcionPrincipal = parseInt(prompt("Ingrese su opción (0-Salir):"));
if (opcionPrincipal == 0) {
    console.log("Eligió SALIR, hasta la proxima! Pulse F5 para volver a ejecutar...");
}
else {
    while (opcionPrincipal != 0) {
        switch (opcionPrincipal) {
            case 1:
                imprimirMenuCalculadora();
                let opcionSecundaria = parseInt(prompt("Ingrese la operación a ejecutar:"));
                while (opcionSecundaria != 0) {
                    switch (opcionSecundaria) {
                        case 1:
                            let sumando1, sumando2;
                            console.log("-- Suma (1er sumando + 2do sumando) --");
                            sumando1 = ingresarNumero("Ingrese el primer sumando:");
                            sumando2 = ingresarNumero("Ingrese el segundo sumando:")
                            console.log("Resultado: " + sumando1 + " + " + sumando2 + " = " + suma(sumando1, sumando2));
                            break;

                        case 2:
                            let minuendo, sustraendo;
                            console.log("-- Resta (minuendo - sustraendo) --");
                            minuendo = ingresarNumero("Ingrese el minuendo:");
                            sustraendo = ingresarNumero("Ingrese el sustraendo:");
                            console.log("Resultado: " + minuendo + " - " + sustraendo + " = " + resta(minuendo, sustraendo));
                            break;

                        case 3:
                            let factor1, factor2;
                            console.log("-- Multiplicación (factor #1 x factor #2) --");
                            factor1 = ingresarNumero("Ingrese el factor #1:");
                            factor2 = ingresarNumero("Ingrese el factor #2:");
                            console.log("Resultado: " + factor1 + " x  " + factor2 + " = " + multiplica(factor1, factor2));
                            break;

                        case 4:
                            let divisor, dividendo;
                            console.log("-- División (divisor / dividendo) --");
                            divisor = ingresarNumero("Ingrese el divisor:");
                            dividendo = ingresarNumero("Ingrese el dividendo:");
                            console.log("Resultado: " + divisor + " ÷ " + dividendo + " = " + divide(divisor, dividendo));
                            break;

                        default:
                            console.log("Opción ingresada no es valida, elija otra por favor");
                            break;
                    }
                    imprimirMenuCalculadora();
                    opcionSecundaria = parseInt(prompt("Ingrese la operación a ejecutar:"));
                }
                break;
            case 2:
                //OPCION DE CALCULO DE TABLA, SE SOLICITA EL NUMERO Y SE CALCULA LA TABLA HASTA EL 10
                numeroOk = false;
                while (!numeroOk) {
                    let numeroX = parseInt(prompt("Ingrese un número para calcular su tabla: "));
                    if (isNaN(numeroX)) {
                        console.log("Valor ingresado no es válido \n");
                    }
                    else {
                        numeroOk = true;
                        console.log("Tabla del " + numeroX + ": \n")
                        for (let i = 1; i <= 10; i++) {
                            console.log(numeroX + " X " + i + " = " + (numeroX * i));
                        }
                    }
                }
                break;

            case 3:
                //OPCION DE CALCULO DE PROMEDIO
                console.log("-- Calculo de promedio -- \n");
                let cantidadOk = false;
                while (!cantidadOk) {
                    let cantidadNumeros = parseInt(prompt("Ingrese la cantidad de números a calcular (menor a 50): "));
                    /*AQUÍ SE PODRÍA USAR OTRA CONDICIÓN CON OR (||) PARA CONTROLAR SI SUPERA 50, PERO PREFERI HACERLO
                    APARTE PARA USAR EL ELSE IF Y SER MAS ESPECIFICO EN LA DEVOLUCIÓN EN PANTALLA*/
                    if (isNaN(cantidadNumeros)) {
                        console.log("Cantidad ingresada no es válida");
                    }
                    else if (cantidadNumeros <= 0) {
                        console.log("La cantidad de números no puede ser negativa o cero");
                    }
                    else if (cantidadNumeros > 50) {
                        console.log("Opción excedida, pruebe con valor menor a 50");
                    }
                    else {
                        cantidadOk = true;
                        let promedio = 0;
                        const sumatoria = [];
                        const sumatoriaInt = [];
                        //SE INGRESA CADA NUMERO DE LA CANTIDAD ELEGIDA MENOR A 50 Y SE SUMAN
                        let volver = false;
                        for (let i = 1; i <= cantidadNumeros; i++) {
                            //CONTROLO EL VALOR INGRESADO, PERMITIENDO SALIR CON LA LETRA "S"
                            let ingresoOk = false;
                            while (!ingresoOk) {
                                sumatoria[i] = prompt("Ingrese el valor número " + i + " (\"S\" para Salir):");
                                sumatoriaInt[i] = parseInt(sumatoria[i]);
                                if (isNaN(sumatoriaInt[i]) && sumatoria[i] != "S" && sumatoria[i] != "s") {
                                    console.log("Valor ingresado no válido");
                                }
                                else if (sumatoria[i] == "S" || sumatoria[i] == "s") {
                                    volver = true;
                                    ingresoOk = true;
                                    console.log("Volviendo al menú principal...");
                                }
                                else {
                                    promedio = promedio + sumatoriaInt[i];
                                    ingresoOk = true;
                                }
                            }
                            if (sumatoria[i] == "S" || sumatoria[i] == "s") {
                                break;
                            }
                        }
                        if (!volver) {
                            //SE IMPRIMEN EN PANTALLA LOS NUMEROS INGRESADOS PARA QUE EL USUARIO VERIFIQUE SI SON CORRECTOS
                            console.log("Los números ingresados fueron: \n");
                            for (let i = 1; i <= cantidadNumeros; i++) {
                                console.log("Valor #" + i + ": " + sumatoriaInt[i]);
                            }
                            //SE CALCULA EL PROMEDIO (SUMATORIA DE LOS NUMEROS INGRESADOS / CANTIDAD DE NUMEROS INGRESADOS)
                            promedio = promedio / cantidadNumeros;
                            console.log("El promedio de los números ingresados es de: " + promedio);
                        }
                    }
                }
                break;

            default:
                console.log("Opción ingresada no es valida, elija otra por favor");
                break;
        }
        imprimirMenuPrincipal();
        opcionPrincipal = parseInt(prompt("Ingrese su opción:"));
        if (opcionPrincipal == 0) {
            console.log("Eligió SALIR, hasta la proxima! Pulse F5 para volver a ejecutar...");
        }
    }
}