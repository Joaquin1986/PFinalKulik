import { productosListaSrc } from "./utils.js";
import { productos } from "./almacenamiento.js";

export function autocompletarTxt() {
    const prodSrc = productosListaSrc(productos);
    const autoCompleteJS = new autoComplete({
        selector: "#autoComplete",
        placeHolder: "Ingrese producto a buscar",   
        data: {
            src: prodSrc,
            cache: true,
        },
        resultsList: {
            element: (list, data) => {
                if (!data.results.length) {
                    // Create "No Results" message element
                    const message = document.createElement("div");
                    // Add class to the created element
                    message.setAttribute("class", "no_result");
                    // Add message text content
                    message.innerHTML = `<span>Sin resultados de "${data.query}"</span>`;
                    // Append message element to the results list
                    list.prepend(message);
                }
            },
            noResults: true,
        },
        resultItem: {
            highlight: true,
        }
    });

    const autocompletarTxt = document.querySelector("#autoComplete")
    autocompletarTxt.addEventListener("selection", function (event) {
        const valorSeleccionado = event.detail.selection.value;
        autocompletarTxt.value = valorSeleccionado;
    });

}


