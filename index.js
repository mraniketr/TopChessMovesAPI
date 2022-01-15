const express = require("express");
const { Scrapper, ScrapperAll } = require("./Scrapper");
const app = express();

app.get("/", async (req, res) => {
  res.send(await ScrapperAll());
});

app.get("/:code", async (req, res) => {
  res.send(await Scrapper(req.params.code));
});

app.listen(3000);
