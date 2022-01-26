const express = require("express");
const router = express.Router();
const { Game, Score } = require("../../../models/");

//Get all games
router.get("/", async (req, res) => {
  const games = await Game.findAll();
  if (games.length === 0) {
    res.status(204).json("No games could be found");
    return;
  }

  res.status(200).json({ games });
});

//Get game with specific game id
router.get("/:id", async (req, res) => {
  const game = await Game.findByPk(req.params.id);

  if (!game) {
    res.status(204).json("Game could not be found");
    console.log("here");
    return;
  }
  res.status(200).json({ game });
});

//Add game to database
router.post("/", async (req, res) => {
  await Game.create({
    name: req.body.name,
    url: req.body.url,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.status(201).json("Game was added");
});

//Post score on specific game id
router.post("/:id/score", async (req, res) => {
  await Score.create({
    gameId: req.params.id,
    player: req.body.name,
    points: req.body.score,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  res.status(201).json("Score was added");
});

//get all scores on specific game id
router.get("/:id/scores", async (req, res) => {
  const scores = await Score.findAll({
    where: {
      gameId: req.params.id,
    },
    include: [
      {
        model: Game,
        attributes: ["name"],
      },
    ],
  });

  if (scores.length === 0) {
    res.status(204).json("No scores where found");
    return;
  }

  res.status(200).json(scores);
});

module.exports = router;
