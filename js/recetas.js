import { cargaAlmacenamiento, pedido, arhivoHTML, pedidos } from "./almacenamiento.js";
import { autocompletarTxt } from "./buscar.js";
import { cestaNav, cantProdsCesta, panelCostado } from "./utils.js";
import { precargaPagina } from "./utils.js";

export function botonRecetas(pathArchivoJS) {
    const btnRecetas = document.getElementById("liRecetas");
    btnRecetas.addEventListener("click", () => {
        const pagina = document.querySelector("body");
        precargaPagina(arhivoHTML, pagina, pathArchivoJS);
        mostrarRecetas();
        cargaAlmacenamiento();
        cantProdsCesta(pedido);
        cestaNav(arhivoHTML, pedido, pedidos);
        panelCostado(arhivoHTML, pedido, pedidos);
        autocompletarTxt();

    })
}

function mostrarRecetas() {
    let respuesta;
    const divRecetas = document.getElementById("recetasDiv");
    divRecetas.innerHTML = "";
    let requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    fetch("https://www.themealdb.com/api/json/v1/1/filter.php?a=indian", requestOptions)
        .then(response => response.text())
        .then(result => {
            respuesta = (JSON.parse(result));
            respuesta.meals.forEach(element => {
                const tarjetaReceta = document.createElement("div");
                tarjetaReceta.classList.add("tarjetaReceta");
                tarjetaReceta.setAttribute("id", "idReceta-" + element.idMeal);
                tarjetaReceta.innerHTML = ` 
                <h2 id="recetaTitulo-${element.idMeal}">${element.strMeal}</h2>
                <img class="tarjetaRecImg" src="${element.strMealThumb}" alt="Imagen de ${element.strMeal}">         
                `;
                divRecetas.appendChild(tarjetaReceta);
                tarjetaReceta.addEventListener("click", (e) => {
                    e.preventDefault();
                    let respuesta2;
                    //SE HACE UN NUEVO FETCH CON EL PLATO ELEGIDO
                    fetch("https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + element.idMeal, requestOptions)
                        .then(response => response.text())
                        .then(result => {
                            //SE TRABAJA LA RESPUESTA DEL FETCH PARA PRESENTAR LA CARD DE LA RECETA
                            respuesta2 = (JSON.parse(result));
                            const valores = Object.values(respuesta2.meals[0]);
                            const arrYoutube = respuesta2.meals[0].strYoutube.split("?v=");
                            const urlYoutube=arrYoutube[1]
                            let cantidades = "";
                            for (let i = 9; i < 29; i++) {
                                valores[i] != "" && valores[i + 20] != "" ? cantidades += valores[i] + " - " + valores[i + 20] + "<br>" : null;
                            }
                            //SE ABRE UN SWEET ALERT CON EL DETALLE DE LA RECETA DEL PLATO
                            Swal.fire({
                                html:
                                    `<div class="contSwalDetalleReceta" id="containerSwalDetalleReceta-${element.idMeal}">
                                    <h2 id|="recetaTitulo-Encontrado">${element.strMeal}</h2>                                
                                    <img class="tarjetaRecetaImg" src="${element.strMealThumb}" alt="Imagen de ${element.strMeal}">
                                  <div class="cantidadesReceta" id="cantidadesReceta-${element.idMeal}"><p>--------------------------------<br><strong>Ingredientes: </strong></p>
                                  <p>${cantidades}</p>
                                  </div>
                                  <div class="instruccionesReceta" id="instruccionesReceta-${element.idMeal}">
                                  <p>-------------------------------<br><strong>Instrucciones: </strong></p>
                                  <p>${respuesta2.meals[0].strInstructions}</p>
                                  </div> 
                                  <div class="videoReceta" id="videoReceta-${element.idMeal}">
                                  <iframe id="player" type="text/html"
                                  src="https://www.youtube.com/embed/${urlYoutube}?enablejsapi=1&origin=https://joaquin1986.github.io" frameborder="0"></iframe>
                                  <a href="${respuesta2.meals[0].strYoutube}" target="blank"><p id="linkReceta" >Link al Video de Preparación</p></a>
                                  </div>                                  
                                </div>`,
                                showCloseButton: true,
                                showCancelButton: false,
                                showConfirmButton: false
                            })
                        })

                        .catch(error => {
                            Swal.fire({
                                icon: 'error',
                                title: 'Error al intentar obtener el detalle de la receta elegida',
                                text: `${error}`,
                            });
                        });

                })
            });
        })
        .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Error al intentar obtener las recetas',
                text: `${error}`,
            });
        });

}