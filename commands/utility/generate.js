const { SlashCommandBuilder, AttachmentBuilder } = require("discord.js");
const fetch = require("node-fetch");
const apiToken = process.env.CLOUDFLARE_API_TOKEN;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("generate")
    .setDescription("Generate an image")
    .addStringOption((option) =>
      option
        .setName("prompt")
        .setDescription("Describe the image you want to generate")
        .setRequired(true)
    ),

  async execute(interaction) {
    const prompt = interaction.options.getString("prompt");
    await interaction.deferReply();

    try {
      const endpoint =
        "https://api.cloudflare.com/client/v4/accounts/4b7da86433b96703c15b3d96508d96bc/ai/run/@cf/stabilityai/stable-diffusion-xl-base-1.0";

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        return await interaction.editReply(
          `Error from Cloudflare AI: ${errorText}`
        );
      }

      const imageBuffer = await response.buffer();

      const attachment = new AttachmentBuilder(imageBuffer, {
        name: "generated.png",
      });

      await interaction.editReply({
        content: `Prompt: ${prompt}`,
        files: [attachment],
      });
    } catch (error) {
      await interaction.editReply(`Failed to generate image: ${error.message}`);
    }
  },
};
