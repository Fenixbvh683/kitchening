'use strict';

const categoriasArray = ['Carnes', 'Pescados y Mariscos', 'Pastas', 'Sopas', 'Desayunos y Meriendas', 'Bebidas', 'Guarniciones']
const categoriasDB = categoriasArray.map(categoria => {
  return {
    name : categoria,
    createdAt : new Date,
    updatedAt : new Date,
  }
})

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Categories', categoriasDB, {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Categories', null, {});
     
  }
};