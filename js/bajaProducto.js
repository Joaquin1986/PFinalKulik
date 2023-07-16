import { cargaAlmacenamiento, arhivoHTML, categorias, productos, pedido, pedidos } from "./almacenamiento.js";
import { cestaNav, panelCostado, mostrarProductos, encontrarProductoPorId, cantProdsCesta } from "./utils.js";
import {autocompletarTxt} from "./buscar.js";

cargaAlmacenamiento();
cantProdsCesta(pedido);
cestaNav(arhivoHTML, pedido, pedidos);
panelCostado(arhivoHTML, pedido, pedidos);
autocompletarTxt();
mostrarProductos(productosDiv, arhivoHTML, categorias, productos, pedido);
let productosBajaBtn = document.getElementsByClassName("bajaBtn");
for (let i = 0; i < productosBajaBtn.length; i++) {
    productosBajaBtn[i].addEventListener("click", () => {
        //EXTRAEMOS EL ID DEL PRODUCTO A BORRAR
        let idProd = parseInt(productosBajaBtn[i].id.split("bajaBtn-")[1]);
        let prodObj = encontrarProductoPorId(idProd, productos);
        //PEDIMOS CONFIRMACIÓN PARA BORRAR EL PRODUCTO
        Swal.fire({
            title: `BORRAR ${prodObj.nombre}?`,
            text: "Luego de eliminado, el producto puede ser creado nuevamente de todos modos (Alta de Producto)",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#12a505',
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