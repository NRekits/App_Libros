const router = require("express").Router();
const usuario = require("../Models/Usuario");
const libro = require("../Models/Libro");
const pedido = require("../Models/Pedido");
const Usuario = require("../Models/Usuario");
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

// constraseña
const bcrypt = require('bcrypt');

// validation
const Joi = require('@hapi/joi');
const schemaRegister = Joi.object({
	Nombre: Joi.string().min(2).max(255).required(),
	Apellido: Joi.string().min(2).max(255).required(),
	email: Joi.string().max(255).required().email(),
	contra: Joi.string().min(2).max(1024).required()
})
const schemaLogin = Joi.object({
	email: Joi.string().min(6).max(255).required().email(),
	contra: Joi.string().min(2).max(1024).required()
})

//Añadir usuario por registro
router.post("/Registro", async (req, res) => {
	try {
		// validate user
		const { error } = schemaRegister.validate(req.body)
		if (error) {
			return res.status(400).json({ error: error.details[0].message })
		}
		const isEmailExist = await Usuario.findOne({ Email: req.body.email });

		if (isEmailExist) {
			return res.status(400).json({ error: 'Email ya registrado' })
		}
		// hash contraseña
		const salt = await bcrypt.genSalt(10);
		const password = await bcrypt.hash(req.body.contra, salt);

		const user = new usuario({
			Nombre: req.body.Nombre,
			Apellido: req.body.Apellido,
			Contrasena: password,
			Email: req.body.email,
		});

		const savedUser = user.save();
		res.json({
			error: null,
			response: "Añadido",
			data: savedUser
		})


	} catch (error) {
		res.status(400).json({ error })
	}

});

//Añadir usuario por admi
router.post("/Insertar", async (req, res) => {
	try {
		console.log('hola')
		const isEmailExist = await Usuario.findOne({ Email: req.body.email });

		if (isEmailExist) {
			return res.status(400).json({ error: 'Email ya registrado' })
		}


		const user = new usuario({
			Nombre: req.body.Nombre,
			Apellido: req.body.Apellido,
			Contrasena: req.body.contra,
			Email: req.body.email,
			Admi: req.body.admi
		});

		const savedUser = user.save();
		console.log(savedUser)
		res.json({
			error: null,
			response: "Añadido",
			data: savedUser
		})


	} catch (error) {
		res.status(400).json({ error })
	}

});

//Login
router.post('/login', async (req, res) => {
	// validaciones
	const { error } = schemaLogin.validate(req.body);
	if (error) return res.status(400).json({ error: error.details[0].message })

	const user = await Usuario.findOne({ Email: req.body.email });
	if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

	const validPassword = await bcrypt.compare(req.body.contra, user.Contrasena);
	if (!validPassword) return res.status(400).json({ error: 'contraseña no válida' })

	try {
		// create token

		const token = jwt.sign({
			name: user.Nombre,
			id: user._id
		}, "secret");

		res.json({
			error: null,
			data: 'exito bienvenido',
			token: token,
			id: user._id,
			admi: user.Admi

		});

	} catch (e) {

		return status(400).json({ error: "Hubo un error en el login, por favor intenta de nuevo" })
	}



})

//Ver usuario
router.get("/Ver/:id", async (req, res) => {
	const id = req.params.id;
	const user = await Usuario.findById({ _id: id })

	try {
		// create token

		res.json({
			error: null,
			Id: user._id,
			Nombre: user.Nombre,
			Apellido: user.Apellido,
			Contrasena: user.Contrasena,
			Email: user.Email,
			Deseos: user.Deseos,
			Carrito: user.Carrito,
			Direccion: user.Direccion

		});

	} catch (e) {

		return status(400).json({ error: "Hubo un error, por favor intenta de nuevo" })
	}
});

//Modificar usuario
router.put("/Modificar/:id", (req, res) => {
	const id = req.params.id;
	const Nom = req.body.Nombre;
	const ape = req.body.Apellido;
	const Contra = req.body.contra;
	const Ema = req.body.email;
	const ad = req.body.admi;

	Usuario.findByIdAndUpdate(
		{ _id: id },
		{ $set: { Nombre: Nom, Apellido: ape, Contrasena: Contra, Email: Ema, Admi: ad } }
	)
		.then((doc) => {
			res.json({ response: "Usuario Modificado" });
		})
		.catch((err) => {
			console.log("error al cambiar", err.message);
		});
});

//Eliminar usuario
router.get("/Eliminar/:id", (req, res) => {
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
router.put("/InsertarDireccion/:id", (req, res) => {
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
router.put("/ModificarDireccion/:id_us/:id_dir", (req, res) => {

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
			console.log("error al cambiar", err);
		});
});

//Eliminar dirección
router.get("/EliminarDireccion/:id_us/:id_dir", (req, res) => {
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

//Ver todos los usuarios
router.get("/MostrarTodos", (req, res) => {

	Usuario.find({}).then((doc) => {
		res.json({ users: doc, error: null });
	})

});

//Ver contenido del carrito
router.get('/verCar_Wish/:id_us', (req, res) => {
  const id_us = req.params.id_us;
  const user = Usuario.findById({ _id: id_us })

  try {
    // create token

    res.json({
      error:null,
      Id:user._id,
      Email: user.Email,
      Deseos: user.Deseos,
      Carrito: user.Carrito,
      Direccion: user.Direccion
    });

}catch(e){
  
    return status(400).json({error: "Hubo un error, por favor intenta de nuevo"})
}
})

module.exports = router;
