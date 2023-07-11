import { cargaAlmacenamiento, pedido, arhivoHTML, pedidos } from "./almacenamiento.js";
import { cestaNav, cantProdsCesta } from "./utils.js";

cargaAlmacenamiento();
cantProdsCesta(pedido);
cestaNav(arhivoHTML, pedido, pedidos);