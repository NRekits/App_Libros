const mongoose = require("mongoose");
const Schema = mongoose.Schema;


//Libro esquema
const libroSchema = new Schema({
    Titulo: { type: String },
    Autor: { type: String },
    Id_editorial: { type: Schema.Types.ObjectId, ref: "Editorial", default: undefined },
    Precio: { type: Number },
    Cantidad_dis: { type:Number },
    Fecha_adquision: { type: Date }
});

module.exports = mongoose.model('Libro', libroSchema,'Libro');


