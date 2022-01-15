const express = require("express");
const { Scrapper, ScrapperAll, nextMove } = require("./Scrapper");
const app = express();

app.use((req, res, next) => {
  res.set("Cache-control", `public, max-age=180`);
  next();
});

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
