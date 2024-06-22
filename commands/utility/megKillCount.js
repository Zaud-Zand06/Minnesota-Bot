const { SlashCommandBuilder } = require("discord.js");
const fs = require("fs");

const { killTally, getMostRecentKill } = require("../../killCounter");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meg-kills")
    .setDescription(
      "Tracks the amount of times Meg has killed an innocent player"
    ),

  async execute(interaction) {
    const deaths = killTally();
    const recentDeath = getMostRecentKill();
    await interaction.reply({
      content: `Recently meg has killed ${recentDeath.victim} ${recentDeath.deaths} times by ${recentDeath.description},
      in total Meg has the blood of ${deaths} innocents on her hands...`,
      ephemeral: true,
    });
  },
};
