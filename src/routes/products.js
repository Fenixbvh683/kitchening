const express = require('express');
const {detail, add, create} = require('../controllers/productsController');
const router = express.Router();

/* /products */
router
    .get('/detail/:id?', detail)
    .get('/add', add)
    .post('/add', create)

module.exports = router;