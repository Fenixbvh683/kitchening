
//const { readJSON, writeJSON } = require("../../data");
const { v4 : uuidv4 } = require('uuid');
const Product = require("../../data/Product");


module.exports = (req,res) => {

    //const products = readJSON('products.json');

    const newProduct = new Product(req.body);

    //products.push(newProduct);

    console.log(newProduct);

    //writeJSON(products, 'products.json')

    return res.send(req.body)

    //return res.redirect('/admin')
}