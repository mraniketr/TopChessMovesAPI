const express = require("express");
const { Scrapper, ScrapperAll, nextMove } = require("./Scrapper");
const app = express();

app.get("/", async (req, res) => {
  res.send(await ScrapperAll());
});

app.get("/:code/", async (req, res) => {
  console.log("ram");
  out = await Scrapper(req.params.code);
  res.status(out === "INVALID_URL" ? 404 : 200).send(out);
});
app.get("/:code/*", async (req, res) => {
  nextMove(req.params.code, req.path);
  res.send("LOADING");
});
app.listen(3000);
