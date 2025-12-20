require("dotenv").config(); //initializes dotenvimport
const fs = require("fs");
const path = require("path");
const {
  Client,
  GatewayIntentBits,
  AttachmentBuilder,
  Collection,
  Events,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildVoiceStates,
    // Add other intents as needed
  ],
  partials: ["MESSAGE", "CHANNEL", "REACTION"],
  messageCacheMaxSize: 100,
});

client.bulliedUsers = new Set();

client.commands = new Collection();
const foldersPath = path.join(__dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);
for (const folder of commandFolders) {
  const commandsPath = path.join(foldersPath, folder);
  const commandFiles = fs
    .readdirSync(commandsPath)
    .filter((file) => file.endsWith(".js"));
  for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ("data" in command && "execute" in command) {
      client.commands.set(command.data.name, command);
    } else {
      console.log(
        `[WARNING] The command at ${filePath} is missing "data" or "execute" property`,
      );
    }
  }
}
const botId = "1220688585708142623";

client.on("clientReady", () => {
  console.log(
    `Logged in as ${client.user.tag}! Started: ${new Date().toLocaleString()}`,
  );
});
const ummCat = "./umm.jpg";
const minnesota = "./minnesota.png";
const garlik = "./garlik.png";
const norman = "./norman.png";
const crampette = "./crampette.png";
const minnesotaRegex = /minnesota/i;
const minnesotaFacts = [
  `The name "Minnesota" comes from Dakota Indigenous words meaning "sky-tinted waters" or "sky-blue waters."`,
  "Minnesota has 11,842 lakes!",
  "The Minnesota state bird is the Common Loon.",
  "The state fish is the Walleye",
  `We all know Prince and Bob Dylan, but Minnesota is home to Judy Garland, Robert Bly, and George "Pinky" Nelson!`,
  "Minnesota is known for its tourism, and it's agriculture industries!",
];
const helldiversMentioned = "./helldivers-mentioned.png";
const hellDiverRegex = /hell\s?divers?/i;
const titanfallMentioned = "./tf2 mentioned.webp";
const titanfallRegex = /titan\s?fall/i;
const canadaMentioend = "./canadamentioned.webp";
const canadaRegex = /(alberta|canada|vancouver)/i;
const jermaRegex = /jermas?/i;
const dontKys = "./noDontKys.jpg";
const kmsRegex =
  /\bkms|\bkill myself|\bend me|\b(?:i|i'm|im|i'll|ill)\b.*\bdo it\b[.!?]?$/i;

client.on("messageCreate", (msg) => {
  const dylanId = "226529102352482324";
  if (msg.author.bot) {
    return;
  }
  const meanMessage = `"ehrrrmmmmm actually... ${msg.content} 🤓🤓🤓"`;
  if (client.bulliedUsers.has(msg.author.id)) {
    const bullyMessageType = Math.floor(Math.random() * 2);
    if (bullyMessageType === 0) {
      const replies = [
        "your mom",
        "lol ok boomer",
        "says the nerd",
        "nah",
        "🤓 <---- this is you btw",
        "mad cus bad or something",
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];
      msg.reply({ content: randomReply });
    } else {
      msg.reply({ files: [ummCat], content: meanMessage });
    }
  }
  if (minnesotaRegex.test(msg.content)) {
    const fact =
      minnesotaFacts[Math.floor(Math.random() * minnesotaFacts.length)];
    const imageChange = Math.floor(Math.random() * 51);
    if (imageChange === 50) {
      msg.reply({ files: [norman], content: `"WOOOOO NORMAN" --Meg` });
    } else if (imageChange <= 49 && imageChange > 40) {
      msg.reply({ files: [crampette], content: `"CRAMPETTE TIME" --Meg` });
    } else if (imageChange <= 40 && imageChange > 30) {
      msg.reply({
        files: [garlik],
        content: `"I fucking hate that stupid mutt" --Meg`,
      });
    } else {
      msg.reply({ files: [minnesota], content: fact });
    }
  } else if (msg.author.id === dylanId && kmsRegex.test(msg.content)) {
    msg.reply({ files: [dontKys] });
  } else if (hellDiverRegex.test(msg.content)) {
    msg.reply({ files: [helldiversMentioned] });
  } else if (titanfallRegex.test(msg.content)) {
    msg.reply({ files: [titanfallMentioned] });
  } else if (canadaRegex.test(msg.content)) {
    msg.reply({ files: [canadaMentioend] });
  } else if (jermaRegex.test(msg.content)) {
    fs.readdir("./pics", (err, files) => {
      if (err) throw err;
      const file = files[Math.floor(Math.random() * files.length)];
      const attachment = new AttachmentBuilder(`./pics/${file}`);
      msg.reply({ files: [attachment] });
    });
  }
});

//event listener for slash commands
const userTimestamps = {};
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }
  // cooldown for dyl
  const now = Date.now();
  const lastTime = userTimestamps["699049145318768710"] || 0;
  if (interaction.user.id === "699049145318768710") {
    if (now - lastTime < 10000) {
      await interaction.reply({
        content: "fuck u dyl",
        ephemeral: true,
      });
      return;
    }
  }

  userTimestamps["699049145318768710"] = now;
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    console.log(
      "error occured on " +
        new Date().toLocaleString() +
        "on this interaction:",
    );
    console.log(interaction);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "there was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
});

//this line must be at the very end
client.login(process.env.CLIENT_TOKEN); //signs the bot in with token
