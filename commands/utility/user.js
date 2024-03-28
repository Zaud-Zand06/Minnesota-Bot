const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user")
    .setDescription("Provides user information."),

  async execute(interaction) {
    await interaction.reply(
      `this command was run by ${interaction.user.username}, who joined on ${interaction.member.joinedAt}.`
    );
  },
};
