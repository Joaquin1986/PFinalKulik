import { Producto } from "./clases.js";
import { cargaAlmacenamiento, arhivoHTML,productos,pedido,categorias} from "./almacenamiento.js";
import { cestaNav,idLibreProducto,cantProdsCesta } from "./utils.js";
import{autocompletarTxt}from "./buscar.js";

//SE VALIDA FORMULARIO DE ALTA
function validarFormAltaTexto(formInputs) {
    let valido = true;
    for (let i = 1; i < formInputs.length; i++) {
        (!formInputs[i].value) ? valido = false : null;
    }
    return valido;
}

function validarFormAltaNumber(formInputs) {
    let valido = true;
    (!parseInt(formInputs[3].value)) ? valido = false : null;
    return valido;
}

cargaAlmacenamiento();
cantProdsCesta(pedido);
cestaNav(arhivoHTML, pedido);
autocompletarTxt();
let productoAltaBtn = document.getElementById("btnAltaProd");
productoAltaBtn.addEventListener("click", () => {
    const divForm = document.querySelectorAll(".form-control");
    const catProducto = document.getElementById("categProducto");
    if (validarFormAltaTexto(divForm)) {
        //SE VALIDA QUE EL PRECIO NO SEA NAN
        if (validarFormAltaNumber(divForm)) {
            //SE EJECUTA EL ALTA TRAS VALIDAR QUE NO HAYAN INPUTS EN BLANCO
            const prod1 = new Producto(idLibreProducto(productos), divForm[1].value, divForm[2].value,
                catProducto.value, divForm[3].value, divForm[4].value);
            productos.push(prod1);
            localStorage.setItem("productos", JSON.stringify(productos));
            Swal.fire({
                icon: 'success',
                title: 'Producto Creado',
                text: `El producto "${prod1.nombre}" ha sido realizado con ÉXITO!`,
            }).then(function () {
                location.reload();
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error: Formulario inválido',
                text: `El precio ingresado no es válido, ingrese un número por favor`,
            })
        }
    }
    else {
        //NO SE VALIDO EL FORM
        Swal.fire({
            icon: 'error',
            title: 'Error: Formulario inválido',
            text: `Revise los datos ingresados por favor, hay campos vacíos`,
        })
    }
})