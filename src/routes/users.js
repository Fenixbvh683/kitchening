const express = require('express');
const { register, processRegister, login, processLogin, profile, update, logout } = require('../controllers/usersController');
const registerValidator = require('../validations/registerValidator');

const loginValidator = require('../validations/loginValidator');
const userCheck = require('../middlewares/userCheck');
const notUserCheck = require('../middlewares/notUserCheck');
const router = express.Router();

/* GET users listing. */
router
  .get('/register',notUserCheck, register)
  .post('/register',registerValidator, processRegister)
  .get('/login',notUserCheck, login)
  .post('/login',loginValidator, processLogin)
  .get('/profile',userCheck, profile)
  .put('/update', update)
  .get('/logout', logout)

module.exports = router;
