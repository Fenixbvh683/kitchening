const { check, body } = require("express-validator");
const db = require("../database/models");

module.exports = [
  check("name")
    .isLength({
      min: 2,
    })
    .withMessage("El nombre es obligatorio")
    .isAlpha("es-ES")
    .withMessage("Solo letras"),
  check("surname")
    .isLength({
      min: 2,
    })
    .withMessage("El apellido es obligatorio")
    .isAlpha("es-ES")
    .withMessage("Solo letras"),
  
];