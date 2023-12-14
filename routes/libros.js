const express = require("express");
const route = express.Router();
const libros = require("../data");

// Obtener la base de datos completa de libros
route.get("/", (req, res, next) => {
  try {
    res.json(libros)
  } catch (err) {
    next(err);
  }
});

// Obtener un libro por id
route.get("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const libro = libros.find((l) => l.id === id);
    
    if (!libro) {
      const error = new Error('Libro no encontrado');
      error.status = 404;
      throw error;
    }

    res.json(libro);
  } catch (err) {
    next(err);
  }
});

// Añardir un nuevo libro a la base de datos
route.post("/", (req, res, next) => {
  try {
    const { nombre, autor, paginas } = req.body;

    const nuevoLibro = {
      id: libros.length + 1,
      nombre,
      autor,
      paginas,
    };

    libros.push(nuevoLibro);
    res.status(201).json(nuevoLibro)
  } catch (err) {
    next(err);
  }
});

// Actualizar los datos de un libro
route.put("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const { nombre, autor, paginas } = req.body;

    const libro = libros.find((l) => l.id === id);

    if (!libro) {
      const error = new Error ('Libro no encontrado');
      error.status = 404;
      throw error;
    }

    libro.nombre = nombre || libro.nombre;
    libro.autor = autor || libro.autor;
    libro.paginas = paginas || libro.paginas;

    res.json(libro)
  } catch (err) {
    next(err);
  }
});


// Eliminar un libro
route.delete("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const index = libros.findIndex((l) => l.id === id);

    if (index === -1) {
      const error = new Error('Producto no encontrado');
      error.status = 404;
      throw error;
    }

    const libroeliminado = libros.splice(index, 1);
    res.json(libroeliminado[0])
  } catch (err) {
    next(err);
  }
});

module.exports = route;
