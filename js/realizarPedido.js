import { cargaAlmacenamiento, pedido, arhivoHTML, categorias, productos, pedidos } from "./almacenamiento.js";
import {
    cestaNav,
    panelCostado,
    mostrarProductos,
    encontrarProductoPorId,
    agregarProductoAPedido,
    quitarProductoDePedido,
    terminarPedido,
    cantProdsCesta,
    borrarCesto
} from "./utils.js";
import { autocompletarTxt } from "./buscar.js";

cargaAlmacenamiento();
cantProdsCesta(pedido);
cestaNav(arhivoHTML, pedido, pedidos);
panelCostado(arhivoHTML, pedido, pedidos);
autocompletarTxt();
const productosDiv = document.getElementById("productosDiv");
mostrarProductos(productosDiv, arhivoHTML, categorias, productos, pedido);
//BOTONES DE AGREGAR PRODUCTO
let productosAgregarBtn = document.getElementsByClassName("agregarBtn");
for (let i = 0; i < productosAgregarBtn.length; i++) {
    productosAgregarBtn[i].addEventListener("click", () => {
        let prodObj;
        const btnValor = productosAgregarBtn[i].innerText
        const idProdDiv = productosAgregarBtn[i].parentElement;
        const idProd = parseInt(productosAgregarBtn[i].id.split("agregarBtn-")[1]);
        const prodCant = idProdDiv.querySelector("#prodCant-" + idProd);
        let prodCantNumber = parseInt(prodCant.innerHTML.split(": ").slice(1, 2));
        //SE BUSCA EL PRODUCTO POR SU ID Y SE AGREGA AL PEDIDO
        prodObj = encontrarProductoPorId(idProd, productos);
        //SE AGREGA EL PRODUCTO AL PEDIDO ACTUAL
        agregarProductoAPedido(pedido, prodObj, 1);
        cantProdsCesta(pedido);
        localStorage.setItem("pedido", JSON.stringify(pedido));
        prodCant.innerText = "Cantidad: " + (prodCantNumber + 1);
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
            icon: 'success',
            title: `+1 ${prodObj.nombre} en la Cesta`
        })
    })
}

//BOTONES DE QUITAR PRODUCTO

let productosQuitarBtn = document.getElementsByClassName("quitarBtn");
for (let i = 0; i < productosQuitarBtn.length; i++) {
    productosQuitarBtn[i].addEventListener("click", () => {
        let prodObj;
        const idProdDiv = productosQuitarBtn[i].parentElement;
        const idProd = parseInt(productosQuitarBtn[i].id.split("quitarBtn-")[1]);
        const prodCant = idProdDiv.querySelector("#prodCant-" + idProd);
        let prodCantNumber = parseInt(prodCant.innerHTML.split(": ").slice(1, 2));
        //SE BUSCA EL PRODUCTO POR SU ID Y SE AGREGA AL PEDIDO
        prodObj = encontrarProductoPorId(idProd, productos);
        //SE QUITA PRODUCTO DEL PEDIDO ACTUAL 
        const resultado = quitarProductoDePedido(pedido, prodObj);
        cantProdsCesta(pedido);
        localStorage.setItem("pedido", JSON.stringify(pedido));
        if (resultado != "nada") {
            prodCant.innerText = "Cantidad: " + (prodCantNumber - 1);
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
                title: `-1 ${prodObj.nombre} en la Cesta`
            })
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
                title: `Sin ${prodObj.nombre} en la Cesta`
            })
        }

    })

}

//BOTON DE CANCELAR PEDIDO
let productosCancelarBtn = document.getElementById("cancelarBtn");
productosCancelarBtn.addEventListener("click", () => {
    borrarCesto(pedido);
})

//BOTON DE FINALIZAR PEDIDO
let productosFinalizarBtn = document.getElementById("finalizarBtn");
productosFinalizarBtn.addEventListener("click", () => {
    //SE TERMINA DE ARMAR EL OBJETO PEDIDO Y SE AGREGA AL ARRAY Y AL LOCALSTORAGE
    if (!pedido.esVacio()) {
        terminarPedido(pedido, pedidos);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Error: Pedido Vacío',
            text: 'El Pedido no se puede realizar, dado que está VACÍO',
        });
    }
})
