const express = require('express');
const mongoose = require('mongoose')
const bodyParser= require('body-parser');
const cors = require('cors');
const app = express();
const port =3000;
require('dotenv').config()


// Habilitar cors
app.use(cors());
// capturar body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));

//conexion 

mongoose.connect('mongodb://localhost:27017/Libros', {useFindAndModify:false,useCreateIndex: true,useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))


const conexion = mongoose.connection;
conexion.once('open',()=>{
  console.log('conexion exitosa');
})


const UserRoutes = require('./Routes/UsuarioCrud.js');
const BookRoutes = require('./Routes/LibroCrud.js');
const EditRoutes = require('./Routes/ProveedorCrud.js');
const DeliRoutes = require('./Routes/PedidoCrud.js');

app.use(UserRoutes);
app.use(BookRoutes);
app.use(EditRoutes);
app.use(DeliRoutes);

app.listen(port, function() {
  console.log(`Servidor web escuchando en el puerto ${port}`);
});
