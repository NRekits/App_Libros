const router = require("express").Router();
const usuario = require("../Models/Usuario");
const libro = require("../Models/Libro");
const pedido = require("../Models/Pedido");
const editorial = require("../Models/Editorial");
const Usuario = require("../Models/Usuario");

router.post("/Usuario/Registro", (req, res) => {
  console.log("hola");
  const user = new usuario({
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Contrasena: req.body.contra,
    Email: req.body.email,
  });

  const savedUser = user.save();
  res.json({
    error: null,
    data: savedUser,
  });
});

router.put("/Usuario/InsertarDireccion/:id", (req, res) => {
  const id = req.params.id;
  Usuario.findByIdAndUpdate(
    { _id: id },
    { $push: { 'Direccion': {
       Pais: "México",} } }
  )
    .then((doc) => {
      res.json({ response: "ok" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

router.put("/Usuario/Modificar/:id", (req, res) => {
  const id = req.params.id;
  const Nom = req.body.Nombre;
  const ape = req.body.Apellido;
  const Contra = req.body.contra;
  const Ema = req.body.email;
  Usuario.findByIdAndUpdate(
    { _id: id },
    { $set: { Nombre: Nom, Apellido: ape, Contrasena: Contra, Email: Ema } }
  )
    .then((doc) => {
      res.json({ response: "ok" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

router.get("/Usuario/Eliminar/:id", (req, res) => {
  Usuario.findByIdAndUpdate({ _id: id })
    .then((doc) => {
      res.json({ response: "ok" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

router.post("/Usuario/MostrarTodos", (req, res) => {});

module.exports = router;
