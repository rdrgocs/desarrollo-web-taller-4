'use strict'
 
// AQUI Cargamos el modelo para usarlo posteriormente en la siguiente clase
//var Persona = require('../models/persona');
 
// Creamos un método en el controlador, en este caso una accion de pruebas
function validar(req, res){
    let rut = req.body.rut;
    let nombre = req.body.nombre;
    let apellido = req.body.apellido;
    let direccion = req.body.direccion;
    let comuna = req.body.comuna;
    let ciudad = req.body.ciudad;
    let pais = req.body.pais;
    let fecha_de_nacimiento = req.body.fecha_de_nacimiento;

     if(rut){
         if(nombre){
             if(apellido){
                 if(direccion){
                     if(comuna){
                         if(ciudad){
                             if(pais){
                                 if(fecha_de_nacimiento){
                                     res.status(200).send({persona:req.body})
                                 }
                             }else{
                                 res.status(400).send("No se ingresó un país")
                             }
                         }else{
                             res.status(400).send("No se ingresó una ciudad")
                         }
                     }else{
                         res.status(400).send("No se ingresó una comuna")
                     }
                 }else{
                     res.status(400).send("No se ingresó una dirección")
                 }
             }else{
                 res.status(400).send("No se ingresó un apellido")
             }
         }else{
             res.status(400).send("No se ingresó un nombre")
         }
     }else{
         res.status(400).send("No se ingresó un rut")
     }

    
}

 
// Exportamos las funciones en un objeto json para poder usarlas en otros fuera de este fichero
module.exports = {
    validar
};
