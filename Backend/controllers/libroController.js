'use strict'

var Libro = require('../modulos/libro.js');

function guardar(req,res){

    let libro = new Libro()
    libro.nombre = req.body.nombre
    libro.autor = req.body.autor
    libro.ano_publicacion = req.body.ano_publicacion
    libro.idioma = req.body.idioma

    libro.save((err, libroStore) => {
        if (err) res.status(500).send(`Error en la BD> ${err}`)
        res.status(200).send({libro:libroStore})
    })
}

 function buscarPorIdiomaAno(req,res){
     let idiomareq = req.query.idioma;
     let anoreq = req.query.ano_publicacion;
     //anoreq = parseInt(anoreq);
     Libro.find({idioma: idiomareq, ano_publicacion: anoreq}, (err,libro) => {
         if (!libro) return res.status(404).send({message: 'El libro no existe'})
         res.status(200).send({libro})
     })
 }

 function buscarPorID(req, res) {

     let idlibro = req.params.id
     Libro.findById(idlibro,(err,libro)=>{
         if(err) return res.status(500).send({message:'error al realizar la peticion'})
         if(!libro) return res.status(404).send({message:'Error el libro no se encuentra registrado'})
          res.status(200).send({libro})
      })
 }

 function listarTodos(req, res) {

     Libro.find({},(err,libro)=>{
         if(err) return res.status(500).send({message:'error al realizar la peticion'})
         if(!libro) return res.status(404).send({message:'No hay libros registrados'})

          res.status(200).send({libro})
      })
 }

 function eliminar(req, res){
    let idlibro = req.params.id
    Libro.findById(idlibro,(err,libro) => {
        if(err) res.status(500).send({message: `Error al borrar el libro: ${err}`})

        libro.remove(err => {
            if(err) res.status(500).send({message: `Error al borrar el libro: ${err}`})
            res.status(200).send({message: `El libro ha sido eliminado con exito`})
        })
        })
    }

    function modificar(req, res){
        let idlibro = req.params.id
        let modificacion = req.body

        Libro.findByIdAndUpdate(idlibro, modificacion, (err,libroModificado) => {
            if (err) res.status(500).send({message: `Error al modificar el libro: ${err}`})

            Libro.findById(idlibro,(err,libro)=>{
                 res.status(200).send({libro})
             })
            //res.status(200).send({libro: libroModificado})
        })
            
        }
 


module.exports = {
     guardar,
     buscarPorIdiomaAno,
     buscarPorID,
     listarTodos,
     eliminar,
     modificar
}