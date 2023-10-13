const { unlinkSync, existsSync } = require("fs");
const { validationResult } = require("express-validator");
const { readJSON, writeJSON } = require("../../data")

module.exports = (req,res) => {

    const errors = validationResult(req);
    const products = readJSON("products.json");


    if (errors.isEmpty()) {
        const { title, price, category, discount, description, section} = req.body;
    
        const productsModify = products.map((product) => {
          if (product.id === req.params.id) {
            req.files.image &&
              existsSync(`./public/img/products/${product.image}`) &&
              unlinkSync(`./public/img/products/${product.image}`);
    
            req.files.images &&
              product.images.forEach(image => {
                existsSync(`./public/img/products/${image}`) &&
                  unlinkSync(`./public/img/products/${image}`);
              });
        
              product.title = title.trim();
              product.description = description.trim();
              product.price = +price;
              product.discount = +discount;
              product.category = category;
              product.section = section;
              (product.image = req.files.image ? req.files.image[0].filename : product.image),
              (product.images = req.files.images ? req.files.images.map((image) => image.filename) : product.images);
        }
        
        return product;
    })

    writeJSON(productsModify, 'products.json')

    
    return res.redirect('/admin')
}else {
    const categories = readJSON('categories.json');
    const sections = readJSON('sections.json');

    (req.files.image && existsSync(`./public/img/products/${req.files.image[0].filename }`)) && unlinkSync(`./public/img/products/${req.files.image[0].filename }`);

    if(req.files.images) {
        req.files.images.forEach(file => {
            existsSync(`./public/img/products/${file.filename}`) && unlinkSync(`./public/img/products/${file.filename}`)
        })
    } 

    const product = products.find(product => product.id === req.params.id)
    return res.render('productEdit',{
        errors: errors.mapped(),
        categories,
        sections,
        ...product
    })
  }
};