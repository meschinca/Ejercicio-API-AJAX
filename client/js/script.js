// Creo el AJAX request
const ajaxRequest = new XMLHttpRequest();

// Obtengo los elementos de DOM para utilizar
const nameQuery = document.getElementById("name-query");
const minAge = document.getElementById("min-age");
const caseSens = document.getElementById("case-sens");
const noPartial = document.getElementById("no-partial");
const searchButton = document.getElementById("submit");
const queryStatus = document.getElementById("query-status");
const list = document.getElementById("list");

// Creo la base para la URL del GET
const baseEP = "/person?";

// Listener para armar la URL de la consulta y disparar el AJAX request
searchButton.addEventListener("click", () => {
  // Borro resultados de cualquier búsqueda anterior
  list.innerHTML = "";
  
  // Armo el query string
  let queryStr = "";
  if (nameQuery.value) (queryStr.length > 0) ? (queryStr += `&name=${nameQuery.value}`) : (queryStr += `name=${nameQuery.value}`);
  if (minAge.value) (queryStr.length > 0) ? (queryStr += `&minAge=${minAge.value}`) : (queryStr += `minAge=${minAge.value}`);
  if (caseSens.checked) (queryStr.length > 0) ? (queryStr += `&caseSens=true`) : (queryStr += `caseSens=true`);
  if (noPartial.checked) (queryStr.length > 0) ? (queryStr += `&noPartial=true`) : (queryStr += `noPartial=true`);

  // Abro el AJAX request
  ajaxRequest.open("GET", baseEP + queryStr);

  // Muestro que se realizó el pedido
  queryStatus.textContent = "Consultando datos..."

  // Envío el  AJAX request
  ajaxRequest.send();
});


// Listener para mostrar los resultados de la consulta
ajaxRequest.addEventListener("load", function () {
  
  window.setTimeout(()=>{
    // Si la consulta fue exitosa
    if (this.status == 200) {

      // Creo el array de objetos a partir de la respuesta
      const resultData = JSON.parse(this.responseText);

      // Si se obtuvo algún resultado
      if (resultData.length > 0) {
      
       // Presento los resultados
        queryStatus.textContent = "Datos consultados:";
      
        // Para cada resultado creo un elemento de lista para mostrar en el HTML
        for (let i = 0; i < resultData.length; i++) {
          const element = resultData[i];
          let li = document.createElement("li");

          li.innerText = element.name + ", " + element.age + (element.age > 1 ? " años." : " año.");
          list.append(li);
        }
      } else {
        // Si no hubo resultados
        queryStatus.textContent = "No hubo coincidencias."
      }

    } else {
      // Si se produjo un error
      queryStatus.textContent = `Error de consulta, status code ${this.status}`;
    }
  }, 2000);
});
