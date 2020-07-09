'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema
const LibroSchema = Schema({
    nombre:String,
    autor: String,
    ano_publicacion:{type:Number},
    idioma:{type: String, enum:['Español','Inglés']}
})

module.exports = mongoose.model('libros',LibroSchema)

