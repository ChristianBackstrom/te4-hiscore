const app = require("../app");
const supertest = require("supertest");
const { Score, Game } = require("../models/");

beforeAll(async () => {
  await Game.sync({ force: true });
  await Score.sync({ force: true });
});

//TRY TO GET A LIST OF ALL GAMES WHEN NO GAMES IN DATABASE
test("GET /games", async () => {
  await supertest(app).get("/games").expect(204);
});

// GET GAME WITH SPECIFIC GAME ID THAT DOES NOT EXIST IN DATABASE
test("GET /games/:id", async () => {
  await supertest(app).get("/games/1").expect(204);
});

// GET LIST OF ALL GAMES
test("GET /games", async () => {
  await Game.create({
    name: "test",
    url: "test",
  });
  await supertest(app).get("/games").expect(200);
});

// GET GAME WITH SPECIFIC GAME ID
test("GET /games/:id", async () => {
  const game = await Game.create({
    name: "test",
    url: "test",
  });

  await supertest(app)
    .get("/games/" + game.id)
    .expect(200);
});

// ADD NEW GAME TO DATABASE
test("POST /games", async () => {
  const game = { name: "Test Game", url: "www.ThisIsATest.test" };

  await supertest(app).post("/games").send({ game }).expect(201);
});

// GET ALL SCORE FROM SPECIFIC GAME
test("GET /games/:id/scores", async () => {
  const score = await Score.create({ gameId: 1, player: "test", points: 202 });
  const url = "/games/" + score.gameId + "/scores";
  await supertest(app).get(url).expect(200);
});

// ADD NEW SCORE TO DATABASE
test("POST /games/:id/score", async () => {
  const score = await Score.create({
    gameId: 1,
    player: "test",
    points: 404,
  });

  await supertest(app)
    .post("/games/" + score.gameId + "/score")
    .send({ score })
    .expect(201);
});
