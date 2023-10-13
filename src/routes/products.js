const express = require('express');
const {detail, add, create, edit, update, remove} = require('../controllers/productsController');
const productAddValidator = require('../validations/productAddValidator');
const productsEditValidator = require("../validations/productsEditValidator");
const upload = require("../middlewares/upload");
const adminCheck = require('../middlewares/adminCheck');
const router = express.Router();

/* /products */
router
    .get('/detail/:id', detail)
    .get('/add',adminCheck, add)
    .post('/add',upload.fields([
        {
            name : 'image'
        },
        {
            name : 'images'
        }
    ]), productAddValidator, create)
    .get('/edit/:id',adminCheck, edit)
    .put('/update/:id',upload.fields([
        {
            name : 'image'
        },
        {
            name : 'images'
        }
    ]),productsEditValidator,update)
    .delete('/remove/:id', remove)

module.exports = router;