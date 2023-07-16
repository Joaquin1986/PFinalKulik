//ARCHIVO DE ALMACENAMIENTO, DONDE ESTAN LOS ARRAYS Y SE CONVIERTEN LOS OBJETOS
import {
    Pedido,
    Producto
} from './clases.js';

import {
    horaActual,
    fechaActual
} from './utils.js'

export let pedido = new Pedido();

export const arhivoHTML = location.href.split("/").slice(-1);

// SE DEFINEN ARRAYS GENERALES DE LA APP
export const categorias = JSON.parse(localStorage.getItem("categorias")) || ["Meditación", "Ayurveda (Medicina y Cocina)", "Vestimenta Hindú"];
export const productos = [];
const pedidosLoad = JSON.parse(localStorage.getItem("pedidos")) || [];
export const pedidos = convertirPedidos(pedidosLoad);

export function cargaAlmacenamiento() {
    // SE DEFINE ARRAY DE PEDIDOS CON SCOPE GLOBAL

    const productosPedido = JSON.parse(localStorage.getItem("productosPedido")) || [];
    const cantidadProductos = JSON.parse(localStorage.getItem("cantidadProductos")) || [];
    const preciosProductos = JSON.parse(localStorage.getItem("preciosProductos")) || [];
    const productosLoad = JSON.parse(localStorage.getItem("productos")) || [];

    if (productosLoad.length < 1) {
        //SE PRE-CARGAN ALGUNOS DATOS PARA EL TESTEO
        const prod0 = new Producto(1, "Incienso", "Paquete 10 unidades. Para aromatizar.", "Meditación", "125", "../img/incienso.jpg");
        productos.push(prod0);
        const prod2 = new Producto(2, "Cúrcuma", "Paquete 100 gr. Para condimentar-", "Ayurveda (Medicina y Cocina)", "250", "../img/curcuma.jpg");
        productos.push(prod2);
        const prod3 = new Producto(3, "Túnica Hindú", "Pieza individual. Ropa típica hindú", "Vestimenta Hindú", "2780", "../img/tunica.jpg");
        productos.push(prod3);
        const prod4 = new Producto(4, "CD Música Relax", "Disco individual. Para estimular relajación", "Meditación", "470", "../img/cdmusica.jpg");
        productos.push(prod4);
        const prod5 = new Producto(5, "Pimienta Negra", "Molinillo de 200 gr. Para condimentar", "Ayurveda (Medicina y Cocina)", "365", "../img/pimientanegra.jpg");
        productos.push(prod5);
        const prod6 = new Producto(6, "Sandalias", "Caja de a par. Calzado típico hindú", "Vestimenta Hindú", "3450", "../img/sandalias.jpg");
        productos.push(prod6);
        const prod7 = new Producto(7, "Libro de Yoga", "Suami Vishnu - Devananda", "Meditación", "1420", "../img/libroyoga.jpg");
        productos.push(prod7);
        const prod8 = new Producto(8, "Ghee", "En presentación de 500ml", "Ayurveda (Medicina y Cocina)", "674", "../img/ghee.jpg");
        productos.push(prod8);
        const prod9 = new Producto(9, "Collar Lakshmi", "Material en Oro", "Vestimenta Hindú", "12750", "../img/collarlakshmi.png");
        productos.push(prod9);
        localStorage.setItem("productos", JSON.stringify(productos));
    } else {
        //SE CONVIERTEN LOS OBJETOS GENÉRICOS DEL LOCALSTORAGE A OBJETOS DEL TIPO 'PRODUCTOS'
        for (let i = 0; i < productosLoad.length; i++) {
            let pr1 = new Producto(productosLoad[i].id, productosLoad[i].nombre, productosLoad[i].descripcion,
                productosLoad[i].categoria, productosLoad[i].precio, productosLoad[i].imgURL);
            productos[i] = pr1;
        }
    }

    //SE OBTIENE PEDIDO GUARDADO, EN CASO DE HABER ALGUNO
    const pedidoLoad = JSON.parse(localStorage.getItem("pedido")) || "";
    if (pedidoLoad) {
        pedido = new Pedido(pedidoLoad.id, pedidoLoad.fecha, pedidoLoad.hora, convertirProductos(pedidoLoad.productos),
            pedidoLoad.cantidadProductos, pedidoLoad.preciosProductos, pedidoLoad.precio, pedidoLoad.entregado);
    }
    else {
        pedido = new Pedido(idLibrePedido(pedidos), fechaActual(), horaActual(), productosPedido, cantidadProductos,
            preciosProductos, 0, false);
    }
}

//CONVERTIR ARRAY DE PEDIDOS DESDE LOCALSTORAGE A OBJETOS DEL TIPO 'PEDIDO'
function convertirPedidos(pedidosInput) {
    let pedidosReturn = [];
    let productosPedido = [];
    if (pedidosInput.length > 0) {
        //SE RECORRE EL ARRAY INPUT DE PEDIDOS SI NO ESTÁ VACÍO
        for (let i = 0; i < pedidosInput.length; i++) {
            //HAY UN ARRAY DE PRODUCTOS EN CADA PEDIDO, LO CONVERTIMOS A OBJETOS DEL TIPO 'PRODUCTO'
            for (let z = 0; z < pedidosInput[i].productos.length; z++) {
                productosPedido[z] = convertirProducto(pedidosInput[i].productos[z]);

            }
            const p1 = new Pedido(pedidosInput[i].id, pedidosInput[i].fecha, pedidosInput[i].hora, productosPedido,
                pedidosInput[i].cantidadProductos, pedidosInput[i].preciosProductos, pedidosInput[i].precio,
                pedidosInput[i].entregado);
            pedidosReturn[i] = p1;
            productosPedido = [];
        }
    }
    return pedidosReturn;
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

//FUNCIÓN DE CONVERSIÓN DE ARRAY GENÉRICO A PRODUCTOS
function convertirProductos(inputProductos) {
    let productos = [];
    let cont = 0;
    inputProductos.forEach(e => {
        productos[cont] = convertirProducto(e);
        cont++;
    });
    return productos;
}

//CONVERTIR OBJETO GENÉRICO DESDE LOCALSTORAGE A OBJETO DEL TIPO 'PRODUCTO'
function convertirProducto(productoInput) {
    return new Producto(productoInput.id, productoInput.nombre, productoInput.descripcion, productoInput.categoria, productoInput.precio, productoInput.imgURL);
}