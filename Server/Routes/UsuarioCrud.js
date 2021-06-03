const router = require("express").Router();
const usuario = require("../Models/Usuario");
const libro = require("../Models/Libro");
const pedido = require("../Models/Pedido");
const editorial = require("../Models/Editorial");
const Usuario = require("../Models/Usuario");
var mongoose = require('mongoose');

//Añadir usuario
router.post("/Usuario/Registro", (req, res) => {
  console.log("hola");
  const user = new usuario({
    Nombre: req.body.Nombre,
    Apellido: req.body.Apellido,
    Contrasena: req.body.contra,
    Email: req.body.email,
  });

  const savedUser = user.save();
  res.json({ response: "Añadido" });
});

//Modificar usuario
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
      res.json({ response: "Usuario Modificado" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

//Eliminar usuario
router.get("/Usuario/Eliminar/:id", (req, res) => {
  const id = req.params.id;
  Usuario.findByIdAndDelete({ _id: id })
    .then((doc) => {
      res.json({ response: "Eliminado" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

//Añadir dirección
router.put("/Usuario/InsertarDireccion/:id", (req, res) => {
  const id = req.params.id;
  const pais = req.body.pais;
  const estado = req.body.estado;
  const ciudad = req.body.ciudad;
  const colonia = req.body.colonia;
  const calle = req.body.calle;
  const numero_int = req.body.num;
  const codigo = req.body.cod;

  Usuario.findByIdAndUpdate(
    { _id: id },
    {
      $push: {
        Direccion: {
          Pais: pais,
          Estado: estado,
          Ciudad: ciudad,
          Colonia: colonia,
          Calle: calle,
          Numero_int: numero_int,
          Codigo_postal: codigo,
        },
      },
    }
  )
    .then((doc) => {
      res.json({ response: "Dirección agregada" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

//Modificar dirección
router.put("/Usuario/ModificarDireccion/:id_us/:id_dir", (req, res) => {

  const id = req.params.id_us;
  const id_dir = mongoose.Types.ObjectId(req.params.id_dir);
  const pais = req.body.pais;
  const estado = req.body.estado;
  const ciudad = req.body.ciudad;
  const colonia = req.body.colonia;
  const calle = req.body.calle;
  const numero_int = req.body.num;
  const codigo = req.body.cod;

  Usuario.updateOne(
    { _id: id, 'Direccion._id': id_dir },
    {
      $set: {
        'Direccion.$': {
          Pais: pais,
          Estado: estado,
          Ciudad: ciudad,
          Colonia: colonia,
          Calle: calle,
          Numero_int: numero_int,
          Codigo_postal: codigo,
        },
        }
    }
     
  
  )
    .then((doc) => {
      res.json({ response: "Direccion modificada" });
    })
    .catch((err) => {
      console.log("error al cambiar", err );
    });
});

//Eliminar dirección
router.get("/Usuario/EliminarDireccion/:id_us/:id_dir", (req, res) => {
  const id = req.params.id_us;
  const id_dir = req.params.id_dir;
  Usuario.updateOne(
    { _id: id },
    { $pull: { Direccion: { _id: id_dir } } }
  )
    .then((doc) => {
      res.json({ response: "Dirección eliminada" });
    })
    .catch((err) => {
      console.log("error al eliminar", err.message);
    });
});

router.post("/Usuario/MostrarTodos", (req, res) => {});

module.exports = router;
