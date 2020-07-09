'use strict'
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
var cors = require('cors')
app.use(cors())
app.options('*', cors());
var libro_routes = require('./routes/libroRoute');
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

//app.use('/api', persona_routes);
app.use('/api', libro_routes);


mongoose.connect('mongodb+srv://rodrigocs:rodrigo123@cluster0-ibqst.mongodb.net/desarrolloweb?retryWrites=true&w=majority', (err,res) => {

    if(err){
        console.log("Ocurrió un error al conectar con la base de datos")
    }

    app.listen(8000,()=>{
        console.log("Funcionando en puerto 8000")
    })

})



