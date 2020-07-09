'use strict'

var express = require('express');
var libroController = require ('../controllers/libroController');
var api = express.Router();

api.post('/libros',libroController.guardar);
api.get('/librosporID/:id',libroController.buscarPorID);
api.get('/libros',libroController.buscarPorIdiomaAno);
api.get('/libros/mostrar',libroController.listarTodos);
api.delete('/libros/eliminar/:id',libroController.eliminar);
api.put('/libros/modificar/:id',libroController.modificar);

module.exports = api;

