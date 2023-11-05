'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('Users', [
        {
        name : "Jorge",
        surname : "Lesme",
        email: "manidelabk031@gmail.com",
        password: "$2a$10$kN7Tv1Pc00KfssMp1BVbh.6aAx7WLGWzebIF4V.Sa3y6rwB/LOEDS",
        roleId: 1,
        birthday : null,
        createdAt : new Date,
        updatedAt : new Date,
        
      },
      {
        name : "Usuario",
        surname : "Comun",
        email: "mapita@gmail.com",
        password: "$2a$10$kN7Tv1Pc00KfssMp1BVbh.6aAx7WLGWzebIF4V.Sa3y6rwB/LOEDS",
        roleId: 2,
        birthday : null,
        createdAt : new Date,
        updatedAt : new Date,
        
      }
    ], {});
    
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Users', null, {});
     
  }
};
