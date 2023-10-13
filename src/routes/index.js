const express = require('express');
const { index, admin } = require('../controllers/indexController');
const adminCheck = require('../middlewares/adminCheck');
const router = express.Router();

/* GET home page. */
router.get('/', index);
router.get('/admin', adminCheck, admin)

module.exports = router;
