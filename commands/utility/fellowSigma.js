const { SlashCommandBuilder } = require("discord.js");
const path = require("path");
const wolfHowl = path.join(__dirname, "../../pics/wolfHowl.png");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("heh")
    .setDescription("i understand hehe...."),

  async execute(interaction) {
    await interaction.reply({
      content:
        "heh.... i really understand what you mean.... signams like us... stick togerther!!! AWOOOOOOOOOOOOOO!",
    });
    await interaction.channel.send({
      content: "AWOOOOOOOOO!!!!!!!",
      files: [wolfHowl],
    });
  },
};
