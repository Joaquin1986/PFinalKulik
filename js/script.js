//ARCHIVO JS DE PRE-ENTREGA 2 - JOAQUIN KULIK


//FUNCIONES DE IMPRESION DE MENUS
function imprimirMenuPrincipal() {
    console.log("-- Bienvenid@ al Menú Principal -- \n\n");
    console.log(" 1- Calculadora \n 2- Productos \n 3- Promedio de N números \n \n 0- Salir \
     \n \n Elija su opcion, por favor: ");
}

function imprimirMenuCalculadora() {
    console.log("-- Calculadora -- \n\n");
    console.log(" 1- Suma (+) \n 2- Resta (-) \n 3- Multiplicación (x) \n 4- División (÷) \
    \n 5- Logaritmo \n 6- Raíz Cuadrada \n 7- Exponencial \
     \n \n 0- Volver \n \n Elija su opcion, por favor: ");
}

function imprimirMenuProductos() {
    console.log("-- Productos -- \n\n");
    console.log(" 1- Ver productos por Categoría \n 2- Alta Producto \n 3- Baja Producto \n 4- Compra de Productos\
    \n \n 0- Volver \n \n Elija su opcion, por favor: ");
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

//FUNCIONES DE CALCULADORA, TOMA LOS NUMEROS DE PARAMETROS Y REALIZA LA OPERACIÓN ARITMÉTICA CORRESPONDIENTE

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

// SE DEFINEN CATEGORÍAS DE PRODUCTOS EN UN ARRAY
const categorias = ["Meditacion", "Ayurveda (Medicina y Cocina)", "Vestimenta Hindu"];

//CLASE 'PRODUCTO' CON CONSTRUCTOR DE OBJETO

class Producto {
    constructor(id, nombre, descripcion, categoria, precio) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
    }
    imprimir() {
        console.log("\nNombre: " + this.nombre + "\nDescripción: " + this.descripcion + "\nCategoría: " +
            this.categoria + "\nPrecio sin IVA: " + this.precio + "\nPrecio con IVA: " + this.precioIVA());
    }
    precioIVA(){
        return this.precio * 1.20;
    }
}

//FUNCIONES DE PRODUCTOS

//LISTA CATEGORÍAS
function imprimirCategorias() {
    console.log("Categorías: \n 1- Meditación\n 2- Ayurveda (Medicina y Cocina)\n 3-Vestimenta Hindú");
}

function ingresarCategoria() {
    let numeroOk = false;
    let numero, opcionElegida;
    while (!numeroOk) {
        numero = parseInt(prompt("Elija la categoría del Producto: \n 1- Meditación\
        \n 2- Ayurveda (Medicina y Cocina)\n 3-Vestimenta Hindú"));
        if (isNaN(numero) || numero < 1 || numero > 3) {
            console.log("Valor ingresado no es válido \n");
        }
        else if (numero == 1) {
            numeroOk = true;
            opcionElegida = "Meditacion";
        }
        else if (numero == 2) {
            numeroOk = true;
            opcionElegida = "Ayurveda (Medicina y Cocina)";
        }
        else if (numero == 3) {
            numeroOk = true;
            opcionElegida = "Vestimenta Hindu";

        }
    }
    return opcionElegida;
}


//BUSCA UN ID LIBRE DE PRODUCTO
function idLibreProducto(productos) {
    let idLibre;
    const ids = [];
    productos.forEach(element => {
        ids.push(element.id);
    });
    idLibre = Math.max(...ids) + 1;
    return idLibre;
}

//MENU PRINCIPAL
imprimirMenuPrincipal();
const productos = [];
let opcionPrincipal = parseInt(prompt("Ingrese su opción (0-Salir):"));
let opcionSecundaria = 0;
if (opcionPrincipal == 0) {
    console.log("Eligió SALIR, hasta la proxima! Pulse F5 para volver a ejecutar...");
}
else {
    while (opcionPrincipal != 0) {
        switch (opcionPrincipal) {

            case 1:
                imprimirMenuCalculadora();
                opcionSecundaria = parseInt(prompt("Ingrese la operación a ejecutar (0- Volver):"));
                while (opcionSecundaria != 0) {
                    switch (opcionSecundaria) {
                        case 1:
                            let sumando1, sumando2;
                            console.log("-- Suma (1er sumando + 2do sumando) --");
                            sumando1 = ingresarNumero("Ingrese el primer sumando:");
                            sumando2 = ingresarNumero("Ingrese el segundo sumando:");
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

                        case 5:
                            console.log("-- Logaritmo --");
                            x = ingresarNumero("Ingrese el número a calcular su logaritmo natural: ");
                            console.log("Resultado Log(" + x + "): " + Math.log(x));
                            break;

                        case 6:
                            console.log("-- Raíz Cuadrada --");
                            x = ingresarNumero("Ingrese el número a calcular su raíz cuadrada: ");
                            console.log("Resultado Raíz Cuadrada de " + x + ": " + Math.sqrt(x));
                            break;

                        case 7:
                            console.log("-- Exponencial --");
                            x = ingresarNumero("Ingrese el número a calcular su exponencial: ");
                            console.log("Resultado Exponencial de " + x + ": " + Math.exp(x));
                            break;

                        default:
                            console.log("Opción ingresada no es valida, elija otra por favor");
                            break;
                    }
                    imprimirMenuCalculadora();
                    opcionSecundaria = parseInt(prompt("Ingrese la operación a ejecutar (0- Volver):"));
                }
                break;

            case 2:
                //OPCION DE PRODUCTOS (SE IMPLEMENTAN OBJETOS)
                const prod0 = new Producto(1, "Incienso", "Para aromatizar ambientes", "Meditacion", "50");
                productos.push(prod0);
                imprimirMenuProductos();
                let idProd, nombreProd, descripcionProd, categoriaProd, precioProd;
                opcionSecundaria = parseInt(prompt("Ingrese su opción (0-Volver):"));
                while (opcionSecundaria != 0) {
                    switch (opcionSecundaria) {
                        case 1:
                            let vacio;
                            //VER PRODUCTOS POR CATEGORÍA
                            for (let i = 0; i < 3; i++) {
                                vacio = true;
                                console.log("Categoría: " + categorias[i] + "\n");
                                for (let x = 0; x < productos.length; x++) {
                                    if (productos[x].categoria == categorias[i]) {
                                        /*DESCONOZCO POR QUÉ ME TIRA "UNDEFINED AQUÍ,
                                        SI EJECUTO EL MÉTODO POR FUERA DE ESTE FOR NO ME DEVUELVE EL MISMO RESULTADO
                                        DE TODOS MODOS, CREO QUE NO SERÁ PROBLEMA CUANDO LA INTERFAZ SEA WEB EN VEZ DE CONSOLA*/
                                        console.log(productos[x].imprimir());
                                        vacio = false;
                                    }
                                }
                                if (vacio == true) {
                                    console.log("\nVACÍA");
                                }
                            }
                            break;

                        case 2:
                            //ALTA PRODUCTO
                            console.log("-- Alta de Producto -- \n");
                            nombreProd = prompt("Ingrese el nombre del producto: ");
                            descripcionProd = prompt("Ingrese una descripción del producto: ");
                            imprimirCategorias();
                            categoriaProd = ingresarCategoria();
                            precioProd = ingresarNumero("Ingrese el precio del producto: ");
                            const prod1 = new Producto(idLibreProducto(productos), nombreProd, descripcionProd, categoriaProd, precioProd);
                            productos.push(prod1);
                            console.log("El producto \"" + prod1.nombre + "\" fue creado exitosamente!");
                            break;

                        case 3:
                            //BAJA PRODUCTO
                            console.log("-- Baja de Producto -- \n");
                            imprimirCategorias();
                            categoriaProd = ingresarCategoria();
                            
                            break;

                        case 4:
                            //COMPRA DE PRODUCTOS

                            break;


                        default:
                            console.log("Opción ingresada no es valida, elija otra por favor");
                            break;
                    }
                    imprimirMenuProductos();
                    opcionSecundaria = parseInt(prompt("Ingrese su opción (0-Volver):"));
                }

                break;

            case 3:
                //OPCION DE CALCULO DE PROMEDIO (SE IMPLEMENTAN ARRAYS Y FUNCIONES DE ORDEN SUPERIOR MATH)
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
                        let valor = 0;
                        //ARRAYS PARA SUMATORIA
                        const sumatoria = [];
                        const sumatoriaInt = [];
                        //SE INGRESA CADA NUMERO DE LA CANTIDAD ELEGIDA MENOR A 50 Y SE SUMAN
                        let volver = false;
                        for (let i = 0; i < cantidadNumeros; i++) {
                            //CONTROLO EL VALOR INGRESADO, PERMITIENDO SALIR CON LA LETRA "S"
                            let ingresoOk = false;
                            while (!ingresoOk) {
                                sumatoria[i] = prompt("Ingrese el valor número " + (i + 1) + " (\"S\" para Salir):");
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
                                    promedio += sumatoriaInt[i];
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
                            for (let i = 0; i < cantidadNumeros; i++) {
                                console.log("Valor #" + (i + 1) + ": " + sumatoriaInt[i]);
                            }
                            //SE CALCULA EL PROMEDIO (SUMATORIA DE LOS NUMEROS INGRESADOS / CANTIDAD DE NUMEROS INGRESADOS)
                            promedio = promedio / cantidadNumeros;
                            console.log("El promedio de los números ingresados es: " + Math.round(promedio));
                            const maxNumber = sumatoriaInt.reduce((a, b) => Math.max(a, b), -Infinity);
                            console.log("\nEl mayor de los números ingresados es: " + maxNumber);
                            console.log("\nEl menor de los números ingresados es: " + Math.min(...sumatoriaInt));
                        }
                    }
                }
                break;

            default:
                console.log("Opción ingresada no es valida, elija otra por favor");
                break;
        }
        imprimirMenuPrincipal();
        opcionPrincipal = parseInt(prompt("Ingrese su opción (0-Salir):"));
        if (opcionPrincipal == 0) {
            console.log("Eligió SALIR, hasta la próxima! Pulse F5 para volver a ejecutar...");
        }
    }
}