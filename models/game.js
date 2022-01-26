"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate(models) {
      Game.hasMany(models.Score, {
        foreignKey: "gameId",
      });
    }
  }
  Game.init(
    {
      name: DataTypes.STRING,
      url: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
