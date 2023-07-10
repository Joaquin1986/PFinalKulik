import { cargaAlmacenamiento, pedido, arhivoHTML, categorias,productos,pedidos} from "./almacenamiento.js";
import { cestaNav,panelCostado,mostrarProductos } from "./utils.js";

//VER PRODUCTOS
cargaAlmacenamiento();
cestaNav(arhivoHTML,pedido,pedidos);
panelCostado(arhivoHTML,pedido,pedidos);
const productosDiv = document.getElementById("productosDiv");
mostrarProductos(productosDiv, arhivoHTML,categorias,productos);