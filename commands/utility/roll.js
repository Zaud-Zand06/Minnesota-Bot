const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { data, execute } = require("./gameFinder");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription("Roll a dice.")
    .addIntegerOption((option) =>
      option
        .setName("how_many")
        .setDescription("Number of dice to roll.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("d")
        .setDescription("Number of sides on the dice.")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("plus")
        .setDescription("Modifier to add to the roll.")
        .setRequired(false)
    )
    .addIntegerOption((option) =>
      option
        .setName("minus")
        .setDescription("Modifier to subtract from the roll.")
        .setRequired(false)
    ),
  async execute(interaction) {
    let dice = interaction.options.getInteger("how_many");
    let sides = interaction.options.getInteger("d");
    let modifierAdd = interaction.options.getInteger("plus") || 0;
    let modifierSubtract = interaction.options.getInteger("minus") || 0;
    let rolls = [];
    let sum = 0;
    for (let i = 0; i < dice; i++) {
      let roll =
        Math.floor(Math.random() * sides) + 1 + modifierAdd - modifierSubtract;
      if (roll < 0) roll = 0;
      rolls.push(roll);
      sum += rolls[i];
    }
    if (modifierAdd > 0 || modifierSubtract > 0) {
      let embed = new EmbedBuilder()
        .setTitle(
          `Rolling ${dice} d${sides} (${
            modifierAdd > 0 ? "+ " + modifierAdd : ""
          } ${modifierSubtract > 0 ? "- " + modifierSubtract : ""})`
        )
        .setColor("#04d583")
        .addFields(
          { name: "rolls", value: rolls.join(", ") },
          { name: "sum", value: sum.toString() }
        );
      await interaction.reply({ embeds: [embed] });
    } else {
      let embed = new EmbedBuilder()
        .setTitle(`Rolling ${dice} d${sides}`)
        .addFields(
          { name: "rolls", value: rolls.join(", ") },
          { name: "sum", value: sum.toString() }
        );
      await interaction.reply({ embeds: [embed] });
    }
  },
};
