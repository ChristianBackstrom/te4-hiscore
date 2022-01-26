"use strict";

const slug = require("random-word-slugs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const game = await queryInterface.rawSelect(
      "Games",
      {
        where: {
          name: "Plants vs Zombies: Garden Warfare 2",
        },
      },
      ["id"]
    );
    for (let i = 0; i < 10; i++) {
      await queryInterface.bulkInsert("Scores", [
        {
          gameId: game,
          player: slug.generateSlug(),
          points: Math.random() * 1000,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ]);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Scores", null, {});
  },
};
