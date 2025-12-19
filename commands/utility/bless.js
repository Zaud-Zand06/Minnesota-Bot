const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const myId = "267094035506659338";
const wordList = [
  "Golden soul",
  "Sunbeam",
  "Radiant spirit",
  "Noble heart",
  "Virtue-born",
  "Star-child",
  "Light-bringer",
  "Purebred",
  "Gallant",
  "Paragon",
  "Gem",
  "Treasure",
  "Jewel",
  "Champion",
  "Hero",
  "Luminary",
  "Beacon",
  "Guiding star",
  "Virtuoso",
  "Prodigy",
  "Ace",
  "Maestro",
  "Sage",
  "Oracle",
  "Wunderkind",
  "Marvel",
  "Wonder",
  "Angel",
  "Saint",
  "Guardian",
  "Protector",
  "Defender",
  "Rock",
  "Steadfast",
  "True friend",
  "Ally",
  "Confidant",
  "Muse",
  "Inspiration",
  "Spark",
  "Firebrand",
  "Trailblazer",
  "Pathfinder",
  "Visionary",
  "Dreamweaver",
  "Peacemaker",
  "Harmony-bringer",
  "Joy-spreader",
  "Hope-giver",
  "Heart-warmer",
  "Kindred spirit",
  "Gentle soul",
  "Sweetheart",
  "Darling",
  "Beloved",
  "Cherub",
  "Sunshine",
  "Starlight",
  "Moonbeam",
  "Diamond",
  "Pearl",
  "Rose",
  "Lily",
  "Songbird",
  "Dove",
  "Phoenix",
  "Lionheart",
  "Braveheart",
  "Valiant",
  "Gallant",
  "Dazzler",
  "Showstopper",
  "Legend",
  "Icon",
  "Mastermind",
  "Whiz",
  "Ace of hearts",
  "Miracle-worker",
  "Champion of good",
  "Virtue incarnate",
  "Light in the dark",
  "Shining example",
  "Model citizen",
  "Uplifter",
  "Cheerleader",
  "Supporter",
  "Backbone",
  "Pillar",
  "Anchor",
  "Steady hand",
  "Bright spark",
  "Good egg",
  "Top-notch",
  "First-rate",
  "Class act",
  "Diamond in the rough",
  "Rare find",
  "One of a kind",
  "True original",
    "Real deal",
    "Real Gamer",
    

];
const wordListGood = [
  "Real Gamer",
  "Teto Head",
  "Lover",
  "God-King",
  "Can Bench 420 Pounds",
  "Runs a 4 minute Mile",
  "Goated",
  "Real Miku Lover",
  "Untouchable",
  "8 inches and thick",
  "Loyal",
  "My daughter killed herself 6 weeks ago",
];

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bless")
    .setDescription("bless this person.....NOW")
    .addUserOption((option) =>
      option.setName("who").setDescription("whos it gonna be").setRequired(true)
    ),

  async execute(interaction) {
    const target = interaction.options.getMember("who").id;
    if (target == myId) {
      let compliments = [];
      for (let i = 0; i < 5; i++) {
        const complimentsIndex = Math.floor(
          Math.random() * wordListGood.length
        );
        compliments.push(`<@${target}> ${wordListGood[complimentsIndex]}`);
      }
        await interaction.reply({ content: "Thanks :)", ephemeral: true });
      for (let compliment of compliments) {
        await interaction.channel.send(compliment);
        await wait(250);
      }
    } else {
      let insults = [];
      for (let i = 0; i < 10; i++) {
        const insultIndex = Math.floor(Math.random() * wordList.length);
        insults.push(`<@${target}> ${wordList[insultIndex]}`);
      }
      await interaction.reply({
        content: "Bless their ass....",
        ephemeral: true,
      });
      for (let insult of insults) {
        await interaction.channel.send(insult);
      }
    }
  },
};
