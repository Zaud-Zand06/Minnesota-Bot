const fs = require("fs");

let megKillCount = undefined;
let mostRecentKill = undefined;

if (fs.existsSync("killCount.json")) {
  megKillCount = Number(JSON.parse(fs.readFileSync("killCount.json", "utf-8")));
} else {
  megKillCount = 0;
}

function addKill(number) {
  megKillCount += number;
  fs.writeFileSync("killCount.json", JSON.stringify(megKillCount), "utf-8");
}

function killTally() {
  return megKillCount;
}

function clearTally() {
  megKillCount = 0;
  fs.writeFileSync("killCount.json", JSON.stringify(megKillCount), "utf-8");
}

function addRecentKills(deaths, description, victim) {
  mostRecentKill = { deaths: deaths, description: description, victim: victim };
}

function getMostRecentKill() {
  return mostRecentKill;
}

module.exports = {
  addKill,
  killTally,
  clearTally,
  addRecentKills,
  getMostRecentKill,
};
