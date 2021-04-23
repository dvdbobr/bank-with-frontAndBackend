const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');


router.get('/', (req, res) => {
   userController.getUsers(req, res);
}).post('/', (req, res) => {
   userController.createUser(req, res);
}).get('/findById/:id', (req, res) => {
   userController.getUserById(req, res);
// }).get('/getActive', (req, res) => {
//    userController.getActive(req, res);
// }).get('/getPriceRange', (req, res) => {
//    userController.getRange(req, res);
// }).patch('/patchById/:id', (req, res) => {
//    userController.updateUserById(req, res);
// }).delete('/deleteById/:id', (req, res) => {
//    userController.deleteUserById(req, res);
// }).delete('/delete', (req, res) => {
//    userController.deleteUsers(req, res);
})


module.exports = router;
