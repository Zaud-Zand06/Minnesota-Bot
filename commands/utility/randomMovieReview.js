const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const Parser = require("rss-parser");
const parser = new Parser();
const RSS_FEED_URL = "https://letterboxd.com/colevelders/rss/";

const postedEntries = new Set();

function extractImageUrl(content) {
  // The image is typically in an <img> tag in the content
  const imgRegex = /<img[^>]+src="([^">]+)"/;
  const match = content.match(imgRegex);
  return match ? match[1] : null;
}

// Helper function to extract rating from entry
function extractRating(entry) {
  // Ratings often appear in the title or content
  // Example title: "username watched The Matrix ★★★★½"
  if (entry.title) {
    const ratingMatch = entry.title.match(/([★½]+)$/);
    if (ratingMatch) {
      return `Rating: ${ratingMatch[1]}`;
    }
  }
  return null;
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("review-random-movie")
    .setDescription(`ask minnesota bot to review a random movie!`),

  async execute(interaction) {
    const recentMovies = [];
    const minnesotaBotOpinions = [
      "ABSOLUTELY KINO",
      "I liked this one :)",
      "It's okay :|",
      "Not my fave :(",
      "AAAAASSSSSSS",
    ];
    const feed = await parser.parseURL(RSS_FEED_URL);
    const validEntries = feed.items.filter((entry) => {
      // Only allow entries not posted yet and with valid title/description
      const entryId = entry.link;
      const desc = entry.contentSnippet || "";
      return (
        !postedEntries.has(entryId) &&
        !desc.startsWith("Watched on") &&
        entry.title &&
        desc
      );
    });

    if (validEntries.length === 0) {
      await interaction.reply("No new movie reviews available right now!");
      return;
    }

    const entry = validEntries[Math.floor(Math.random() * validEntries.length)];
    postedEntries.add(entry.link);

    const embed = new EmbedBuilder()
      .setTitle(entry.title)
      .setURL(entry.link)
      .setDescription(entry.contentSnippet)
      .setTimestamp(new Date(entry.pubDate));

    if (entry.content) {
      const imageUrl = extractImageUrl(entry.content);
      if (imageUrl) {
        embed.setThumbnail(imageUrl);
      }
    }
    const rating = extractRating(entry.title);
    if (rating) {
      embed.setDescription(`Rating: ${rating}/5`);
    }

    const botOpinion =
      minnesotaBotOpinions[
        Math.floor(Math.random() * minnesotaBotOpinions.length)
      ];
    await interaction.reply({
      content: botOpinion,
      flags: MessageFlags.Ephemeral,
    });
    await interaction.channel.send({ embeds: [embed] });
  },
};
