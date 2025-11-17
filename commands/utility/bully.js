const { SlashCommandBuilder } = require("discord.js");

// You can keep your ID check if you want
const myId = "267094035506659338";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bully")
    .setDescription("Toggles bullying for a user.")
    .addUserOption((option) =>
      option
        .setName("who")
        .setDescription("The user to target.")
        .setRequired(true),
    ),

  async execute(interaction) {
    const target = interaction.options.getMember("who");
    const targetId = target.id;

    if (targetId === myId) {
      return interaction.reply({
        content: "THIS GUY 🫵 THINKS HE CAN BULLY THE GOAT 🤣🤣🤣",
        flags: MessageFlags.Ephemeral,
      });
    }

    // Access the set from the client object
    const bulliedUsers = interaction.client.bulliedUsers;

    if (bulliedUsers.has(targetId)) {
      bulliedUsers.delete(targetId);
      await interaction.reply({
        content: `Ok, I'll stop bullying <@${targetId}>.`,
        flags: MessageFlags.Ephemeral,
      });
    } else {
      bulliedUsers.add(targetId);
      await interaction.reply({
        content: `fuck this guy: <@${targetId}>. They will now be bullied.`,
        flags: MessageFlags.Ephemeral,
      });
    }
  },
};
