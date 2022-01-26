"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Games",
      [
        {
          name: "Plants vs Zombies: Garden Warfare 2",
          url: "https://stackoverflow.com/questions/64439465/how-to-update-mkdir-in-order-to-install-express-generator-without-warnings",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Games", null, {});
  },
};
