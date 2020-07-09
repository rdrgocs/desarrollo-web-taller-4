'use strict'

var express = require('express');
var personaController = require('../controllers/personaController');
var api = express.Router();
// api.get('/pruebas',personaController.guardar);
api.post('/persona',personaController.validar);

module.exports = api;