const { SlashCommandBuilder } = require("discord.js");
require("dotenv").config();

const myId = "267094035506659338";
const wordList = [
  "Illegitimate",
  "Love child",
  "Natural child",
  "Born out of wedlock",
  "Whoreson",
  "Base-born",
  "Misbegotten",
  "Spurious",
  "Bastard-born",
  "By-blow",
  "Scoundrel",
  "Villain",
  "Rogue",
  "Knave",
  "Wretch",
  "Cad",
  "Blackguard",
  "Reprobate",
  "Miscreant",
  "Snake",
  "Rat",
  "Weasel",
  "Swine",
  "Dog",
  "Cur",
  "Jackal",
  "Varmint",
  "Lowlife",
  "Scumbag",
  "Son of a bitch",
  "Motherf***er",
  "Prick",
  "Asshole",
  "Jerk",
  "Dick",
  "Douchebag",
  "Tool",
  "Scumbucket",
  "Sleazeball",
  "Worm",
  "Maggot",
  "Maggot",
  "Varlet",
  "Caitiff",
  "Rascal",
  "Rapscallion",
  "Dastard",
  "Poltroon",
  "Lout",
  "Churl",
  "Bounder",
  "Blaggard",
  "Git",
  "Tosser",
  "Wanker",
  "Pillock",
  "Sod",
  "Berk",
  "Dill",
  "Drongo",
  "Muppet",
  "Numpty",
  "Schmuck",
  "Putz",
  "Schlemiel",
  "Goon",
  "Twit",
  "Nitwit",
  "Nincompoop",
  "Rascal",
  "Scamp",
  "Rogue",
  "Troublemaker",
  "Brat",
  "Imp",
  "Hellion",
  "Foul beat",
  "Wretched cur",
  "Vile creature",
  "Sniveling coward",
  "Backstabber",
  "Treacherous swine",
  "fake gamer",
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

module.exports = {
  data: new SlashCommandBuilder()
    .setName("flame")
    .setDescription("harrass this person....NOW")
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
      await interaction.reply({ content: "Nice try ;)", ephemeral: true });
      for (let compliment of compliments) {
        await interaction.channel.send(compliment);
      }
    } else {
      let insults = [];
      for (let i = 0; i < 10; i++) {
        const insultIndex = Math.floor(Math.random() * wordList.length);
        insults.push(`<@${target}> ${wordList[insultIndex]}`);
      }
      await interaction.reply({
        content: "Get their ass....",
        ephemeral: true,
      });
      for (let insult of insults) {
        await interaction.channel.send(insult);
      }
    }
  },
};
