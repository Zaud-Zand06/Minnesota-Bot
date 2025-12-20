const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pingler")
    .setDescription("for getting someones attention")
    .addUserOption((option) =>
      option.setName("who").setDescription("who do you need").setRequired(true),
    )
    .addIntegerOption((option) =>
      option
        .setName("count")
        .setDescription("how many times to ping")
        .setRequired(true),
    ),

  async execute(interaction) {
    const target = interaction.options.getMember("who").id;
    const pingAmount = interaction.options.getInterget("count");
    if (pingAmount > 25) {
      return interaction.reply({
        content: "too many pings! max is 25",
        ephemeral: true,
      });
    } else {
      await interaction.reply({ content: "pinging....", ephemeral: true });
      for (let i = 0; i < pingAmount; i++) {
        await interaction.channel.send({ content: `<@${target}>` });
      }
    }
  },
};
