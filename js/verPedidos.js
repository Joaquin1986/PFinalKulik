import { cargaAlmacenamiento, pedido, arhivoHTML, pedidos} from "./almacenamiento.js";
import { cestaNav,panelCostado,mostrarPedidos, cantProdsCesta} from "./utils.js";
import {autocompletarTxt} from "./buscar.js";

cargaAlmacenamiento();
cantProdsCesta(pedido);
cestaNav(arhivoHTML,pedido,pedidos);
panelCostado(arhivoHTML,pedido,pedidos);
autocompletarTxt();
if (pedidos.length > 0) {
    const pedidosDiv = document.getElementById("pedidosDiv");
    cestaNav(arhivoHTML,pedido);
    panelCostado(arhivoHTML,pedido);
    mostrarPedidos(pedidosDiv, arhivoHTML,pedidos);
}
else {
    Swal.fire({
        icon: 'info',
        title: 'Sin Pedidos registrados',
        html: `No se han registrado Pedidos aún<br>
<a href="./realizarPedido.html" >REALIZAR UN PEDIDO AHORA</a><br>`,
    }).then(function () {
        location.reload();
    });
}
