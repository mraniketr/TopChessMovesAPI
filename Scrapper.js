const request = require("request-promise");
const cheerio = require("cheerio");

async function idGenerator(code) {
  const offset = { A: 0, B: 100, C: 200, D: 300, E: 400 };
  return offset[code.charAt(0)] + Number(code.substring(1)) + 1;
}

const URL = "https://www.chessgames.com/chessecohelp.html";
async function Scrapper(code) {
  const result = await request.get(URL);
  console.log(code);
  const $ = cheerio.load(result);
  const rowId = await idGenerator(code);
  const selectedData = $(`table>tbody>tr:nth-child(${rowId})`);
  const id = $($(selectedData).find("td")[0]).text();
  const name = $($(selectedData).find("td")[1]).find("b").text();
  const moves = $($(selectedData).find("td")[1]).find("font>font").text();

  //   console.log(selectedData);
  console.log(id, "---", name, "---", moves);
  return { name: name, moves: moves };
}

// Converts each record into individual json object and merges into a single array.
async function ScrapperAll() {
  const result = await request.get(URL);

  const $ = cheerio.load(result);
  const selectedData = [];
  $(`table>tbody>tr`).each((index, element) => {
    const id = $($(element).find("td")[0]).text();
    const name = $($(element).find("td")[1]).find("b").text();
    const moves = $($(element).find("td")[1]).find("font>font").text();
    // console.log(name);
    selectedData.push({ id: id, name: name, moves: moves });
  });
  return selectedData;
}
module.exports = { Scrapper, ScrapperAll };
