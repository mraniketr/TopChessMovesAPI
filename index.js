const express = require("express");
const { Scrapper, ScrapperAll, nextMove } = require("./Scrapper");
const app = express();

app.get("/", async (req, res) => {
  res.send(await ScrapperAll());
});

app.get("/:code/", async (req, res) => {
  out = await Scrapper(req.params.code);
  res.status(out === "INVALID_URL" ? 404 : 200).send(out);
});
app.get("/:code/*", async (req, res) => {
  res.send(await nextMove(req.params.code, req.path));
});

app.listen(3000);
