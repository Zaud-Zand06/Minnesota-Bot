const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
require("dotenv").config();
const path = require("path");

const wordList = [
  "hnnnnnnnggg",
  "mmmppphhhh",
  "🤤🤤🤤🤤",
  "yummers",
  "...more....",
  "feeeeeeeet....",
  "feeeeeeeeeeeeeeeeeeet....",
  "feet!",
  "FEET!",
  "🤤🤤🤤🤤🤤",
  "🤤🤤🤤feeeeeet.....",
];

module.exports = {
  data: new SlashCommandBuilder()
    .setName("feeeeeet")
    .setDescription("yummy feeeeeeeeeet"),

  async execute(interaction) {
    const aidanFootPic = new AttachmentBuilder(
      path.join(__dirname, "../../aidanFoot.png"),
    );
    await interaction.reply({
      content: "mmmmmmmmmmmm",
      files: [aidanFootPic],
    });

    let words = [];
    for (let i = 0; i < 5; i++) {
      const wordIndex = Math.floor(Math.random() * wordList.length);
      words.push(wordList[wordIndex]);
    }
    for (let word of words) {
      await interaction.channel.send(word);
    }
  },
};
