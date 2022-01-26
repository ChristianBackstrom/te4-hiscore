const express = require("express");
const router = express.Router();
const { Score, Game } = require("../../../models/");

router.get("/", async (req, res) => {
  res.json("scores");
});

router.get("/:id", async (req, res) => {
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
    res.json("No scores found");
  } else {
    res.json(scores);
  }
});

module.exports = router;
