const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Detalle = new Schema({
  Libro: { type: Schema.Types.ObjectId, ref: "Libro", default: undefined },
  Cantidad: { type: Number, default: 1 },
  Formato: { type: String },
  });

const DetallePago = new Schema({
    Sucursal: {  type: String, default: undefined },
    Codigo: { type: Number, default: 0 },
  });
//Pedido Esquema
const pedidoSchema = new Schema({
    Id_usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },      
    Fecha_pedido: { type: Date },
    Fecha_llegada: { type: Date },
    No_rastreo: { type: Number, default:0 },
    Estado: { type: String },
    Pago:{
        type: DetallePago,
        default: () => ({})},
    Lista_lib:[{
        type: Detalle,
        default: () => ({}) 
    }],
    Monto: { type: Number },
    Detalle_entrega: { type: String},
});




module.exports = mongoose.model('Pedido', pedidoSchema,'Pedido'); 