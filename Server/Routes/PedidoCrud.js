const router = require("express").Router();
const puppeteer = require("puppeteer");
const pedido = require("../Models/Pedido");
const ejs = require("ejs");
const path = require("path");

router.get("/TicketPDF", async (req, res) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setRequestInterception(true);
  page.on("request", (interceptedRequest) => {
    const data = {
      method: "GET",
      postData: JSON.stringify({ pedido: req.body.pedido }),
      headers: {
        ...interceptedRequest.headers(),
        "Content-Type": "application/json",
      },
    };
    interceptedRequest.continue(data);
  });
  const response = await page.goto(
    "http://localhost:3000/Pedido/GenerarPaginaTicket",
    {
      waitUntil: "networkidle0",
    }
  );
  const pdf = await page.pdf({
    printBackground: true,
    format: "letter",
  });
  await browser.close();
  res.send(pdf);
});

router.get("/GenerarPaginaTicket", async (req, res) => {
  const filePath = path.join(process.cwd(), "template", "report-template.ejs");
  ejs.renderFile(filePath, { pedido: req.body.pedido }, (err, html) => {
    if (err) {
      return res.status(400).json({ error: err });
    } else {
      res.send(html);
    }
  });
});


//Añadir usuario por admi
router.put("/Insertar/:id_us", async (req, res) => {
	try {
	  const isEmailExist = await Usuario.findOne({ Email: req.body.email });
  
	  if (isEmailExist) {
		return res.status(400).json({ error: "Email ya registrado" });
	  }
  
	  const user = new usuario({
		Nombre: req.body.Nombre,
		Apellido: req.body.Apellido,
		Contrasena: req.body.contra,
		Email: req.body.email,
		Admi: req.body.admi,
	  });
  
	  const savedUser = user.save();
	  console.log(savedUser);
	  res.json({
		error: null,
		response: "Añadido",
		data: savedUser,
	  });
	} catch (error) {
	  res.status(400).json({ error });
	}
  });
  

//Ver pedido
router.get("/Ver/:id_us/id_ped", async (req, res) => {
  const id = req.params.id;
  const user = await Usuario.findById({ _id: id });

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
      Direccion: user.Direccion,
    });
  } catch (e) {
    return status(400).json({
      error: "Hubo un error, por favor intenta de nuevo",
    });
  }
});

//Modificar pedido
router.put("/Modificar/:id_us/:id_ped", (req, res) => {
  const id = req.params.id;
  const Nom = req.body.Nombre;
  const ape = req.body.Apellido;
  const Contra = req.body.contra;
  const Ema = req.body.email;
  const ad = req.body.admi;

  Usuario.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        Nombre: Nom,
        Apellido: ape,
        Contrasena: Contra,
        Email: Ema,
        Admi: ad,
      },
    }
  )
    .then((doc) => {
      res.json({ response: "Usuario Modificado" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

//Cancelar pedido
router.put("/Cancelar/:id_us/:id_ped", (req, res) => {
	const id = req.params.id;
	const Nom = req.body.Nombre;
	const ape = req.body.Apellido;
	const Contra = req.body.contra;
	const Ema = req.body.email;
	const ad = req.body.admi;
  
	Usuario.findByIdAndUpdate(
	  { _id: id },
	  {
		$set: {
		  Nombre: Nom,
		  Apellido: ape,
		  Contrasena: Contra,
		  Email: Ema,
		  Admi: ad,
		},
	  }
	)
	  .then((doc) => {
		res.json({ response: "Usuario Modificado" });
	  })
	  .catch((err) => {
		console.log("error al cambiar", err.message);
	  });
  });

//Eliminar pedido
router.get("/Eliminar/:id_us/:id_ped", (req, res) => {
  const id = req.params.id;
  Usuario.findByIdAndDelete({ _id: id })
    .then((doc) => {
      res.json({ response: "Eliminado" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

module.exports = router;
