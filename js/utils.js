import { Producto } from "./clases.js   ";
import { pedido, productos } from "./almacenamiento.js";

//FUNCIONES DEDICADAS A LOS PRODUCTOS DE LA APP

export function cantProdsCesta(pedido) {
    const pCantProds = document.getElementById("cantProductos");
    let totalProds = 0;
    pedido.cantidadProductos.forEach(cantProd => {
        totalProds += cantProd;
    });
    pCantProds.innerText = "" + totalProds;
}

export function cestaNav(arhivoHTML, pedido, pedidos) {
    const btnArriba2 = document.getElementById("cestaBtnNav");
    let rutaStr = "";
    btnArriba2.addEventListener("click", () => {
        if (!pedido.esVacio()) {
            if (arhivoHTML == "index.html") {
                Swal.fire({
                    icon: 'info',
                    title: 'Cesta de Compra',
                    showCancelButton: true,
                    confirmButtonColor: '#12a505',
                    cancelButtonColor: '#ff1e00',
                    cancelButtonText: 'Volver',
                    confirmButtonText: 'Confirmar Compra',
                    showDenyButton: true,
                    denyButtonText: 'Borrar Cesto',
                    html: `${pedido.detalle()}------------------<br>Subtotal: $${pedido.precio}
            <br>IVA(23%): $${Math.round(pedido.Iva())}<br>TOTAL: $${Math.round(pedido.precio * 1.23)}
            <br>------------------<br><a href=./pages/realizarPedido.html>EDITAR PEDIDO ACTUAL</a><br>`,
                }).then((result) => {
                    (result.isConfirmed) ? terminarPedido(pedido, pedidos) : null;
                    (result.isDenied) ? borrarCesto(pedido) : null;

                })
            }
            else {
                Swal.fire({
                    icon: 'info',
                    title: 'Cesta de Compra',
                    showCancelButton: true,
                    confirmButtonColor: '#12a505',
                    cancelButtonColor: '#ff1e00',
                    cancelButtonText: 'Volver',
                    confirmButtonText: 'Confirmar Compra',
                    showDenyButton: true,
                    denyButtonText: 'Borrar Cesto',
                    html: `${pedido.detalle()}------------------<br>Subtotal: $${pedido.precio}
                       <br>IVA(23%): $${Math.round(pedido.Iva())}<br>TOTAL: $${Math.round(pedido.precio * 1.23)}
                       <br>------------------<br>
            <a href=./realizarPedido.html>EDITAR PEDIDO ACTUAL</a><br>`,
                }).then((result) => {
                    (result.isConfirmed) && terminarPedido(pedido, pedidos);
                    (result.isDenied) ? borrarCesto(pedido) : null;
                })
            }
        } else {
            (arhivoHTML == "index.html") ? rutaStr = "La Cesta de Compra está VACÍA<br><a href=./pages/realizarPedido.html>Click aquí para comprar</a>" : rutaStr = "La Cesta de Compra está VACÍA<br><a href=./realizarPedido.html>Click aquí para comprar</a>";
            Swal.fire({
                icon: 'info',
                title: 'Cesta de Compra',
                html: `${rutaStr}`,
            });
        }
    });
    const btnBuscar = document.getElementById("btnEnviar");
    btnBuscar.addEventListener("click", () => {
        const prodSeleccionado = document.querySelector("#autoComplete").value;
        mostrarProducto(prodSeleccionado, arhivoHTML);
    });
}

/*FUNCIÓN QUE DEVUELVE UN ARRAY DE NOMBRES DE PRODUCTOS PARA 
INSERTARLOS COMO SRC PARA AUTOCOMPLETAR EL CAMPO DE BÚSQUEDA*/

export function productosListaSrc(productos) {
    let arrRetorno = [];
    let i = 0;
    productos.forEach(p => {
        arrRetorno[i] = p.nombre
        i++
    })
    return arrRetorno;
}

//FUNCION PARA LISTENER DE BOTONES DEL COSTADO
export function panelCostado(arhivoHTML, pedido, pedidos) {
    const btnArriba = document.getElementById("cestaBtn");
    let rutaStr = "";
    btnArriba.addEventListener("click", () => {
        if (!pedido.esVacio()) {
            if (arhivoHTML == "index.html") {
                Swal.fire({
                    icon: 'info',
                    title: 'Cesta de Compra',
                    showCancelButton: true,
                    confirmButtonColor: '#12a505',
                    cancelButtonColor: '#ff1e00',
                    cancelButtonText: 'Volver',
                    confirmButtonText: 'Confirmar Compra',
                    showDenyButton: true,
                    denyButtonText: 'Borrar Cesto',
                    html: `${pedido.detalle()}------------------<br>Subtotal: $${pedido.precio}
            <br>IVA(23%): $${Math.round(pedido.Iva())}<br>TOTAL: $${Math.round(pedido.precio * 1.23)}
            <br>------------------<br><a href=./pages/realizarPedido.html>EDITAR PEDIDO ACTUAL</a><br>`,
                }).then((result) => {
                    (result.isConfirmed) ? terminarPedido(pedido, pedidos) : null;
                    (result.isDenied) ? borrarCesto(pedido) : null;

                })
            }
            else {
                Swal.fire({
                    icon: 'info',
                    title: 'Cesta de Compra',
                    showCancelButton: true,
                    confirmButtonColor: '#12a505',
                    cancelButtonColor: '#ff1e00',
                    cancelButtonText: 'Volver',
                    confirmButtonText: 'Confirmar Compra',
                    showDenyButton: true,
                    denyButtonText: 'Borrar Cesto',
                    html: `${pedido.detalle()}------------------<br>Subtotal: $${pedido.precio}
                       <br>IVA(23%): $${Math.round(pedido.Iva())}<br>TOTAL: $${Math.round(pedido.precio * 1.23)}
                       <br>------------------<br>
            <a href=./realizarPedido.html>EDITAR PEDIDO ACTUAL</a><br>`,
                }).then((result) => {
                    (result.isConfirmed) && terminarPedido(pedido, pedidos);
                    (result.isDenied) ? borrarCesto(pedido) : null;
                })
            }
        } else {
            (arhivoHTML == "index.html") ? rutaStr = "La Cesta de Compra está VACÍA<br><a href=./pages/realizarPedido.html>Click aquí para comprar</a>" : rutaStr = "La Cesta de Compra está VACÍA<br><a href=./realizarPedido.html>Click aquí para comprar</a>";
            Swal.fire({
                icon: 'info',
                title: 'Cesta de Compra',
                html: `${rutaStr}`,
            });
        }
    });
    const btnBuscar = document.getElementById("whatsappBtn");
    btnBuscar.addEventListener("click", () => {
        Swal.fire({
            icon: 'info',
            title: 'Funcionalidad de Whatsapp',
            text: 'Se implementará próximamente esta funcionalidad',
        });
    });
}


//PRESENTA UNA CARD EN PANTALLA CON EL PRODUCTO SELECCIONADO
export function mostrarProducto(nombreProducto, arhivoHTML) {
    //BUSCAR EN PEDIDOS.PRODUCTOS, SINO EN PRODUCTOS, SINO NO EXISTE
    const idProd1 = encontrarProductoPorNombreEnPedidos(nombreProducto, pedido);
    const idProd2 = encontrarProductoPorNombreEnProductos(nombreProducto, productos);
    if (idProd1 != -1 || (idProd1 == -1 && idProd2 != -1)) {
        //PRODUCTO YA EXISTE EN EL PEDIDO, SE BRINDA LA POSIBILIDAD DE MODIFICAR LA CANTIDAD
        let prod1 = new Producto();
        let cantidadProducto = 0;
        let imgUrlPath = "";
        idProd1 != -1 ? prod1 = pedido.productos[idProd1] : prod1 = productos[idProd2];
        idProd1 != -1 ? cantidadProducto = pedido.cantidadProductos[idProd1] : cantidadProducto = 0;
        const path = prod1.imgURL.split("../").slice(-1);
        arhivoHTML[0] != "index.html" && arhivoHTML[0] != "" ? imgUrlPath = "../" + path : imgUrlPath = "./" + path;   
        console.log (arhivoHTML)
        console.log (arhivoHTML[0])
        console.log (imgUrlPath)
        Swal.fire({
            html:
                `<div class="contSwalProd" id="containerSwal">
            <div class="tarjetaProd" id="Prod-Encontrado"> 
            <h2 id|="prodTitulo-Encontrado">${prod1.nombre}</h2>
            <img class="tarjetaProdImg" src="${imgUrlPath}" alt="Imagen de ${prod1.nombre}">
            <p id="prodDesc">${prod1.descripcion}<br>Precio:  $${Math.round(prod1.precio)}<br>
            IVA (23%):  $${Math.round(prod1.precio * 0.23)}<br>
            Precio total:  $${(prod1.precioIVA())}
            </p>
                <p id="prodCant">Cantidad: ${cantidadProducto}</p>
                <button class="productoEncontradoAgregarBtn btn btn-primary" id="productoEncontradoAgregarBtn" type="submit">Agregar</button>
                <button class="productoEncontradoQuitarBtn btn btn-primary" id="productoEncontradoQuitarBtn" |="" type="submit">Quitar</button><p></p>
                </div> </div>`,
            showCloseButton: true,
            showCancelButton: false,
            showConfirmButton: false
        })
        //BOTON DE AGREGAR PRODUCTO
        const productoAgregarBtn = document.getElementById("productoEncontradoAgregarBtn");
        productoAgregarBtn.addEventListener("click", () => {
            //SE VINCULA AL DIV DE CANTIDAD EN EL DOM
            const idProdDiv = productoAgregarBtn.parentElement;
            const prodCant = idProdDiv.querySelector("#prodCant");
            let prodCantNumber = parseInt(prodCant.innerHTML.split(": ").slice(1, 2));
            //SE AGREGA EL PRODUCTO AL PEDIDO ACTUAL
            agregarProductoAPedido(pedido, prod1, 1);
            cantProdsCesta(pedido);
            localStorage.setItem("pedido", JSON.stringify(pedido));
            prodCant.innerText = "Cantidad: " + (prodCantNumber + 1);
        })

        //BOTON DE BAJA PRODUCTO
        const productoQuitarBtn = document.getElementById("productoEncontradoQuitarBtn");
        productoQuitarBtn.addEventListener("click", () => {
            //SE VINCULA AL DIV DE CANTIDAD EN EL DOM
            const idProdDiv = productoQuitarBtn.parentElement;
            const prodCant = idProdDiv.querySelector("#prodCant");
            let prodCantNumber = parseInt(prodCant.innerHTML.split(": ").slice(1, 2));
            //SE QUITA EL PRODUCTO DEL PEDIDO ACTUAL
            const resultado = quitarProductoDePedido(pedido, prod1);
            cantProdsCesta(pedido);
            localStorage.setItem("pedido", JSON.stringify(pedido));
            if (resultado != "nada") {
                prodCant.innerText = "Cantidad: " + (prodCantNumber - 1);
            }
            else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-right',
                    iconColor: 'white',
                    customClass: {
                        popup: 'colored-toast'
                    },
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: false
                })
                Toast.fire({
                    icon: 'error',
                    title: `Sin ${prod1.nombre} en la Cesta`
                })
            }

        })
    }
    else {
        //PRODUCTO INGRESADO NO EXISTE EN LA BASE DE DATOS
        Swal.fire({
            icon: 'error',
            title: 'Error: Producto no existente',
            text: 'El producto ingresado NO existe en la base',
        })
    }
}

//FUNCION QUE MUESTRA LOS PRODUCTOS DE ACUERDO AL SITIO EN EL QUE ES CARGADO (ARCHIVO HTML)

export function mostrarProductos(productosDiv, arhivoHTML, categorias, productos, pedido) {
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
                tarjetaProd.setAttribute("id", "idProd-" + el.id);
                tarjetaProd.innerHTML = ` 
                <h2 id="prodTitulo-${el.id}">${el.nombre}</h2>
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
                    <button class="bajaBtn btn btn-primary" id="bajaBtn-${el.id} type="submit">Borrar Producto</button></p>
                    `;
                }

                else if (arhivoHTML == "realizarPedido.html" && pedido.cantidadDe(el)) {
                    //SE BUSCA EL NUMERO DE INDICE DEL PRODUCTO

                    tarjetaProd.innerHTML = tarjetaProd.innerHTML + `
                    <p id="prodCant">Cantidad: ${pedido.cantidadDe(el)}</p>
                    <button class="agregarBtn btn btn-primary" id="agregarBtn-${el.id}" type="submit">Agregar</button>
                    <button class="quitarBtn btn btn-primary" id="quitarBtn-${el.id} type="submit">Quitar</button></p>
                    `;
                }
                else {
                    tarjetaProd.innerHTML = tarjetaProd.innerHTML + `
                    <p id="prodCant">Cantidad: 0</p>
                    <button class="agregarBtn btn btn-primary" id="agregarBtn-${el.id}" type="submit">Agregar</button>
                    <button class="quitarBtn btn btn-primary" id="quitarBtn-${el.id}"| type="submit">Quitar</button></p>
                    `;
                }
                productosDiv.appendChild(tarjetaProd);
            }
        }
        )
    })
}

//BUSCA UN ID LIBRE DE PRODUCTO
export function idLibreProducto(productos) {
    let idLibreProducto;
    const ids = [];
    productos.forEach(element => {
        ids.push(element.id);
    });
    idLibreProducto = Math.max(...ids) + 1;
    return idLibreProducto;
}

//BUSCA UN ID LIBRE DE PEDIDO
export function idLibrePedido(pedidos) {
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

//ENCONTRAR PRO DUCTO POR ID
export function encontrarProductoPorId(idProducto, productos) {
    let productoEncontrado = new Producto();
    productoEncontrado = productos.find(element => element.id === idProducto);
    return convertirProducto(productoEncontrado);
}

//ENCONTRAR PRODUCTO POR NOMBRE EN EL PEDIDO ACTUAL PEDIDO
function encontrarProductoPorNombreEnPedidos(nombreProducto, pedido) {
    const idProdEnncontrado = pedido.productos.findIndex(element => element.nombre === nombreProducto);
    return idProdEnncontrado;
}

//ENCONTRAR PRODUCTO POR NOMBRE EN EL ARRAY DE PRODUCTOS
function encontrarProductoPorNombreEnProductos(nombreProducto, productos) {
    const idProdEnncontrado = productos.findIndex(element => element.nombre === nombreProducto);
    return idProdEnncontrado;
}



//CONVERTIR OBJETO GENÉRICO DESDE LOCALSTORAGE A OBJETO DEL TIPO 'PRODUCTO'
function convertirProducto(productoInput) {
    return new Producto(productoInput.id, productoInput.nombre, productoInput.descripcion, productoInput.categoria, productoInput.precio, productoInput.imgURL);
}

//FUNCIONES DEDICADAS A LAS CATEGORÍAS DE LA APP

//LLENA LOS COMBOS CON CADA CATEGORÍA DEL ARRAY
export function llenarComboCategorias(categorias) {
    let i = 0;
    const comboCat = document.getElementById("categProducto");
    categorias.forEach(cat => {
        const catOpt = document.createElement("option");
        catOpt.label = `${categorias[i]}`;
        catOpt.value = `${categorias[i]}`;
        comboCat.appendChild(catOpt);
        i++;
    })
}

//VERIFICA SI YA EXISTE LA CATEGORÍA EN EL ARRAY
export function yaExisteCategoria(categoria, categorias) {
    let existe = false;
    let i = 0;
    categorias.forEach(() => {
        categorias[i] == categoria ? existe = true : null;
        i++;
    })
    return existe;
}

//VERIFICA SI YA EXISTE LA CATEGORÍA EN EL ARRAY
export function categoriaVacia(categoria, productos) {
    let vacia = true;
    let i = 0;
    productos.forEach(() => {
        String(productos[i].categoria) === (String(categoria)) ? vacia = false : null;
        i++;
    })
    return vacia;
}

//BORRAR LA CATEGORÍA QUE LE PASAMOS POR PARÁMETRO
export function borrarCategoria(categoria, categorias) {
    const indice = categorias.findIndex(cat => cat == categoria);
    categorias.splice(indice, 1);
    localStorage.setItem("categorias", JSON.stringify(categorias));
    Swal.fire({
        icon: 'success',
        title: 'Categoría Borrada',
        html: `La Categoría "${categoria}" ha sido BORRADA`,
    }).then(function () {
        location.reload();
    })
}

//FUNCIONES DEDICADAS A LOS PEDIDOS DE LA APP

//AGREGAR PRODUCTO A PEDIDO
export function agregarProductoAPedido(pedido, producto, cantidad) {
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

/*CALCULAR PRECIO DE PEDIDO, TOMA COMO PARÁMETROS UN OBJETO DEL TIPO "PEDIDO",
DEVUELVE EL PRECIO TOTAL SIN IVA. LOS OBJETOS YA CUENTAN CON SUS PROPIOS MÉTODOS PARA CALCULAR SU IVA*/
function calcularPrecioPedido(pedido) {
    let precioPedido = 0;
    for (let i = 0; i < Object.keys(pedido.productos).length; i++) {
        precioPedido += (pedido.productos[i].precio * pedido.cantidadProductos[i]);
    }
    return precioPedido;
}

//QUITAR PRODUCTO DE PEDIDO
export function quitarProductoDePedido(pedido, producto) {
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

//FUNCIÓN PARA FINALIZAR EL PEDIDO ACTUAL Y AGREGARLO AL ARRAY DE PEDIDOS
export function terminarPedido(pedido, pedidos) {
    pedido.fecha = fechaActual();
    pedido.hora = horaActual();
    pedido.precio = calcularPrecioPedido(pedido);
    pedidos.push(pedido);
    localStorage.removeItem("pedidos");
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
    //SE LIMPIA EL PEDIDO ACTUAL PARA COMENZAR UNO NUEVO
    localStorage.removeItem("pedido");
    Swal.fire({
        icon: 'success',
        title: 'Pedido Realizado',
        html: `Su pedido #${pedido.id} ha sido realizado con ÉXITO!<br>Detalle:<br>${pedido.detalle()}<br>Subtotal: $${pedido.precio}
        <br>IVA(23%): $${Math.round(pedido.Iva())}<br>TOTAL: $${Math.round(pedido.precio * 1.23)}`,
    }).then(function () {
        location.reload();
    });
}

//FUNCIÓN PARA FINALIZAR EL PEDIDO ACTUAL Y AGREGARLO AL ARRAY DE PEDIDOS
export function borrarCesto(pedido) {
    //SE LIMPIA EL PEDIDO ACTUAL PARA COMENZAR UNO NUEVO
    const pedidoVacio = pedido.esVacio();
    if (!pedidoVacio) {
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

//FUNCION QUE DEVUELVE HORA ACTUAL
export function horaActual() {
    const fechaComp = new Date();
    let hora, minuto, horaDevuelta;
    hora = fechaComp.getHours();
    minuto = fechaComp.getMinutes();
    horaDevuelta = hora + ":" + minuto + " hrs.";
    return horaDevuelta;
}


//FUNCION QUE DEVUELVE FECHA ACTUAL
export function fechaActual() {
    const fecha = new Date();
    let dia, mes, ano, fechaDevuelta;
    dia = fecha.getDate();
    mes = (fecha.getMonth() + 1);
    ano = fecha.getFullYear();
    fechaDevuelta = dia + "/" + mes + "/" + ano;
    return fechaDevuelta;
}

//FUNCION QUE MUESTRA LOS PEDIDOS
export function mostrarPedidos(productosDiv, arhivoHTML, pedidos) {
    productosDiv.innerHTML = '';
    let hayAlgo = false;
    if (pedidos.length > 0) {
        pedidos.forEach(el1 => {
            if (!el1.entregado) {
                hayAlgo = true;
                const tarjetaPedido = document.createElement("div");
                tarjetaPedido.classList.add("pedidosCard");
                tarjetaPedido.setAttribute("id", "idPedido-" + el1.id)
                tarjetaPedido.innerHTML = `<h2 class="h2Pedido"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-seam-fill" viewBox="0 0 16 16">
               <path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003 6.97 2.789ZM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461L10.404 2Z"/>
               </svg>Pedido #${el1.id}:</h2><p><br>Hecho el ${el1.fecha} a las ${el1.hora}<br>Estado: ${el1.yaEntregado()}<br>
               Detalle:<br>------------------<br>${el1.detalle()}------------------<br>Subtotal: $${el1.precio}<br>
               IVA(23%): $${Math.round(el1.Iva())}<br>TOTAL: $${Math.round(el1.precio * 1.23)}<br>------------------`;
                if (arhivoHTML == "verPedidos.html") {
                    tarjetaPedido.innerHTML += `</p>`;
                }
                else {
                    tarjetaPedido.innerHTML += `
                   <button class="entregarBtn btn btn-primary" id="entregarBtn-${el1.id}" type="submit">Entregar</button>
                   <button class="cancelarBtn btn btn-primary" id="cancelarBtn-${el1.id}"| type="submit">Cancelar</button></p`;
                }
                productosDiv.appendChild(tarjetaPedido);
            } else if ((el1.entregado) && arhivoHTML == "verPedidos.html") {
                hayAlgo = true;
                const tarjetaPedido = document.createElement("div");
                tarjetaPedido.classList.add("pedidosCard");
                tarjetaPedido.setAttribute("id", "idPedido-" + el1.id)
                tarjetaPedido.innerHTML = `<h2 class="h2Pedido"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-seam-fill" viewBox="0 0 16 16">
                 <path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003 6.97 2.789ZM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461L10.404 2Z"/>
                 </svg>Pedido #${el1.id}:</h2><p><br>Hecho el ${el1.fecha} a las ${el1.hora}<br>
                 Estado: ${el1.yaEntregado()}<br>Detalle:<br>------------------<br>${el1.detalle()}------------------<br>Subtotal: $${el1.precio}
                    <br>IVA(23%): $${Math.round(el1.Iva())}<br>TOTAL: $${Math.round(el1.precio * 1.23)}<br>------------------</p>`;
                productosDiv.appendChild(tarjetaPedido);
            }
        })
    }
    if (!hayAlgo) {
        Swal.fire({
            icon: 'info',
            title: 'Sin Pedidos registrados',
            html: `No hay Pedidos pendientes de gestión<br>
    <a href=./realizarPedido.html>REALIZAR UN PEDIDO AHORA</a><br>`,
        }).then(function () {
            location.reload();
        });

    }
}

//FUNCIÓN DE CANCELAR DE PEDIDO, TOMANDO COMO PARÁMETRO UN ID
export function cancelarPedido(idPedido, pedidos) {
    const indexPed = pedidos.findIndex(e => e.id == idPedido);
    pedidos.splice(indexPed, 1);
    localStorage.removeItem("pedidos");
    localStorage.setItem("pedidos", pedidos);
}

//FUNCIÓN DE ENTREGA DE PEDIDO, TOMANDO COMO PARÁMETRO UN ID
export function entregarPedido(idPedido, pedidos) {
    let retorno = false;
    pedidos.forEach((p) => {
        (p.id == idPedido) ? p.entregado = true : null;
    })
}
