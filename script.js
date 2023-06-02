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
let opcionPrincipal = parseInt(prompt("Ingrese su opción:"));
let numeroOk = false;
if (opcionPrincipal == 0) {
    console.log("Eligió SALIR, hasta la proxima!");
}
else {
    while (opcionPrincipal != 0) {
        switch (opcionPrincipal) {
            case 1:
                imprimirMenuCalculadora();
                let opcionSecundaria = parseInt(prompt("Ingrese la operación a ejecutar:"));
                if (opcionSecundaria != 0) {
                    switch (opcionSecundaria) {
                        case 1:
                            let sumando1, sumando2;
                            console.log("-- Suma --");
                            numeroOk = false;
                            while (!numeroOk) {
                                sumando1 = parseInt(prompt("Ingrese el primer sumando:"));
                                if (isNaN(sumando1)) {
                                    console.log("Valor ingresado no es válido \n");
                                }
                                else {
                                    numeroOk = true;
                                }
                            }
                            numeroOk = false;
                            while (!numeroOk) {
                                sumando2 = parseInt(prompt("Ingrese el segundo sumando:"));
                                if (isNaN(sumando2)) {
                                    console.log("Valor ingresado no es válido \n");
                                }
                                else {
                                    numeroOk = true;
                                }
                            }
                            console.log("Resultado: " + sumando1 + " + " + sumando2 + " = " + suma(sumando1, sumando2));
                            break;

                        case 2:
                            let minuendo, sustraendo;
                            console.log("-- Resta --");
                            numeroOk = false;
                            while (!numeroOk) {
                                minuendo = parseInt(prompt("Ingrese el minuendo:"));
                                if (isNaN(minuendo)) {
                                    console.log("Valor ingresado no es válido \n");
                                }
                                else {
                                    numeroOk = true;
                                }
                            }
                            numeroOk = false;
                            while (!numeroOk) {
                                sustraendo = parseInt(prompt("Ingrese el sustraendo:"));
                                if (isNaN(sustraendo)) {
                                    console.log("Valor ingresado no es válido \n");
                                }
                                else {
                                    numeroOk = true;
                                }
                            }
                            console.log("Resultado: " + minuendo + " - " + sustraendo + " = " + resta(minuendo, sustraendo));
                            break;

                        case 3:
                            let factor1, factor2;
                            console.log("-- Multiplicación --");
                            numeroOk = false;
                            while (!numeroOk) {
                                factor1 = parseInt(prompt("Ingrese el factor #1:"));
                                if (isNaN(factor1)) {
                                    console.log("Valor ingresado no es válido \n");
                                }
                                else {
                                    numeroOk = true;
                                }
                            }
                            numeroOk = false;
                            while (!numeroOk) {
                                factor2 = parseInt(prompt("Ingrese el factor #2:"));
                                if (isNaN(factor2)) {
                                    console.log("Valor ingresado no es válido \n");
                                }
                                else {
                                    numeroOk = true;
                                }
                            }
                            console.log("Resultado: " + factor1 + " x  " + factor2 + " = " + multiplica(factor1, factor2));
                            break;

                        default:
                            console.log("Opción ingresada no es valida, elija otra por favor");
                            break;
                    }
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
                    //AQUÍ SE PODRÍA USAR OTRA CONDICIÓN CON OR (||) PARA CONTROLAR SI SUPERA 50, PERO PREFERI HACERLO
                    //APARTE PARA USAR EL ELSE IF Y SER MAS ESPECIFICO EN LA DEVOLUCIÓN EN PANTALLA
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
                        //SE INGRESA CADA NUMERO DE LA CANTIDAD ELEGIDA MENOR A 50 Y SE SUMAN
                        for (let i = 1; i <= cantidadNumeros; i++) {
                            //CONTROLO EL VALOR INGRESADO
                            let ingresoOk = false;
                            while (!ingresoOk) {
                                sumatoria[i] = parseInt(prompt("Ingrese el valor número " + i + ":"));
                                if (isNaN(sumatoria[i])) {
                                    console.log("Valor ingresado no válido");
                                }
                                else {
                                    promedio = promedio + sumatoria[i];
                                    ingresoOk = true;
                                }
                            }
                        }
                        //SE IMPRIMEN EN PANTALLA LOS NUMEROS INGRESADOS PARA QUE EL USUARIO VERIFIQUE SI SON CORRECTOS
                        console.log("Los números ingresados fueron: \n");
                        for (let i = 1; i <= cantidadNumeros; i++) {
                            console.log("Valor #" + i + ": " + sumatoria[i]);
                        }
                        //SE CALCULA EL PROMEDIO (SUMATORIA DE LOS NUMEROS INGRESADOS / CANTIDAD DE NUMEROS INGRESADOS)
                        promedio = promedio / cantidadNumeros;
                        console.log("El promedio de los números ingresados es de: " + promedio);
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
            console.log("Eligió SALIR, hasta la proxima!");
        }
    }
}