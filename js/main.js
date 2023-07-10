import { cargaAlmacenamiento, pedido, arhivoHTML, pedidos } from "./almacenamiento.js";
import { cestaNav } from "./utils.js";

cargaAlmacenamiento();
cestaNav(arhivoHTML, pedido, pedidos);