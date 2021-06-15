const router = require("express").Router();
const puppeteer = require("puppeteer");
const pedido = require("../Models/Pedido");
const usuario = require("../Models/Usuario");
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

//Añadir pedido
router.put("/Insertar/:id_us", async (req, res) => {
  const idus = req.params.id_us;
  try {
    const ped = new pedido({
      Id_usuario: idus,
      Fecha_pedido: req.body.fechap,
      Fecha_llegada: req.body.fechal,
      Estado: req.body.estado,
      Pago: req.body.pago,
      Lista_lib: req.body.carrito,
      Monto: req.body.monto,
      Detalle_entrega: req.body.det,
    });

    const savedPed = ped.save();
    console.log(savedPed);
    /* para borrar el carrito
    usuario.findByIdAndUpdate(
      { _id: idus },
      {
        $set: { },
      }
    )
  */

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
  const idus = req.params.id_us;
  const idped = req.params.id_ped;

  pedido.findOne({ _id: idped, Id_usuario: idus }).then((doc) => {
    res.json({ ped: doc, error: null });
  });
});


//Ver todos los pedidos de un usuario
router.get("/Ver/:id_us", async (req, res) => {
  const idus = req.params.id_us;
  pedido.find({ Id_usuario: idus }).then((doc) => {
    res.json({ ped: doc, error: null });
  });
});

//Cancelar pedido
router.put("/Cancelar/:id_us/:id_ped", (req, res) => {
  const idus = req.params.id_us;
  const idped = req.params.id_ped;
  const est = "Cancelado";
  const num = 0;
  //pendiente hacerla null
  const fechal = req.body.fechal;

  pedido
    .findByIdAndUpdate(
      { _id: idped, Id_usuario: idus },
      {
        $set: {
          Estado: est,
          No_rastreo: num,
          Fecha_llegada: fechal,
        },
      }
    )
    .then((doc) => {
      res.json({ response: "pedido Modificado" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

//Devolver pedido
router.put("/Devolver/:id_us/:id_ped", (req, res) => {
  const idus = req.params.id_us;
  const idped = req.params.id_ped;
  const est = "Devolucion";
  const num = 0;
  //pendiente hacerla null
  const fechal = req.body.fechal;

  pedido.findOneAndUpdate(
      { _id: idped, Id_usuario: idus },
      {
        $set: {
          Estado: est,
          No_rastreo: num,
          Fecha_llegada: fechal,
        },
      }
    )
    .then((doc) => {
      res.json({ response: "pedido Modificado" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

//Admi crud

//Ver un pedido
router.get("/VerPedido/:idped", async (req, res) => {
  
  const idped = req.params.id_ped;

  pedido.findById({_id: idped}).then((doc) => {
    res.json({ ped: doc, error: null });
  });
});

//Ver uno de los pedidos
router.get("/VerPedidoTodos", async (req, res) => {
  pedido.find({}).then((doc) => {
    res.json({ ped: doc, error: null });
  });
});

//Modificar pedido
router.put("/Modificar/:id_ped", (req, res) => {

  const idped = req.params.id_ped;
  const est = req.body.estado;
  const num = req.body.rastreo;
  const fechal = req.body.fechal;

  pedido
    .findByIdAndUpdate(
      { _id: idped},
      {
        $set: {
          Estado: est,
          No_rastreo: num,
          Fecha_llegada: fechal,
        },
      }
    )
    .then((doc) => {
      res.json({ response: "pedido Modificado" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

//Eliminar pedido
router.get("/Eliminar/:id_ped", (req, res) => {
  const idped = req.params.id_ped;
  pedido.findByIdAndDelete({ _id: idped })
    .then((doc) => {
      res.json({ response: "Eliminado" });
    })
    .catch((err) => {
      console.log("error al cambiar", err.message);
    });
});

module.exports = router;
