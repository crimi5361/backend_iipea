const express=require('express');
const route = express.Router();
const controller = require('../Controllers/compus.controller');


route.get('/', controller.getAllCampus);
route.post('/',controller.addCampus);
route.delete('/:id', controller.deleteCampus);

module.exports = route;
