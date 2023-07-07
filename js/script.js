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
    Iva() {
        return Math.round(this.precio * 0.23);
    }

    precioIva() {
        return Math.round(this.precio * 1.23);
    }

    cantidadDe(Producto) {
        let indiceProd;
        //SE BUSCA EL INDICE DEL PRODUCTO
        for (let i = 0; i < this.productos.length; i++) {
            if (Producto.id == this.productos[i].id) {
                indiceProd = i;
            }
        }
        //SE DEVUELVE LA CANTIDAD DE PRODUCTOS CON ESE MISMO INDICE
        return parseInt(this.cantidadProductos[indiceProd]);
    }

    esVacio() {
        //SE DEVUELVE TRUE SI EL PEDIDO NO TIENE PRODUCTOS AGREGADOS O FALSE EN CASO CONTRARIO
        let esVacio;
        const suma = this.cantidadProductos.reduce(
            (acumulador, valorActual) => acumulador + valorActual, 0
        );
        if (suma < 1) {
            esVacio = true;
        } else {
            esVacio = false;
        }
        return esVacio;
    }

    detalle() {
        //DEVUELVE UNA CADENA O STRING PARA PASARLE AL SWEET ALERT EL DETALLE DEL PEDIDO
        let detallePedido = "";
        for (let i = 0; i < this.productos.length; i++) {
            detallePedido = detallePedido + this.productos[i].nombre + " | Cantidad: " +
                this.cantidadProductos[i] + " | Precio: $" + this.preciosProductos[i] + "<br>";
        }
        return detallePedido;
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
    const prod8 = new Producto(8, "Ghee", "En presentación de 500ml", "Ayurveda (Medicina y Cocina)", "674", "../img/ghee.webp");
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
let pedido = new Pedido();
if (pedidoLoad) {
    pedido = new Pedido(pedidoLoad.id, pedidoLoad.fecha, pedidoLoad.hora, pedidoLoad.productos,
        pedidoLoad.cantidadProductos, pedidoLoad.preciosProductos, pedidoLoad.precio, pedidoLoad.entregado);
}
else {
    pedido = new Pedido(idLibrePedido(pedidos), fechaActual(), horaActual(), productosPedido, cantidadProductos,
        preciosProductos, 0, false);
}

//FUNCIONES DE PRODUCTOS Y PEDIDOS

function borrarProductoConfirmacion(mensaje) {
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
            alert("Opción ingresada NO válida. Pulse \"S\" para BORRAR EL PRODUCTO o \"N\" para CANCELAR la acción");
        }
    }
    return valorRetorno;
}

//SE VALIDA FORMULARIO DE ALTA
function validarFormAltaTexto(formInputs) {
    let valido = true;
    for (let i = 0; i < formInputs.length; i++) {
        if (!formInputs[i].value) {
            valido = false;
        }
    }
    return valido;
}

function validarFormAltaNumber(formInputs) {
    let valido = true;
    if (!parseInt(formInputs[2].value)) {
        valido = false;
    }
    return valido;
}

//FUNCION QUE MUESTRA LOS PRODUCTOS DE ACUERDO AL SITIO EN EL QUE ES CARGADO (ARCHIVO HTML)

function mostrarProductos(productosDiv, arhivoHTML) {
    productosDiv.innerHTML = '';
    categorias.forEach(el1 => {
        const divCategoria = document.createElement("div");
        divCategoria.classList.add("divCategoria");
        divCategoria.innerHTML = `<h2 id="h2Categ">Categoría: "${el1}" </h2>`
        productosDiv.appendChild(divCategoria);
        productos.forEach(el => {
            if (el.categoria == el1) {

                const tarjetaProd = document.createElement("div");
                tarjetaProd.classList.add("tarjetaProd");
                tarjetaProd.innerHTML = ` 
                <h2 id="prodTitulo">${el.nombre}:#${el.id}</h2>
                <img class="tarjetaProdImg" src="${el.imgURL}" alt="Imagen de ${el.nombre}">
                <p id="prodDesc">${el.descripcion}<br>Precio:  $${el.precio}<br>
                IVA (23%):  $${Math.round(el.precio * 0.23)}<br>
                Precio total:  $${el.precioIVA()}
                `;
                if (arhivoHTML == "verProductos.html") {
                    tarjetaProd.innerHTML = tarjetaProd.innerHTML + `</p>`;
                }
                else if (arhivoHTML == "bajaProducto.html") {
                    tarjetaProd.innerHTML = tarjetaProd.innerHTML + `
                    <button class="bajaBtn btn btn-primary" type="submit">Borrar Producto</button></p>
                    `;
                }
                else if (arhivoHTML == "realizarPedido.html" && pedido.cantidadDe(el)) {
                    //SE BUSCA EL NUMERO DE INDICE DEL PRODUCTO

                    tarjetaProd.innerHTML = tarjetaProd.innerHTML + `
                    <p id="prodCant">Cantidad: ${pedido.cantidadDe(el)}</p>
                    <button class="agregarBtn btn btn-primary" id="agregarBtn" type="submit">Agregar</button>
                    <button class="quitarBtn btn btn-primary" type="submit">Quitar</button></p>
                    `;
                }
                else {
                    tarjetaProd.innerHTML = tarjetaProd.innerHTML + `
                    <p id="prodCant">Cantidad: 0</p>
                    <button class="agregarBtn btn btn-primary" id="agregarBtn" type="submit">Agregar</button>
                    <button class="quitarBtn btn btn-primary" type="submit">Quitar</button></p>
                    `;
                }
                productosDiv.appendChild(tarjetaProd);
            }
        }
        )
    })
}

//FUNCION QUE MUESTRA LOS PEDIDOS
function mostrarPedidos(productosDiv, arhivoHTML) {
    productosDiv.innerHTML = '<h1 id="h1VerPedidos">Listado de Pedidos</h1>';
    pedidos.forEach(el1 => {
        const tarjetaPedido = document.createElement("div");
        tarjetaPedido.classList.add("pedidosDiv");
        tarjetaPedido.innerHTML = `<h2 class="h2Pedido">Pedido #"${el1.id}:"</h2><p><br>${el1.detalle()}------------------<br>Subtotal: $${el1.precio}
                <br>IVA(23%): $${Math.round(el1.Iva())}<br>TOTAL: $${Math.round(el1.precio * 1.23)}<br>------------------</p>`;
        productosDiv.appendChild(tarjetaPedido);
    })
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
    return convertirProducto(productoEncontrado);
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
        pedido.precio = calcularPrecioPedido(pedido);
        retorno = "agrega";
    }
    else {
        //SI YA EXISTE EN LA LISTA, SE SUMA A LA CANTIDAD YA EXISTENTE Y AL PRECIO PREVIAMENTE ESTABLECIDO
        pedido.cantidadProductos[indiceProducto] += cantidad;
        precioProducto = producto.precio * cantidad;
        pedido.preciosProductos[indiceProducto] += precioProducto;
        pedido.precio = calcularPrecioPedido(pedido);
        retorno = "suma";
    }
    return retorno;
}



//QUITAR PRODUCTO DE PEDIDO
function quitarProductoDePedido(pedido, producto) {
    let precioProducto, retorno;
    //SI EL PEDIDO TIENE VALOR INICIAL UNDEFINED O SI NO EXISTE AÚN EN LA LISTA, SE AGREGA AL ARRAY
    let indiceProducto = pedido.productos.findIndex(element => element.id == producto.id);
    if (Object.keys(pedido.productos).length == 0 || indiceProducto == -1) {
        retorno = "nada";
    }

    else {
        //SI YA EXISTE EN LA LISTA Y HAY MAS DE UNO, SE RESTA
        if (pedido.cantidadProductos[indiceProducto] > 1) {
            pedido.cantidadProductos[indiceProducto] -= 1;
            pedido.precio = calcularPrecioPedido(pedido);
            retorno = "resta";
        }
        else if (pedido.cantidadProductos[indiceProducto] == 1) {
            //SI QUEDA UN ÚNICO PRODUCTO, SE QUITA DEL PEDIDO
            pedido.productos.splice(indiceProducto, 1);
            pedido.cantidadProductos.splice(indiceProducto, 1);
            pedido.preciosProductos.splice(indiceProducto, 1);
            pedido.precio = calcularPrecioPedido(pedido);
            retorno = "quita";
        }
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

//SE CARGA LISTER PARA LA CESTA DEL NAV

function cestaNav(arhivoHTML) {
    const btnArriba2 = document.getElementById("cestaBtnNav");
    btnArriba2.addEventListener("click", () => {
        if (!pedido.esVacio()) {
            Swal.fire({
                icon: 'info',
                title: 'Cesta de Compra',
                html: `Cesta de Compra:<br>${pedido.detalle()}------------------<br>Subtotal: $${pedido.precio}
            <br>IVA(23%): $${Math.round(pedido.Iva())}<br>TOTAL: $${Math.round(pedido.precio * 1.23)}<br>------------------`,
            });
        } else {
            let rutaStr = "";
            if (arhivoHTML == "index.html") {
                rutaStr = "La Cesta de Compra está VACÍA<br><a href=./pages/realizarPedido.html>Click aquí para comprar</a>";
            } else {
                rutaStr = "La Cesta de Compra está VACÍA<br><a href=./realizarPedido.html>Click aquí para comprar</a>";
            }
            Swal.fire({
                icon: 'info',
                title: 'Cesta de Compra',
                html: `${rutaStr}`,
            });
        }
    });
    const btnBuscar = document.getElementById("btnEnviar");
    btnBuscar.addEventListener("click", () => {
        Swal.fire({
            icon: 'info',
            title: 'Funcionalidad de Búsqueda',
            text: 'Se implementará próximamente esta funcionalidad',
        });
    });
}

//SE CARGA LISTENER PARA LOS BOTONES DEL COSTADO
function panelCostado() {
    const btnArriba = document.getElementById("cestaBtn");
    btnArriba.addEventListener("click", () => {
        if (!pedido.esVacio()) {
            Swal.fire({
                icon: 'info',
                title: 'Cesta de Compra',
                html: `Cesta de Compra:<br>${pedido.detalle()}------------------<br>Subtotal: $${pedido.precio}
            <br>IVA(23%): $${Math.round(pedido.Iva())}<br>TOTAL: $${Math.round(pedido.precio * 1.23)}<br>------------------`,
            });
        } else {
            Swal.fire({
                icon: 'info',
                title: 'Cesta de Compra',
                html: `Tu Cesta de Compra está VACÍA<br><a href="./realizarPedido.html">Click aquí para comprar</a>`,
            });
        }
    });
    const btnWhatsapp = document.getElementById("whatsappBtn");
    btnWhatsapp.addEventListener("click", () => {
        Swal.fire({
            icon: 'info',
            title: 'Funcionalidad Whatsapp',
            text: 'Se implementará próximamente esta funcionalidad',
        });
    });
}


//DOM - ASOCIAMOS LOS ELEMENTOS HTML A OBJETOS JS
let productosDiv = document.getElementById("productosDiv");

//VERIFICAMOS EL ARCHIVO HTML DESDE EL CUAL SE EJECUTA EL JS PARA SEGUIR EL FLUJO CORRESPONDIENTE
const arhivoHTML = location.href.split("/").slice(-1);
//INDEX
if (arhivoHTML == "index.html") {
    cestaNav(arhivoHTML);
}
//VER PRODUCTOS
else if (arhivoHTML == "verProductos.html") {
    cestaNav(arhivoHTML);
    panelCostado();
    mostrarProductos(productosDiv, arhivoHTML);
}

//BAJA DE PRODUCTO

else if (arhivoHTML == "bajaProducto.html") {
    cestaNav(arhivoHTML);
    panelCostado(arhivoHTML);
    mostrarProductos(productosDiv, arhivoHTML);
    let productosBajaBtn = document.getElementsByClassName("btn");
    for (let i = 0; i < productosBajaBtn.length; i++) {
        productosBajaBtn[i].addEventListener("click", () => {
            //EXTRAEMOS EL DIV DEL ELEMENTO PADRE PARA CONOCER EL ID DEL PRODUCTO A BORRAR
            const idProdDiv = productosBajaBtn[i].parentElement;
            let idProdDivStr = idProdDiv.querySelector("#prodTitulo");
            idProdDivStr = idProdDivStr.innerHTML.split("#").slice(1, 2);
            const idProd = parseInt((idProdDivStr[0].slice(0, Infinity)));
            let prodObj = encontrarProductoPorId(idProd, productos);
            //PEDIMOS CONFIRMACIÓN PARA BORRAR EL PRODUCTO
            Swal.fire({
                title: `Seguro que desea BORRAR ${prodObj.nombre}?`,
                text: "Luego de eliminado, el producto puede ser creado nuevamente de todos modos (Alta de Producto)",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#2ab41d',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sí, BORRARLO'
            }).then((result) => {
                if (result.isConfirmed) {
                    productos.splice(productos.findIndex(element => element.id == idProd), 1);
                    localStorage.setItem("productos", JSON.stringify(productos));
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto BORRADO!',
                        text: `"${prodObj.nombre}"`
                    }).then(function () {
                        location.reload();
                    });
                }
            })
        })
    }
}
//ALTA DE PRODUCTO
else if (arhivoHTML == "altaProducto.html") {
    cestaNav(arhivoHTML);
    let productoAltaBtn = document.getElementById("btnAltaProd");
    productoAltaBtn.addEventListener("click", () => {
        const divForm = document.querySelectorAll(".form-control");
        const catProducto = document.getElementById("categProducto");
        if (validarFormAltaTexto(divForm)) {
            //SE VALIDA QUE EL PRECIO NO SEA NAN
            if (validarFormAltaNumber(divForm)) {
                //SE EJECUTA EL ALTA TRAS VALIDAR QUE NO HAYAN INPUTS EN BLANCO
                const prod1 = new Producto(idLibreProducto(productos), divForm[0].value, divForm[1].value,
                    catProducto.value, divForm[2].value, divForm[3].value);
                productos.push(prod1);
                localStorage.setItem("productos", JSON.stringify(productos));
                Swal.fire({
                    icon: 'success',
                    title: 'Producto Creado',
                    text: `El producto "${prod1.nombre}" ha sido realizado con ÉXITO!`,
                }).then(function () {
                    location.reload();
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error: Formulario inválido',
                    text: `El precio ingresado no es válido, ingrese un número por favor`,
                })
            }
        }
        else {
            //NO SE VALIDO EL FORM
            Swal.fire({
                icon: 'error',
                title: 'Error: Formulario inválido',
                text: `Revise los datos ingresados por favor, hay campos vacíos`,
            })
        }
    })
}

//VER PEDIDOS HTML
else if (arhivoHTML == "verPedidos.html") {
    const pedidosDiv = document.getElementById("pedidosDiv");
    cestaNav(arhivoHTML);
    panelCostado();
    mostrarPedidos(pedidosDiv, arhivoHTML);
}

//REALIZAR PEDIDO HTML
else if (arhivoHTML == "realizarPedido.html") {
    cestaNav(arhivoHTML);
    panelCostado();
    mostrarProductos(productosDiv, arhivoHTML, pedido);
    let productosAgregarBtn = document.getElementsByClassName("btn");
    for (let i = 0; i < productosAgregarBtn.length; i++) {
        productosAgregarBtn[i].addEventListener("click", () => {
            let prodObj;
            const btnValor = productosAgregarBtn[i].innerHTML.split(">").slice(-1);
            if ((btnValor == "Quitar") || (btnValor == "Agregar")) {
                const idProdDiv = productosAgregarBtn[i].parentElement;
                let idProdDivStr = idProdDiv.querySelector("#prodTitulo");
                const prodCant = idProdDiv.querySelector("#prodCant");
                idProdDivStr = idProdDivStr.innerHTML.split("#").slice(1, 2);
                let prodCantNumber = parseInt(prodCant.innerHTML.split(": ").slice(1, 2));
                idProd = parseInt((idProdDivStr[0].slice(0, 1)));
                //SE BUSCA EL PRODUCTO POR SU ID Y SE AGREGA AL PEDIDO
                prodObj = encontrarProductoPorId(idProd, productos);
                if (btnValor == "Quitar") {
                    //SE QUITA PRODUCTO DEL PEDIDO ACTUAL 
                    const resultado = quitarProductoDePedido(pedido, prodObj);
                    localStorage.setItem("pedido", JSON.stringify(pedido));
                    if (resultado != "nada") {
                        prodCant.innerText = "Cantidad: " + (prodCantNumber - 1);
                        Toastify({
                            text: `Cantidad -1 de ${prodObj.nombre}`,
                            duration: 2000,
                            newWindow: true,
                            gravity: "bottom",
                            position: "right",
                            stopOnFocus: true,
                            style: {
                                background: "linear-gradient(to right, #9c1706, #ff1e00)",
                            },
                            // onClick: function(){} // Callback after click
                        }).showToast();
                    }
                    else {
                        Toastify({
                            text: `No hay ${prodObj.nombre} en el carrito`,
                            duration: 1000,
                            newWindow: true,
                            gravity: "bottom",
                            position: "right",
                            stopOnFocus: true,
                            style: {
                                background: "linear-gradient(to right, #9c1706, #ff1e00)",
                            },
                            // onClick: function(){} // Callback after click
                        }).showToast();
                    }
                }
                else if (btnValor == "Agregar") {
                    //SE AGREGA EL PRODUCTO AL PEDIDO ACTUAL
                    agregarProductoAPedido(pedido, prodObj, 1);
                    localStorage.setItem("pedido", JSON.stringify(pedido));
                    prodCant.innerText = "Cantidad: " + (prodCantNumber + 1);
                    Toastify({
                        text: `Cantidad +1 de ${prodObj.nombre}`,
                        duration: 1000,
                        newWindow: true,
                        gravity: "bottom",
                        position: "right",
                        stopOnFocus: true,
                        style: {
                            background: "linear-gradient(to right, #0b8300, #15ff00)",
                        },
                        // onClick: function(){} // Callback after click
                    }).showToast();
                }

            }
            else if ((btnValor == "Finalizar Pedido")) {
                //SE TERMINA DE ARMAR EL OBJETO PEDIDO Y SE AGREGA AL ARRAY Y AL LOCALSTORAGE
                if (!pedido.esVacio()) {
                    pedido.fecha = fechaActual();
                    pedido.hora = horaActual();
                    pedido.precio = calcularPrecioPedido(pedido);
                    pedidos.push(pedido);
                    localStorage.setItem("pedidos", JSON.stringify(pedidos));
                    //SE LIMPIA EL PEDIDO ACTUAL PARA COMENZAR UNO NUEVO
                    delete pedido;
                    localStorage.removeItem("pedido");
                    Swal.fire({
                        icon: 'success',
                        title: 'Pedido Realizado',
                        html: `Su pedido #${pedido.id} ha sido realizado con ÉXITO!<br>Detalle:<br>${pedido.detalle()}<br>Subtotal: $${pedido.precio}
                        <br>IVA(23%): $${Math.round(pedido.Iva())}<br>TOTAL: $${Math.round(pedido.precio * 1.23)}`,
                    }).then(function () {
                        location.reload();
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error: Pedido Vacío',
                        text: 'El Pedido no se puede realizar, dado que está VACÍO',
                    });
                }
            }
            else {
                //SE LIMPIA EL PEDIDO ACTUAL PARA COMENZAR UNO NUEVO
                const pedidoVacio = pedido.esVacio();
                if (!pedidoVacio) {
                    delete pedido;
                    localStorage.removeItem("pedido");
                    Swal.fire({
                        icon: 'success',
                        title: 'Pedido Cancelado',
                        text: 'Se ha CANCELADO el Pedido',
                    }).then(function () {
                        location.reload();
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error: Pedido VACÍO',
                        text: 'Pedido VACÍO, no es posible CANCELARLO',
                    })
                }
            }
        })
    }
}
