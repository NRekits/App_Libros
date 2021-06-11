const router = require("express").Router();
const libro = require("../Models/Libro");
const pedido = require("../Models/Pedido");
const editorial = require("../Models/Editorial");
const Usuario = require("../Models/Usuario");
var mongoose = require('mongoose');


// validation
const Joi = require('@hapi/joi');

//Añadir Libro
router.post("/Insertar", async (req, res) => {
  try{

    const book = new libro({
        Titulo: req.body.titulo,
        Autor: req.body.autor,
        Id_editorial: mongoose.Types.ObjectId(req.body.editorial),
        Precio: req.body.precio,
        Cantidad_dis: req.body.cantidad,
        Fecha_adquision: req.body.fecha,
        Sinopsis:req.body.sinopsis,
        Genero: req.body.genero,
        // pendiente Imagen: { type:String },
        Formato:req.body.formato,
   
    });
  
    const savedBook = book.save();
    res.json({
      error: null,
      response: "Añadido",
      data: savedBook
      
  })
  console.log(savedBook)
   

} catch (error) {
  console.log(error.message)
    res.status(400).json({error})
}
 
});

//Ver libro
router.get("/Ver/:id", async (req, res) => {
  const id = req.params.id;
  libro.findById({ _id: id }).then((doc) => {
    res.json({ data: doc, error:null });
  })
   
});

//Ver libros por generos
router.get("/VerGenero/:genero", async (req, res) => {
    const genero = req.params.genero;
    libro.find({Genero:genero}).then((doc) => {
        res.json({ data: doc, error:null });
      })

  });

//Ver todos los libros
router.get("/VerTodos", async (req, res) => {
    libro.find({}).then((doc) => {
        res.json({ lib: doc, error:null });
      })

  });

//Ver libros por precio
router.get("/VerPrecio/:id", async (req, res) => {
    const id = req.params.id;
    libro.find({}).then((doc) => {
        res.json({ data: doc, error:null });
      })

  });

//Modificar libro
router.put("/Modificar/:id", (req, res) => {

  const id = req.params.id;
  const titu = req.body.titulo;
  const au = req.body.autor;
  const sinop = req.body.sinopsis;
  const gen = req.body.genero;
  const edit = req.body.editorial;
  const pre = req.body.precio;
  const cant = req.body.cantidad;
  const vend = req.body.vendidos;
 // pendiente const imag = req.body.imagen;
  const fecha = req.body.fecha;
  const format = req.body.formato;
  
  libro.findByIdAndUpdate(
    { _id: id },
    { $set: { Titulo: titu, Autor: au, Sinopsis:sinop, Genero: gen,
    Id_editorial: edit, Precio: pre,Cantidad_dis: cant,
   //pendiente Imagen: { type:String }
    Vendidos: vend, Fecha_adquision: fecha, Formato:format} }
  )
    .then((doc) => {
      res.json({ response: "Libro Modificado" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

//Eliminar libro
router.get("/Eliminar/:id", (req, res) => {
  const id = req.params.id;
  libro.findByIdAndDelete({ _id: id })
    .then((doc) => {
      res.json({ response: "Libro eliminado" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});


module.exports = router;