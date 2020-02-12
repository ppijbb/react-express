'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Users', [{
        userID: 'ID1',
        userPW: 'pw1',
        createdAt:'2020-02-12',
        updatedAt:'2020-02-12'
      },{
        userID: 'ID2',
        userPW: 'pw2',
        createdAt:'2020-02-12',
        updatedAt:'2020-02-12'
      },{
        userID: 'ID3',
        userPW: 'pw3',
        createdAt:'2020-02-12',
        updatedAt:'2020-02-12'
      }]);

    },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users',null,{});
  }
};
