const { SlashCommandBuilder } = require("discord.js");

const myId = "267094035506659338";
const botId = "1220688585708142623";

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
    const executingUserId = interaction.user.id;
    const bulliedUsers = interaction.client.bulliedUsers;

    if (bulliedUsers.has(executingUserId) && targetId === executingUserId) {
      return interaction.reply({
        content: `ask someone nicely :)`,
        ephemeral: true,
      });
    } else if (bulliedUsers.has(targetId)) {
      bulliedUsers.delete(targetId);
      await interaction.reply({
        content: `ok, I'll stop bullying <@${targetId}>.`,
        ephemeral: true,
      });
    } else if (targetId === botId) {
      await interaction.reply({
        content: "noooooooooo",
        ephemeral: true,
      });
    } else {
      bulliedUsers.add(targetId);
      await interaction.reply({
        content: `fuck this guy: <@${targetId}>. They will now be bullied.`,
        ephemeral: true,
      });
    }
  },
};
