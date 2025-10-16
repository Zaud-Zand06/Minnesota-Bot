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
    // Get the Member object and their ID
    const target = interaction.options.getMember("who");
    const targetId = target.id;

    // Your personal check
    if (targetId === myId) {
      return interaction.reply({
        content: "THIS GUY 🫵 THINKS HE CAN BULLY THE GOAT 🤣🤣🤣",
        ephemeral: false,
      });
    }

    // Access the set from the client object
    const bulliedUsers = interaction.client.bulliedUsers;

    // Toggle logic
    if (bulliedUsers.has(targetId)) {
      // If user is already in the set, remove them
      bulliedUsers.delete(targetId);
      await interaction.reply({
        content: `Ok, I'll stop bullying <@${targetId}>.`,
        ephemeral: true,
      });
    } else {
      // If user is not in the set, add them
      bulliedUsers.add(targetId);
      await interaction.reply({
        content: `fuck this guy: <@${targetId}>. They will now be bullied.`,
        ephemeral: true,
      });
    }
  },
};
