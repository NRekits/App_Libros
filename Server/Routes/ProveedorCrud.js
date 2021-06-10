const router = require("express").Router();
const editorial = require("../Models/Editorial");
var mongoose = require('mongoose');


// validation
const Joi = require('@hapi/joi');

//Añadir editorial
router.post("/Editorial/Insertar", async (req, res) => {
  try{
    const edit = new editorial({
        Nombre_encargado: req.body.nomencargado,
        Ape_encargado: req.body.apeencargado,
        Nombre_editorial: req.body.nomedit,
        Email: req.body.email,
        Tel:req.body.tel,
   
    });
  
    const savedEdit = edit.save();
    res.json({
      error: null,
      response: "Añadido",
      data: savedEdit
  })
   

} catch (error) {
    res.status(400).json({error})
}
 
});

//Ver editorial
router.get("/Editorial/Ver/:id",  (req, res) => {
  const id = req.params.id;
  editorial.findById({ _id: id }).then((doc) => {
    res.json({ data: doc, error:null });
  })
   
});

//Ver todas las editoriales
router.get("/Editorial/VerTodos",  (req, res) => {
    editorial.find({}).then((doc) => {
        res.json({ data: doc, error:null });
      })

  });

//Modificar editorial
router.put("/Editorial/Modificar/:id", (req, res) => {

  const id = req.params.id;
  const nome = req.body.nomencargado;
  const apee = req.body.apeencargado;
  const nom =  req.body.nomedit;
  const ema = req.body.email;
  const tel = req.body.tel;

  libro.findByIdAndUpdate(
    { _id: id },
    { $set: {   Nombre_encargado: nome, Ape_encargado:apee,
        Nombre_editorial: nom, Email: ema, Tel: tel}})
    .then((doc) => {
      res.json({ response: "Editorial Modificado" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

//Eliminar editorial
router.get("/Editorial/Eliminar/:id", (req, res) => {
  const id = req.params.id;
  editorial.findByIdAndDelete({ _id: id })
    .then((doc) => {
      res.json({ response: "Editorial eliminada" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});


module.exports = router;