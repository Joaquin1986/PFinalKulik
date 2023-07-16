import { cargaAlmacenamiento, pedido, arhivoHTML, categorias, productos, pedidos } from "./almacenamiento.js";
import { cestaNav, panelCostado, mostrarProductos, cantProdsCesta } from "./utils.js";
import{autocompletarTxt} from "./buscar.js";

//VER PRODUCTOS
cargaAlmacenamiento();

cantProdsCesta(pedido);
cestaNav(arhivoHTML, pedido, pedidos);
panelCostado(arhivoHTML, pedido, pedidos);
const productosDiv = document.getElementById("productosDiv");
autocompletarTxt();
mostrarProductos(productosDiv, arhivoHTML, categorias, productos);