const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Carrito = new Schema({
    Libro: {  type: Schema.Types.ObjectId, ref: "Libro", default: undefined },
    Cantidad: { type: Number, default: 0 },
  });
//Pedido Esquema
const pedidoSchema = new Schema({
    Id_usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },    
    Id_usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },  
    Fecha_pedido: { type: Date },
    Fecha_llegada: { type: Date },
    No_rastreo: { type: Number },
    Estado: { type: String },
    Pago:{ type: Map, of: String },
    Monto: { type: Number },
    Lista_lib:[{
        type: Carrito,
        default: () => ({}) 
    }],
    Detalle_entrega: { type: String},
});




module.exports = mongoose.model('Pedido', pedidoSchema,'Pedido'); 