const { SlashCommandBuilder } = require("discord.js");
const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("would-u-rather")
    .setDescription("what would u rather")
    .addStringOption((option) =>
      option.setName("choice1").setDescription("your choice").setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("choice2")
        .setDescription("your other choice")
        .setRequired(true)
    ),

  async execute(interaction) {
    const choice1 = interaction.options.getString("choice1");
    const choice2 = interaction.options.getString("choice2");

    // Store votes in a Map
    const votes = new Map();
    votes.set("choice1", { count: 0, voters: new Set() });
    votes.set("choice2", { count: 0, voters: new Set() });

    // Function to create/update the embed
    const createEmbed = () => {
      const choice1Votes = votes.get("choice1").count;
      const choice2Votes = votes.get("choice2").count;
      const totalVotes = choice1Votes + choice2Votes;

      return new EmbedBuilder()
        .setTitle("Would You Rather")
        .setDescription(`Would you rather **${choice1}** or **${choice2}**?`)
        .addFields(
          {
            name: `${choice1}`,
            value: `${choice1Votes} votes${
              totalVotes > 0
                ? ` (${Math.round((choice1Votes / totalVotes) * 100)}%)`
                : ""
            }`,
            inline: true,
          },
          {
            name: `${choice2}`,
            value: `${choice2Votes} votes${
              totalVotes > 0
                ? ` (${Math.round((choice2Votes / totalVotes) * 100)}%)`
                : ""
            }`,
            inline: true,
          }
        )
        .setColor(0x5865f2)
        .setFooter({ text: `Total votes: ${totalVotes}` });
    };

    // Create voting buttons
    const row = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId("vote_choice1")
        .setLabel(choice1)
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("vote_choice2")
        .setLabel(choice2)
        .setStyle(ButtonStyle.Primary)
    );

    const response = await interaction.reply({
      embeds: [createEmbed()],
      components: [row],
      fetchReply: true,
    });

    // Create a collector for button interactions
    //time in ms
    const collector = response.createMessageComponentCollector({
      time: 600000, // 10 minutes
    });

    collector.on("collect", async (buttonInteraction) => {
      const userId = buttonInteraction.user.id;
      const voteChoice =
        buttonInteraction.customId === "vote_choice1" ? "choice1" : "choice2";
      const otherChoice = voteChoice === "choice1" ? "choice2" : "choice1";

      // Check if user already voted
      const userVotedChoice1 = votes.get("choice1").voters.has(userId);
      const userVotedChoice2 = votes.get("choice2").voters.has(userId);

      if (userVotedChoice1 || userVotedChoice2) {
        // User already voted, remove their previous vote
        if (userVotedChoice1) {
          votes.get("choice1").voters.delete(userId);
          votes.get("choice1").count--;
        }
        if (userVotedChoice2) {
          votes.get("choice2").voters.delete(userId);
          votes.get("choice2").count--;
        }
      }

      // Add new vote
      votes.get(voteChoice).voters.add(userId);
      votes.get(voteChoice).count++;

      // Update the message
      await buttonInteraction.update({
        embeds: [createEmbed()],
        components: [row],
      });
    });

    collector.on("end", async () => {
      // Disable buttons when collector ends
      const disabledRow = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setCustomId("vote_choice1")
          .setLabel(choice1)
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true),
        new ButtonBuilder()
          .setCustomId("vote_choice2")
          .setLabel(choice2)
          .setStyle(ButtonStyle.Secondary)
          .setDisabled(true)
      );

      await interaction.editReply({
        embeds: [createEmbed()],
        components: [disabledRow],
      });
    });
  },
};
