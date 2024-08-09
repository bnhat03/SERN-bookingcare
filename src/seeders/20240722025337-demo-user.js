'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert(
      'User', // table
      [ // list record
        {
         email: 'biennhat@gmai.com',
         password: "123456",
         username: "nhatdaica"
        },
        {
          email: 'viethoang@gmai.com',
          password: "123456",
          username: "hoangcolen"
         },
         {
          email: 'hoaithuong@gmai.com',
          password: "123456",
          username: "thuongcolen"
         },
      ], 
      {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
