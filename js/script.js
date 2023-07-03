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
const categorias = ["Meditación", "Ayurveda (Medicina y Cocina)", "Vestimenta Hindú"];

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
    const prod0 = new Producto(1, "Incienso", "Paquete 10 unidades. Para aromatizar.", "Meditación", "125", "../img/incienso.jpg");
    productos.push(prod0);
    const prod2 = new Producto(2, "Cúrcuma", "Paquete 100 gr. Para condimentar-", "Ayurveda (Medicina y Cocina)", "250", "../img/curcuma.jpg");
    productos.push(prod2);
    const prod3 = new Producto(3, "Túnica hindú", "Pieza individual. Ropa típica hindú", "Vestimenta Hindú", "2780", "../img/tunica.jpg");
    productos.push(prod3);
    const prod4 = new Producto(4, "CD de música relax", "Disco individual. Para estimular relajación", "Meditación", "470", "../img/cdmusica.jpg");
    productos.push(prod4);
    const prod5 = new Producto(5, "Pimienta negra", "Molinillo de 200 gr. Para condimentar", "Ayurveda (Medicina y Cocina)", "365", "../img/pimientanegra.jpg");
    productos.push(prod5);
    const prod6 = new Producto(6, "Sandalias", "Caja de a par. Calzado típico hindú", "Vestimenta Hindú", "3450", "../img/sandalias.jpg");
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
    categorias.forEach(el1 => {
        const divCategoria = document.createElement("div");
        divCategoria.classList.add("divCategoria");
        divCategoria.innerHTML = `<h2 id="h2Categ">Categoría: "${el1}": </h2>`
        productosDiv.appendChild(divCategoria);
        productos.forEach(el => {
            if (el.categoria == el1) {
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
        }
        )
    })
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

//DOM - ASOCIAMOS LOS ELEMENTOS HTML A OBJETOS JS
let productosDiv = document.getElementById("productosDiv");

//DOM - EVENTOS JS ASOCIADOS A LOS OBJETOS ANTERIORES

//
/*prodAgregar.addEventListener("click", () => {

})*/


const arhivoHTML = location.href.split("/").slice(-1);
console.log(arhivoHTML);
if (arhivoHTML == "verProductos.html") {
    mostrarProductos(productosDiv);
}