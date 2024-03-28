const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

const killCount = (function () {
  let megKillCount = undefined;
  if (fs.existsSync("killCount.json")) {
    megKillCount = Number(
      JSON.parse(fs.readFileSync("killCount.json", "utf-8"))
    );
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

  return { addKill, killTally, clearTally };
})();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("megs-kills")
    .setDescription(
      "Tracks the amount of times Meg has killed an innocent player"
    ),

  async execute(interaction) {
    const deaths = killCount.killTally();
    await interaction.reply({
      content: `Meg has killed ${deaths} amount of times today.`,
      ephemeral: false,
    });
  },
};
