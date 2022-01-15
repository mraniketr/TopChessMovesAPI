const request = require("request-promise");
const cheerio = require("cheerio");

async function idGenerator(code) {
  const offset = { A: 0, B: 100, C: 200, D: 300, E: 400 };
  return offset[code.charAt(0)] + Number(code.substring(1)) + 1;
}

async function generateObj($, selectedData) {
  const id = $($(selectedData).find("td")[0]).text();
  const name = $($(selectedData).find("td")[1]).find("b").text();
  const moves = $($(selectedData).find("td")[1]).find("font>font").text();
  return { id: id, name: name, moves: moves };
}
const URL = "https://www.chessgames.com/chessecohelp.html";
async function Scrapper(code) {
  try {
    const result = await request.get(URL);
    //   console.log(code);
    const $ = cheerio.load(result);
    const rowId = await idGenerator(code);
    const selectedData = $(`table>tbody>tr:nth-child(${rowId})`);

    resultObj = await generateObj($, selectedData);

    console.log(resultObj.id, "---", resultObj.name, "---", resultObj.moves);
    return { name: resultObj.name, moves: resultObj.moves };
  } catch (e) {
    console.log(e);
    return "INVALID_URL";
  }
}

// Converts each record into individual json object and merges into a single array.
async function ScrapperAll() {
  const result = await request.get(URL);

  const $ = cheerio.load(result);
  const selectedData = [];
  $(`table>tbody>tr`).each(async (index, element) => {
    resultObj = await generateObj($, element);
    selectedData.push(resultObj);
  });
  return selectedData;
}

async function nextMove(code, moves) {
  console.log(code);
  console.log(moves.substring(4));
}
module.exports = { Scrapper, ScrapperAll, nextMove };
