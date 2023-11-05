const {check, body} = require('express-validator');



module.exports = [
    check('title')
        .notEmpty().withMessage('El titulo del producto es obligatorio')
        .bail()
        .isLength({
            min : 4,
            max : 50
                }).withMessage('Caracteres entre 4 y 50'),
    check('categoryId')
        .notEmpty().withMessage('La categoria del producto es obligatorio'),
    check('sectionId')
        .notEmpty().withMessage('La seccion del producto es obligatorio'),
    check('price')
        .notEmpty().withMessage('El precio del producto es obligatorio')
        .isInt({
            gt: 1
                }).withMessage('Debe ser un numero positivo'),
    
    check('description')
        .notEmpty().withMessage('La descripcion del producto es obligatorio')
        .isLength({
            min : 5, 
            max : 500
                }).withMessage('Caracteres entre 20 y 500'),
        body('image')
                .custom((value,{req}) => {
                    if(req.files.image){
                        return true
                    }
                    return false
                }).withMessage('Imagen pricipal obligatoria'),
];