const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');


router.get('/', (req, res) => {
   userController.getUsers(req, res);
}).post('/', (req, res) => {
   userController.createUser(req, res);
}).get('/findById/:id', (req, res) => {
   userController.getUserById(req, res);
}).get('/getActive', (req, res) => {
   userController.getActive(req, res);
}).get('/getUsersByCashRange', (req, res) => {
   userController.getUsersByCashRange(req, res);
}).put('/updateCreditById/:id', (req, res) => {
   userController.updateCreditById(req, res);
})


module.exports = router;
