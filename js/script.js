//ARCHIVO JS DE PRE-ENTREGA 2 - JOAQUIN KULIK
//EL "JUGO" ESTÁ EN LA OPCIÓN '2' (GESTIÓN DE PRODUCTOS). ALLÍ SE IMPLEMENTA TODO LO VISTO DESDE LA CLASE 5 HASTA LA 8
//DE TODOS MODOS, SE MANTIENEN LAS OPCIONES '1' CALCULADORA Y '3' CALCULO DE PROMEDIO, AGREGÁNDOLES FUNCIONES DE ORDEN SUPERIOR MATH


//FUNCIONES DE IMPRESION DE MENUS
function imprimirMenuPrincipal() {
    console.log("-- Bienvenid@ al Menú Principal -- \n\n");
    console.log(" 1- Calculadora \n 2- Gestión de Productos \n 3- Promedio de N números \n \n 0- Salir \
     \n \n Elija su opcion, por favor: ");
}

function imprimirMenuCalculadora() {
    console.log("-- Calculadora -- \n\n");
    console.log(" 1- Suma (+) \n 2- Resta (-) \n 3- Multiplicación (x) \n 4- División (÷) \
    \n 5- Logaritmo \n 6- Raíz Cuadrada \n 7- Exponencial \
     \n \n 0- Volver \n \n Elija su opcion, por favor: ");
}

function imprimirMenuProductos() {
    console.log("-- Gestión de Productos -- \n\n");
    console.log(" 1- Listar todos los productos por Categoría \n 2- Alta de Producto \n 3- Baja de Producto\
    \n 4- Pedido de Productos \n 5- Entrega de Pedido \n 6- Cancelar Pedido Pendiente \n 7- Listado de Pedidos\
    \n \n 0- Volver \n \n Elija su opcion, por favor: ");
}

//FUNCIONES CALCULADORA

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

// SE DEFINE ARRAY DE PEDIDOS CON SCOPE GLOBAL
const pedidos = [];

//CLASES

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
        console.log("ID: " + this.id + "\nNombre: " + this.nombre + "\nDescripción: " + this.descripcion + "\nCategoría: " +
            this.categoria + "\nPrecio sin IVA: $" + this.precio + "\nPrecio con IVA (23%): $" + this.precioIVA());
    }
    precioIVA() {
        return Math.round(this.precio * 1.23);
    }
}

//CLASE 'PEDIDO' CON CONSTRUCTOR DE OBJETO

class Pedido {
    constructor(id, fecha, hora, productos, cantidadProductos, preciosProductos, precio, entregado) {
        this.id = id;
        this.fecha = fecha;
        this.hora = hora;
        this.productos = productos;
        this.cantidadProductos = cantidadProductos;
        this.preciosProductos = preciosProductos;
        this.precio = precio;
        this.entregado = entregado;
    }

    imprimir() { //SACAR PRODUCTOS
        console.log("======================\n\Pedido ID #" + this.id + "\nFecha: " + this.fecha + "\nHora: " + this.hora);
        imprimirProductosDePedido(this);
        console.log("Subtotal: $" + this.precio + "\nIVA (23%): $" + this.Iva() + "\nTOTAL: $" +
            this.precioIva() + "\n¿Entregado?: " + productoEntregado(this) + "\n======================");
    }
    Iva() {
        return Math.round(this.precio * 0.23);
    }

    precioIva() {
        return Math.round(this.precio * 1.23);
    }
}


//FUNCIONES DE PRODUCTOS Y PEDIDOS

//AGREGAR FECHA A PEDIDO
function fechaActual() {
    const fecha = new Date();
    let dia, mes, ano, fechaDevuelta;
    dia = fecha.getDate();
    mes = (fecha.getMonth() + 1);
    ano = fecha.getFullYear();
    fechaDevuelta = dia + "/" + mes + "/" + ano;
    return fechaDevuelta;
}

function horaActual() {
    const fechaComp = new Date();
    let hora, minuto, horaDevuelta;
    hora = fechaComp.getHours();
    minuto = fechaComp.getMinutes();
    horaDevuelta = hora + ":" + minuto + " hrs.";
    return horaDevuelta;
}

//DEVUELVE 'SI' O 'NO' SI EL PRODUCTO ESTA ENTREGADO O NO, RESPECTIVAMENTE
function productoEntregado(producto) {
    let entregado;
    if (producto.entregado) {
        entregado = "Si";
    }
    else {
        entregado = "No";
    }
    return entregado;
}

//ENCONTRAR PRODUCTO POR ID

function encontrarProductoPorId(idProducto, productos) {
    const productoEncontrado = productos.find(element => element.id === idProducto);
    return productoEncontrado;
}

//IMPRIMIR PRODUCTOS DE PEDIDO
function imprimirProductosDePedido(pedido) {
    let largoArr = Object.keys(pedido.productos).length;
    for (let i = 0; i < largoArr; i++) {
        console.log("Producto: \"" + pedido.productos[i].nombre + "\" | Cantidad: " + pedido.cantidadProductos[i] + " | Precio: $" + pedido.preciosProductos[i]);
    }
}

//AGREGAR PRODUCTO A PEDIDO
function agregarProductoAPedido(pedido, producto, cantidad) {
    let precioProducto, retorno;
    //SI EL PEDIDO TIENE VALOR INICIAL UNDEFINED O SI NO EXISTE AÚN EN LA LISTA, SE AGREGA AL ARRAY
    let indiceProducto = pedido.productos.findIndex(element => element.id == producto.id);
    if (Object.keys(pedido.productos).length == 0 || indiceProducto == -1) {
        pedido.productos.push(producto);
        pedido.cantidadProductos.push(cantidad);
        precioProducto = producto.precio * cantidad;
        pedido.preciosProductos.push(precioProducto);
        retorno = "AGREGADO AL CARRITO: +" + cantidad + " \"" + producto.nombre + "\"";
    }
    else {
        //SI YA EXISTE EN LA LISTA, SE SUMA A LA CANTIDAD YA EXISTENTE Y AL PRECIO PREVIAMENTE ESTABLECIDO
        pedido.cantidadProductos[indiceProducto] += cantidad;
        precioProducto = producto.precio * cantidad;
        pedido.preciosProductos[indiceProducto] += precioProducto;
        retorno = "AGREGADO AL CARRITO: +" + cantidad + " \"" + producto.nombre + "\"";
    }
    return retorno;
}

//LISTA CATEGORÍAS
function imprimirCategorias() {
    console.log("Categorías: \n 1- Meditación\n 2- Ayurveda (Medicina y Cocina)\n 3- Vestimenta Hindú");
}

//FUNCION DE VERIFICACION DE INGRESO DE CATEGORÍA CORRECTA
function ingresarCategoria() {
    let numeroOk = false;
    let numero, opcionElegida;
    while (!numeroOk) {
        numero = parseInt(prompt("Elija la categoría del Producto: \n 1- Meditación\
            \n 2- Ayurveda (Medicina y Cocina)\n 3- Vestimenta Hindú"));
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

//IMPRIME LOS PRODUCTOS POR DETERMINADA CATEGORIA

function imprimirProductosPorCategoría(productos, categoria) {
    let vacio = true;
    console.log("Categoría: " + categoria + "\n");
    for (let x = 0; x < productos.length; x++) {
        if (productos[x].categoria == categoria) {
            /*DESCONOZCO POR QUÉ DEVUELVE "UNDEFINED" AQUÍ
            SI SE EJECUTA EL MÉTODO "imprimir()"" POR FUERA DEL "for", NO DEVUELVE EL MISMO RESULTADO
            DE TODOS MODOS, CREO QUE NO SERÁ PROBLEMA CUANDO LA INTERFAZ SEA WEB EN VEZ DE CONSOLA*/
            console.log(productos[x].imprimir());
            vacio = false;
        }
    }
    if (vacio == true) {
        console.log("\nVACÍA");
    }
}


//BUSCA UN ID LIBRE DE PRODUCTO
function idLibreProducto(productos) {
    let idLibreProducto;
    const ids = [];
    productos.forEach(element => {
        ids.push(element.id);
    });
    idLibreProducto = Math.max(...ids) + 1;
    return idLibreProducto;
}

//BUSCA UN ID LIBRE DE PEDIDO
function idLibrePedido(pedidos) {
    let idLibrePedido;
    let largoArr = Object.keys(pedidos).length;
    if (largoArr == 0) {
        idLibrePedido = 1;
    }
    else {
        const ids = [];
        pedidos.forEach(element => {
            ids.push(element.id);
        });
        idLibrePedido = Math.max(...ids) + 1;
    }
    return idLibrePedido;
}

/*CALCULAR PRECIO DE PEDIDO, TOMA COMO PARÁMETROS UN OBJETO DEL TIPO "PEDIDO",
DEVUELVE EL PRECIO TOTAL SIN IVA. LOS OBJETOS YA CUENTAN CON SUS PROPIOS MÉTODOS PARA CALCULAR SU IVA*/
function calcularPrecioPedido(pedido) {
    let precioPedido = 0;
    for (let i = 0; i < Object.keys(pedido.productos).length; i++) {
        precioPedido += (pedido.productos[i].precio * pedido.cantidadProductos[i]);
    }
    return precioPedido;
}

//PREGUNTAR SI HA FINALIZADO O NO EL PEDIDO (DEVUELVE BOOLEAN)
function preguntarFinalizarPedido(mensaje) {
    let opcionElegida, valorRetorno;
    let opcionOk = false;
    while (!opcionOk) {
        opcionElegida = prompt(mensaje);
        if (opcionElegida == "S" || opcionElegida == "s") {
            valorRetorno = true;
            opcionOk = true;
        }
        else if (opcionElegida == "N" || opcionElegida == "n") {
            valorRetorno = false;
            opcionOk = true;
        }
        else {
            console.log("Opción ingresada NO válida. Pulse \"S\" para CONTINUAR o \"N\" para FINALIZAR el pedido");
        }
    }
    return valorRetorno;
}

//MENU PRINCIPAL
imprimirMenuPrincipal();
const productos = [];
//SE PRE-CARGAN ALGUNOS DATOS PARA EL TESTEO
const prod0 = new Producto(1, "Incienso", "Paquete 10 unidades. Para aromatizar.", "Meditacion", "125");
productos.push(prod0);
const prod2 = new Producto(2, "Cúrcuma", "Paquete 100 gr. Para condimentar-", "Ayurveda (Medicina y Cocina)", "250");
productos.push(prod2);
const prod3 = new Producto(3, "Túnica hindú", "Pieza individual. Ropa típica hindú", "Vestimenta Hindu", "2780");
productos.push(prod3);
const prod4 = new Producto(4, "CD de música relax", "Disco individual. Para estimular relajación", "Meditacion", "470");
productos.push(prod4);
const prod5 = new Producto(5, "Pimienta negra", "Molinillo de 200 gr. Para condimentar", "Ayurveda (Medicina y Cocina)", "365");
productos.push(prod5);
const prod6 = new Producto(6, "Sandalias", "Caja de a par. Calzado típico hindú", "Vestimenta Hindu", "3450");
productos.push(prod6);
let opcionPrincipal = parseInt(prompt("Ingrese su opción (0-Salir):"));
let opcionSecundaria = 0;
if (opcionPrincipal == 0) {
    console.log("Eligió SALIR, hasta la proxima! Pulse F5 para volver a ejecutar...");
}
else {
    while (opcionPrincipal != 0) {
        switch (opcionPrincipal) {
            //CALCULADORA, IMPLEMENTA FUNCIONES ARITMÉTICAS PROPIAS Y DEFINIDAS EN LA CLASE MATH
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
                /*OPCION DE PRODUCTOS (SE IMPLEMENTAN OBJETOS, ARRAYS Y FUNCIONES DE ORDEN SUPERIOR)
                SE USAN ARRAYS DE PRODUCTOS Y PEDIDOS (SE MODIFICAN DURANTE LA EJECUCIÓN).
                EL ARRAY DE CATEGORÍAS ES PREDETERMINADO Y FIJO SOLO POR ESTA ENTREGA*/
                imprimirMenuProductos();
                let encontrado, idProd, nombreProd, descripcionProd, categoriaProd, precioProd, idPedido, pedidoMostrado;
                opcionSecundaria = parseInt(prompt("Ingrese su opción (0-Volver):"));
                while (opcionSecundaria != 0) {
                    switch (opcionSecundaria) {
                        case 1:
                            //LISTADO DE TODOS LOS PRODUCTOS POR CATEGORÍA
                            for (let i = 0; i < 3; i++) {
                                imprimirProductosPorCategoría(productos, categorias[i]);
                            }
                            break;

                        case 2:
                            //ALTA DE PRODUCTO
                            console.log("-- Alta de Producto -- \n");
                            nombreProd = prompt("Ingrese el nombre del producto: ");
                            descripcionProd = prompt("Ingrese una descripción del producto: ");
                            imprimirCategorias();
                            categoriaProd = ingresarCategoria();
                            precioProd = ingresarNumero("Ingrese el precio del producto: ");
                            const prod1 = new Producto(idLibreProducto(productos), nombreProd, descripcionProd, categoriaProd, Math.round(precioProd));
                            productos.push(prod1);
                            console.log("El producto \"" + prod1.nombre + "\" fue creado exitosamente!");
                            break;

                        case 3:
                            //BAJA DE PRODUCTO
                            console.log("-- Baja de Producto -- \n Seleccione el número de la categoría deseada: ");
                            imprimirCategorias();
                            categoriaProd = ingresarCategoria();
                            encontrado = categorias.find(element => element === categoriaProd);
                            if (encontrado === undefined) {
                                console.log("La categoría ingresada está VACÍA");
                            }
                            else {
                                imprimirProductosPorCategoría(productos, categoriaProd);
                                idProd = ingresarNumero("Seleccione el ID del producto que desea ELIMINAR: (0- Volver)");
                                const prodBaja = productos.findIndex(element => element.id == idProd);
                                const objProdBaja = productos.find(element => element.id == idProd);
                                if (prodBaja == -1) {
                                    console.log("ID de producto ingresado NO VÁLIDO");
                                }
                                else {
                                    if (objProdBaja.categoria == categoriaProd) {
                                        productos.splice(prodBaja, 1);
                                        console.log("Producto \"" + objProdBaja.nombre + "\" ELIMINADO");
                                    }
                                    else {
                                        console.log("ID de producto válido, pero NO coincide con la CATEGORÍA");
                                    }
                                }
                            }
                            break;

                        case 4:
                            //PEDIDO DE PRODUCTOS
                            let cantidad;
                            console.log("-- Pedido de Producto -- \n\nSeleccione el número de la categoría del producto deseado: ");
                            const productosPedido = []
                            const cantidadProductos = [];
                            const preciosProductos = [];
                            const pedido1 = new Pedido(1, "07/07/1777", "00:00 hrs.", productosPedido, cantidadProductos, preciosProductos, 0, false);
                            //FLAGS PARA CONTROLAR EL CORRECTO INGRESO Y FLUJO DE LOS PEDIDOS
                            let pedidoFinalizado = false;
                            let pedidoFinalizadoOk = false;
                            while (!pedidoFinalizado) {
                                imprimirCategorias();
                                categoriaProd = ingresarCategoria();
                                encontrado = categorias.find(element => element === categoriaProd);
                                if (encontrado === undefined) {
                                    console.log("La categoría ingresada está VACÍA");
                                }
                                else {
                                    imprimirProductosPorCategoría(productos, categoriaProd);
                                    idProd = ingresarNumero("Seleccione el ID del producto a agregar al PEDIDO: (0- Volver)");
                                    if (idProd != 0) {
                                        const prodAgregar = productos.find(element => element.id == idProd);
                                        if (prodAgregar === undefined) {
                                            console.log("ID de producto ingresado NO VÁLIDO");
                                        }
                                        else {
                                            if (prodAgregar.categoria == categoriaProd) {
                                                //AGREGAR CANTIDAD DEL PRODUCTO
                                                cantidad = ingresarNumero("Ingrese la cantidad de \"" + prodAgregar.nombre + "\" (0- Volver): ");
                                                if (cantidad == 0) {
                                                    console.log("Cancelar Pedido? (S)i / (N)o");
                                                    pedidoFinalizado = preguntarFinalizarPedido("Cancelar Pedido? (S)i / (N)o");
                                                    if (pedidoFinalizado && !pedidoFinalizadoOk){
                                                        console.log ("Pedido CANCELADO. Volviendo...");
                                                    }
                                                }
                                                else {
                                                    let prod1 = encontrarProductoPorId(idProd, productos);
                                                    let resultadoAlta = agregarProductoAPedido(pedido1, prod1, cantidad);
                                                    console.log(resultadoAlta);
                                                    //PREGUNTAR AL USUARIO SI QUIERE FINALIZAR EL PEDIDO O SI SIGUE COMPRANDO
                                                    console.log("¿Finalizar Pedido? (S)i / (N)o");
                                                    pedidoFinalizado = preguntarFinalizarPedido("¿Finalizar Pedido? (S)i / (N)o");
                                                    pedidoFinalizadoOk = true;
                                                }
                                            }
                                            else {
                                                //PREGUNTAR AL USUARIO SI QUIERE CANCELAR EL PEDIDO O SI SIGUE COMPRANDO
                                                console.log("ID de producto válido, pero NO coincide con la CATEGORÍA \
                                                    \n¿Cancelar Pedido? (S)i / (N)o");
                                                pedidoFinalizado = preguntarFinalizarPedido("¿Cancelar Pedido? (S)i / (N)o");
                                                if (pedidoFinalizado && !pedidoFinalizadoOk){
                                                    console.log ("Pedido CANCELADO. Volviendo...");
                                                }
                                            }
                                        }

                                    }
                                }
                                //SI EL PEDIDO FUE FINALIZADO CORRECTAMENTE, TERMINAR DE SETEARLO Y AGREGARLO AL ARRAY DE PEDIDOS
                                if (pedidoFinalizado && pedidoFinalizadoOk) {
                                    pedido1.id = idLibrePedido(pedidos);
                                    pedido1.fecha = fechaActual();
                                    pedido1.hora = horaActual();
                                    pedido1.precio = calcularPrecioPedido(pedido1);
                                    pedidos.push(pedido1);
                                    console.log("El pedido #" + pedido1.id + " fue creado con ÉXITO \nDetalle del Pedido:");
                                    console.log(pedido1.imprimir(productos));
                                }
                            }
                            break;

                        case 5:
                            //ENTREGA DE PEDIDOS
                            console.log("-- Entrega de Pedidos --");
                            //SE VERIFICA SI ARRAY DE PEDIDOS ESTA VACÍO
                            if (pedidos.length < 1) {
                                console.log("No hay pedidos realizados aún.");
                            }
                            else {
                                //SE SELECCIONA EL PEDIDO PARA SER MARCADO COMO 'ENTREGADO'
                                pedidoMostrado = false;
                                for (let i = 0; i < pedidos.length; i++) {
                                    if (!pedidos[i].entregado) {
                                        pedidos[i].imprimir(productos);
                                        pedidoMostrado = true;
                                    }
                                }
                                //SE VERIFICA QUE HAYAN PEDIDOS PARA ENTREGAR
                                if (!pedidoMostrado) {
                                    console.log("No hay pedidos pendientes de entrega.");
                                }
                                else {
                                    idPedido = ingresarNumero("Seleccione el ID del pedido para marcarlo como ENTREGADO (0- Volver): ");
                                    if (idPedido == 0) {
                                        console.log("Acción cancelada, VOLVIENDO...");
                                        break;
                                    }
                                    else {
                                        //VERIFICA QUE EL PEDIDO ESTÉ EN EL ARRAY 'PEDIDOS' Y SI FUE YA ENTREGADO
                                        let indicePedido = pedidos.findIndex(element => element.id == idPedido);
                                        if (indicePedido != -1 && pedidos[idPedido - 1].entregado) {
                                            console.log("Pedido #" + pedidos[idPedido - 1].id + " PREVIAMENTE ENTREGADO!");
                                        }
                                        else if (indicePedido != -1 && !pedidos[idPedido - 1].entregado) {
                                            pedidos[idPedido - 1].entregado = true;
                                            console.log("Pedido #" + pedidos[idPedido - 1].id + " exitosamente ENTREGADO");
                                        }
                                        else {
                                            console.log("Pedido ID #" + idPedido + " NO VÁLIDO")
                                        }
                                    }
                                }
                            }
                            break;

                        case 6:
                            //CANCELAR PEDIDO PENDIENTE DE ENTREGA
                            console.log("-- Cancelar Pedido Pendiente --");
                            //SE VERIFICA SI ARRAY DE PEDIDOS ESTA VACÍO
                            if (pedidos.length < 1) {
                                console.log("No hay pedidos realizados aún.");
                            }
                            else {
                                //SE SELECCIONA EL PEDIDO PARA SER MARCADO COMO 'ENTREGADO'
                                pedidoMostrado = false;
                                for (let i = 0; i < pedidos.length; i++) {
                                    if (!pedidos[i].entregado) {
                                        pedidos[i].imprimir(productos);
                                        pedidoMostrado = true;
                                    }
                                }
                                //SE VERIFICA QUE HAYAN PEDIDOS PARA ENTREGAR
                                if (!pedidoMostrado) {
                                    console.log("No hay pedidos pendientes de entrega.");
                                }
                                else {
                                    idPedido = ingresarNumero("Seleccione el ID del pedido a CANCELAR (0- Volver): ");
                                    if (idPedido == 0) {
                                        console.log("Acción cancelada, VOLVIENDO...");
                                        break;
                                    }
                                    else {
                                        let idProducto = pedidos.findIndex(element => element.id == idPedido);
                                        if (idProducto != -1 && !pedidos[idPedido - 1].entregado) {
                                            pedidos.splice(idPedido - 1, 1);
                                            console.log("Pedido #" + idPedido + " ELIMINADO");
                                        }
                                        else if (idProducto != -1 && pedidos[idPedido - 1].entregado) {
                                            console.log("Pedido #" + pedidos[idPedido - 1].id + " ya ENTREGADO. No puede ser cancelado.");
                                        }
                                        else {
                                            console.log("Pedido ID #" + idPedido + " NO VÁLIDO")
                                        }

                                    }
                                }
                            }
                            break;

                        case 7:
                            //LISTADO DE PEDIDOS
                            console.log("-- Listado de Pedidos --");
                            if (pedidos.length < 1) {
                                console.log("No hay pedidos realizados aún.");
                            }
                            else {
                                //SE MUESTRAN TODOS LOS PEDIDOS
                                for (let i = 0; i < pedidos.length; i++) {
                                    pedidos[i].imprimir(productos);
                                }
                            }
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
                //OPCION DE CALCULO DE PROMEDIO (SE IMPLEMENTAN ARRAYS Y FUNCIONES DE ORDEN SUPERIOR)
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