const express = require("express");
const app = express();

// Módulo "path" con funciones para resolver rutas de archivos con más facilidad
const path = require("path");

// Middleware para rutas a recursos estáticos
app.use(express.static(path.join(__dirname, "../client")));

// Endpoint GET a / (ruta raíz)
app.get("/", (req, res) => {
  // Cuando llega un request a la ruta raíz, retornamos la página inicial.
  res.status(200).sendFile(path.join(__dirname, "../client/index.html"));
});

// Endpoint GET a /person
app.get("/person", (req, res) => {

  // Consulto las personas de una función local definida más abajo
  const personList = getPersonList();

  console.log(req.query);
  // Evaluamos los query parameters
  // Si no vino ningún parámetro de búsqueda, devolvemos la lista entera
  let filtered = personList
  // Si vino un nombre, lo usamos para filtrar que "name" contenga ese dato
  if (req.query.name) {
    // Si se especificó que fuera sensible a mayúsculas
    if (req.query.caseSens){
      filtered = filtered.filter(item => item.name.includes(req.query.name));
    } 
    // Si se especificó que fuera el nombre exacto
    if (req.query.noPartial){
      filtered = filtered.filter(item => item.name === req.query.name);
    // Por defecto
    } else {
      filtered = filtered.filter(item => item.name.toUpperCase().includes(req.query.name.toUpperCase()));
    }
  } 
  // Si vino la edad mínima, la usamos para filtrar que "age" sea mayor o igual al parámetro
  if (req.query.minAge) {
    filtered = filtered.filter(item => item.age >= req.query.minAge);
  }

  // Envíamos los resultados de búsqueda
  res.status(200).send(filtered);

});

// Iniciamos el servidor en el puerto 3000
app.listen(3000, () => {
  // Callback cuando terminó de iniciar, simplemente ponemos un mensaje en la consola para saberlo
  console.log("Servidor iniciado en el puerto 3000...");
});


/**
 * Función que retorna una lista de personas
 */
function getPersonList() {

  return [
    {
      name: "Juana",
      age: 1
    },
    {
      name: "Juan",
      age: 33
    },
    {
      name: "Fernando",
      age: 24
    },
    {
      name: "Fernanda",
      age: 42
    },
    {
      name: "Juana",
      age: 16
    },
    {
      name: "Lucía",
      age: 22
    },
    {
      name: "Alfredo",
      age: 67
    },
    {
      name: "Gustavo",
      age: 50
    }
  ];

}