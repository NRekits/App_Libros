const express = require('express');
const mongoose = require('mongoose')
const bodyParser= require('body-parser');
const app = express();
const port =3000;

mongoose.connect('mongodb://localhost:27017/react', {useNewUrlParser:true, useUnifiedTopology:true});

const conexion = mongoose.connection;
conexion.once('open',()=>{
  console.log('conexion exitosa');
});

const Alumno= mongoose.model('alumno', {nombre:String});
//app.use(express.static(__dirname + '/public/'));
app.use(express.static('/curso',express.static( './index.html')));

app.get('/consultar', (req,res)=>{
Alumno.find().then(doc=>{
  res.json({data:doc})
}).catch(err=>{
  console.log("error",err.message);
})

})
app.listen(port, function() {
  console.log('Servidor web escuchando en el puerto 3000');
});
