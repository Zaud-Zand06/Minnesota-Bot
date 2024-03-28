const {
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
} = require("@discordjs/builders");
const { SlashCommandBuilder, TextInputStyle } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("meg-killed-me")
    .setDescription("adds to megs kill count"),

  async execute(interaction) {
    const modal = new ModalBuilder()
      .setCustomId("meg-killed-me")
      .setTitle("meg-kills-again");

    const deathNumber = new TextInputBuilder()
      .setCustomId("deathNumber")
      .setLabel("how many times did she get you?")
      .setPlaceholder("1")
      .setStyle(TextInputStyle.Short);

    const deathDescription = new TextInputBuilder()
      .setCustomId("deathDescription")
      .setLabel("How did she do it?")
      .setStyle(TextInputStyle.Paragraph);

    // An action row only holds one text input,
    // so you need one action row per text input.
    const firstActionRow = new ActionRowBuilder().addComponents(deathNumber);
    const secondActionRow = new ActionRowBuilder().addComponents(
      deathDescription
    );

    // Add inputs to the modal
    modal.addComponents(firstActionRow, secondActionRow);

    // Show the modal to the user
    await interaction.showModal(modal);
  },
};
