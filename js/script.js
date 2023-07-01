//*ARCHIVO JS DE PRE-ENTREGA 3 - JOAQUIN KULIK

//CLASES

//CLASE 'PRODUCTO' CON CONSTRUCTOR DE OBJETO

class Producto {
    constructor(id, nombre, descripcion, categoria, precio, imgURL) {
        this.id = id;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.categoria = categoria;
        this.precio = precio;
        this.imgURL = imgURL;
    }
    imprimir() {
        console.log("======================\nProducto ID #" + this.id + "\nNombre: " + this.nombre + "\nDescripción: " +
            this.descripcion + "\nCategoría: " + this.categoria + "\nPrecio sin IVA: $" +
            this.precio + "\nPrecio con IVA (23%): $" + this.precioIVA() + "\n======================");
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

    imprimir() {
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

// SE DEFINEN CATEGORÍAS DE PRODUCTOS EN UN ARRAY
const categorias = ["Meditacion", "Ayurveda (Medicina y Cocina)", "Vestimenta Hindu"];

// SE DEFINE ARRAY DE PEDIDOS CON SCOPE GLOBAL
const pedidosLoad = JSON.parse(localStorage.getItem("pedidos")) || [];
const pedidos = convertirPedidos(pedidosLoad);
const productosPedido = JSON.parse(localStorage.getItem("productosPedido")) || [];
const cantidadProductos = JSON.parse(localStorage.getItem("cantidadProductos")) || [];
const preciosProductos = JSON.parse(localStorage.getItem("preciosProductos")) || [];
const productosLoad = JSON.parse(localStorage.getItem("productos")) || [];
const productos = [];
if (productosLoad.length < 1) {
    //SE PRE-CARGAN ALGUNOS DATOS PARA EL TESTEO
    const prod0 = new Producto(1, "Incienso", "Paquete 10 unidades. Para aromatizar.", "Meditacion", "125", "./img/incienso.jpg");
    productos.push(prod0);
    const prod2 = new Producto(2, "Cúrcuma", "Paquete 100 gr. Para condimentar-", "Ayurveda (Medicina y Cocina)", "250", "./img/curcuma.jpg");
    productos.push(prod2);
    const prod3 = new Producto(3, "Túnica hindú", "Pieza individual. Ropa típica hindú", "Vestimenta Hindu", "2780", "./img/tunica.jpg");
    productos.push(prod3);
    const prod4 = new Producto(4, "CD de música relax", "Disco individual. Para estimular relajación", "Meditacion", "470", "./img/cdmusica.jpg");
    productos.push(prod4);
    const prod5 = new Producto(5, "Pimienta negra", "Molinillo de 200 gr. Para condimentar", "Ayurveda (Medicina y Cocina)", "365", "./img/pimientanegra.jpg");
    productos.push(prod5);
    const prod6 = new Producto(6, "Sandalias", "Caja de a par. Calzado típico hindú", "Vestimenta Hindu", "3450", " ./img/sandalias.jpg");
    productos.push(prod6);
    localStorage.setItem("productos", JSON.stringify(productos));
} else {
    //SE CONVIERTEN LOS OBJETOS GENÉRICOS DEL LOCALSTORAGE A OBJETOS DEL TIPO 'PRODUCTOS'
    for (let i = 0; i < productosLoad.length; i++) {
        let pr1 = new Producto(productosLoad[i].id, productosLoad[i].nombre, productosLoad[i].descripcion,
            productosLoad[i].categoria, productosLoad[i].precio, productosLoad[i].imgURL);
        productos[i] = pr1;
    }
}

//FUNCIONES DE PRODUCTOS Y PEDIDOS

function mostrarProductos(productosDiv) {
    productosDiv.innerHTML = '';
    productos.forEach(el => {
        const tarjetaProd = document.createElement("div");
        tarjetaProd.classList.add("tarjetaProd");
        tarjetaProd.innerHTML = ` 
        <h2 id="prodTitulo">${el.nombre}</h2>
        <img class="tarjetaProdImg" src="${el.imgURL}" alt="Imagen de ${el.nombre}">
        <p id="prodDesc">${el.descripcion}</p>
        <p id="prodPrecio">Precio:  $${el.precio}</p>
        <p id="prodIva">IVA (23%):  $${Math.round(el.precio * 0.23)}</p>
        <p id="prodPrecioTotal">Precio total:  $${el.precioIVA()}</p>
        `
        productosDiv.appendChild(tarjetaProd);
    }
    )
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

//CONVERTIR ARRAY DE PEDIDOS DESDE LOCALSTORAGE A OBJETOS DEL TIPO 'PEDIDO'
function convertirPedidos(pedidosInput) {
    let pedidos = [];
    let productosPedido = [];
    if (pedidosInput.length > 0) {
        for (let i = 0; i < pedidosLoad.length; i++) {
            //HAY UN ARRAY DE PRODUCTOS EN CADA PEDIDO, LO CONVERTIMOS A OBJETOS DEL TIPO 'PRODUCTO'
            for (let z = 0; z < pedidosLoad[i].productos.length; z++) {
                productosPedido[z] = convertirProducto(pedidosLoad[i].productos[z]);
            }
            let p1 = new Pedido(pedidosLoad[i].id, pedidosLoad[i].fecha, pedidosLoad[i].hora, productosPedido,
                pedidosLoad[i].cantidadProductos, pedidosLoad[i].preciosProductos, pedidosLoad[i].precio,
                pedidosLoad[i].entregado);
            pedidos[i] = p1;
        }
    }
    return pedidos;
}

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

//CONVERTIR OBJETO GENÉRICO DESDE LOCALSTORAGE A OBJETO DEL TIPO 'PRODUCTO'
function convertirProducto(productoInput) {
    return new Producto(productoInput.id, productoInput.nombre, productoInput.descripcion, productoInput.categoria, productoInput.precio);
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
        numero = parseInt(prompt("Elija la categoría del Producto (1-3) que desea agregar al CARRITO: \n 1- Meditación\
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
    console.log("CATEGORÍA: " + categoria + "\n");
    for (let x = 0; x < productos.length; x++) {
        if (productos[x].categoria == categoria) {
            productos[x].imprimir();
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

//MENU PRINCIPAL DEL PROGRAMA


//DOM - ASOCIAMOS LOS ELEMENTOS HTML A OBJETOS JS
let productosDiv = document.getElementById("productosDiv");

//DOM - EVENTOS JS ASOCIADOS A LOS OBJETOS ANTERIORES

//
/*prodAgregar.addEventListener("click", () => {

})*/
mostrarProductos(productosDiv);
/*
imprimirMenuProductos();
let encontrado, idProd, nombreProd, descripcionProd, categoriaProd, precioProd, idPedido, pedidoMostrado;
opcionPrincipal = parseInt(prompt("Ingrese su opción (0-Salir):"));
while (opcionPrincipal != 0) {
    switch (opcionPrincipal) {
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
            localStorage.setItem("productos", JSON.stringify(productos));
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
                        localStorage.setItem("productos", JSON.stringify(productos));
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
            const pedido1 = new Pedido(1, "07/07/1777", "00:00 hrs.", [], [], [], 0, false);
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
                                    if (pedidoFinalizado && !pedidoFinalizadoOk) {
                                        console.log("Pedido CANCELADO. Volviendo...");
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
                                if (pedidoFinalizado && !pedidoFinalizadoOk) {
                                    console.log("Pedido CANCELADO. Volviendo...");
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
                    localStorage.setItem("pedidos", JSON.stringify(pedidos));
                    console.log("El pedido #" + pedido1.id + " fue creado con ÉXITO \nDetalle del Pedido:");
                    pedido1.imprimir();
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
                            localStorage.setItem("pedidos", JSON.stringify(pedidos));
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
                            localStorage.setItem("pedidos", JSON.stringify(pedidos));
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
    opcionPrincipal = parseInt(prompt("Ingrese su opción (0-Salir):"));
    if (opcionPrincipal == 0) {
        console.log("Eligió SALIR, hasta la próxima! Pulse F5 para volver a ejecutar...");
    }
}
*/