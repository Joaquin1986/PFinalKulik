import { cargaAlmacenamiento, categorias, pedido, productos } from "./almacenamiento.js";
import { categoriaVacia, cestaNav, llenarComboCategorias, yaExisteCategoria, borrarCategoria } from "./utils.js";
import {autocompletarTxt} from "./buscar.js";


//CREA UNA ALERTA POR NOMBRE DE CATEGORÍA VACÍO EN FORM
function alertaVacio() {
    Swal.fire({
        icon: 'error',
        title: 'Error: Categoría Vacía',
        text: `El nombre de la Categoría no puede ser nulo o vacío`,
    })
}

//CREA UNA ALERTA POR NOMBRE DE CATEGORÍA VACÍO EN FORM
function alertaYaExiste() {
    Swal.fire({
        icon: 'error',
        title: 'Error: Categoría ya existente',
        text: `El nombre de la Categoría ya se encontraba creado`,
    })
}

//CREA UNA ALERTA POR INTENTO DE BORRAR CATEGORÍA CON PRODUCTOS
function alertaCatNoVacia() {
    Swal.fire({
        icon: 'error',
        title: 'Error: Categoría con Productos',
        text: `La Categoría no puede ser BORRADA dado no aún no está VACÍA`,
    })
}

//CREAR CATEGORIA
function crearCategoria(nombreCat) {
    categorias.push(nombreCat);
    localStorage.setItem("categorias", JSON.stringify(categorias));
    Swal.fire({
        icon: 'success',
        title: 'Categoría Creada',
        text: `La Categoría "${nombreCat}" ha sido creada con ÉXITO!`,
    }).then(function () {
        location.reload();
    });
}

cargaAlmacenamiento();
cestaNav(pedido);
llenarComboCategorias(categorias);
autocompletarTxt();
const btnAltaCat = document.getElementById("btnAltaCat");
const btnBorrarCat = document.getElementById("btnBorrarCat");
const inputCat = document.getElementsByClassName("form-control");
btnAltaCat.addEventListener("click", () => {
    if (inputCat[1].value == "") {
        alertaVacio();
    } else {
        yaExisteCategoria(inputCat[1].value, categorias) ? alertaYaExiste() : crearCategoria(inputCat[1].value);
    }
})
btnBorrarCat.addEventListener("click", () => {
    const comboCat = document.getElementById("categProducto");
    const categ = comboCat.options[comboCat.options.selectedIndex].value;
    categoriaVacia(categ, productos) ? borrarCategoria(categ, categorias) : alertaCatNoVacia();
})


