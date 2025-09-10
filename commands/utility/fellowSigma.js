const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();
const path = require("path");
const wolfHowl = path.join(__dirname, "../../pics/wolfHowl.png");
const myId = "267094035506659338";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("heh")
    .setDescription("i understand hehe...."),

  async execute(interaction) {
    const target = interaction.user.id;
    if (target == myId) {
      await interaction.reply({
        content:
          "heh.... i really understand what you mean.... signams like us... stick togerther!!! AWOOOOOOOOOOOOOO!",
      });
      await interaction.channel.send({
        content: "AWOOOOOOOOO!!!!!!!",
        files: [wolfHowl],
      });
    } else {
      await interaction.reply({
        content:
          "you would never understand someone like me... heh..... i know your type.....",
      });
    }
  },
};
