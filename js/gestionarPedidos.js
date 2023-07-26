import { cargaAlmacenamiento, pedido, arhivoHTML, pedidos} from "./almacenamiento.js";
import { cestaNav,panelCostado,mostrarPedidos,cancelarPedido, entregarPedido, cantProdsCesta} from "./utils.js";
import {autocompletarTxt} from "./buscar.js";
import { botonRecetas } from "./recetas.js";

cargaAlmacenamiento()
cantProdsCesta(pedido);
cestaNav(arhivoHTML,pedido,pedidos);
panelCostado(arhivoHTML,pedido,pedidos);
autocompletarTxt();
botonRecetas("../js/gestionarPedidos.js");
if (pedidos.length > 0) {
    const pedidosDiv = document.getElementById("pedidosDiv");
    cestaNav(arhivoHTML);
    panelCostado();
    mostrarPedidos(pedidosDiv, arhivoHTML,pedidos);
    //BOTONES DE ENTREGAR PEDIDO
    const entregarBtn = document.getElementsByClassName("entregarBtn");
    for (let i = 0; i < entregarBtn.length; i++) {
        entregarBtn[i].addEventListener("click", () => {
            //EXTRAEMOS EL ID DEL PEDIDO A ENTREGAR
            let idPedido = parseInt(entregarBtn[i].id.split("entregarBtn-")[1]);
            //PEDIMOS CONFIRMACIÓN PARA ENTREGAR EL PEDIDO
            Swal.fire({
                title: `ENTREGAR Pedido #${idPedido}?`,
                text: "Luego de ENTREGADO, el Pedido NO podrá ser CANCELADO",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#12a505',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'ENTREGAR '
            }).then((result) => {
                if (result.isConfirmed) {
                    entregarPedido(idPedido,pedidos);
                    localStorage.removeItem("pedidos");
                    localStorage.setItem("pedidos", JSON.stringify(pedidos));
                    Swal.fire({
                        icon: 'success',
                        title: `Pedido #${idPedido} ENTREGADO`,
                        text: `El pedido #${idPedido} fue entregado con éxito!`
                    }).then(function () {
                        location.reload();
                    });
                }
            })
        })
    }

    //BOTONES DE CANCELAR PEDIDO
    const cancelarBtn = document.getElementsByClassName("cancelarBtn");
    for (let i = 0; i < cancelarBtn.length; i++) {
        cancelarBtn[i].addEventListener("click", () => {
            //EXTRAEMOS EL ID DEL PEDIDO A ENTREGAR
            let idPedido = parseInt(cancelarBtn[i].id.split("cancelarBtn-")[1]);
            //PEDIMOS CONFIRMACIÓN PARA ENTREGAR EL PEDIDO
            Swal.fire({
                title: `CANCELAR Pedido #${idPedido}?`,
                text: "Luego de CANCELADO, el Pedido será eliminado permanentemente",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#12a505',
                cancelButtonColor: '#d33',
                cancelButtonText: 'Cancelar',
                confirmButtonText: 'Sí, CANCELARLO'
            }).then((result) => {
                if (result.isConfirmed) {
                    cancelarPedido(idPedido,pedidos);
                    localStorage.removeItem("pedidos");
                    localStorage.setItem("pedidos", JSON.stringify(pedidos));
                    Swal.fire({
                        icon: 'success',
                        title: `Pedido #${idPedido} CANCELADO`,
                        text: `El pedido #${idPedido} fue cancelado con éxito!`
                    }).then(function () {
                        location.reload();
                    });
                }
            })
        })
    }
}
else {
    Swal.fire({
        icon: 'info',
        title: 'Sin Pedidos registrados',
        confirmButtonText: 'Volver',
        html: `No hay Pedidos pendientes de gestión<br>
        
<a href=./realizarPedido.html>REALIZAR UN PEDIDO AHORA</a><br>`,
    }).then(function () {
        window.location.href = "../index.html";
    });
}