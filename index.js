require("dotenv").config(); //initializes dotenvimport
const fs = require("fs");
const path = require("path");
const { joinVoiceChannel } = require("@discordjs/voice");
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
  partials: ["MESSGE", "CHANNEL", "REACTION"],
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

//response images and the regex for them
const minnesota = "./minnesota.png";
const minnesotaRegex = /minnesota/i;
const titanfallMentioned = "./tf2 mentioned.webp";
const titanfallRegex = /titan\s?fall/i;
const helldiversMentioned = "./helldivers-mentioned.png";
const hellDiverRegex = /hell\s?divers?/i;
const canadaMentioend = "./canadamentioned.webp";
const canadaRegex = /(alberta|canada|vancouver)/i;
const jermaRegex = /jermas?/i;
const loca = "./bella.gif";
const twilightRegex = /twilight|bella|loca/i;
const gorpersRegex = /any gorpers tonight/i;

const minnesotaFacts = [
  `The name "Minnesota" comes from Dakota Indigenous words meaning "sky-tinted waters" or "sky-blue waters."`,
  "Minnesota has 11,842 lakes!",
  "The Minnesota state bird is the Common Loon.",
  "The state fish is the Walleye",
  `We all know Prince and Bob Dylan, but Minnesota is home to Judy Garland, Robert Bly, and George "Pinky" Nelson!`,
  "Minnesota is known for its tourism, and it's agriculture industries!",
];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  // Ignore messages from any bot
  if (msg.author.bot) return;
  // Check if the message author is in our bulliedUsers set
  if (client.bulliedUsers.has(msg.author.id)) {
    // Reply to the user and stop further processing for this message
    return msg.reply("lol ok boomer");
  }
});

client.on("messageCreate", (msg) => {
  const fact =
    minnesotaFacts[Math.floor(Math.random() * minnesotaFacts.length)];
  if (
    minnesotaRegex.test(msg.content) &&
    msg.author.id !== "1220688585708142623"
  ) {
    msg.reply({ files: [minnesota], content: fact });
  }
});
client.on("messageCreate", (msg) => {
  if (gorpersRegex.test(msg.content)) {
    msg.reply({ content: `i'll be gorping tonight ;)` });
  }
});

client.on("messageCreate", (msg) => {
  if (hellDiverRegex.test(msg.content)) {
    msg.reply({ files: [helldiversMentioned] });
  }
});

client.on("messageCreate", (msg) => {
  if (titanfallRegex.test(msg.content)) {
    msg.reply({ files: [titanfallMentioned] });
  }
});

client.on("messageCreate", (msg) => {
  if (canadaRegex.test(msg.content)) {
    msg.reply({ files: [canadaMentioend] });
  }
});

client.on("messageCreate", (msg) => {
  if (twilightRegex.test(msg.content)) {
    msg.reply({ files: [loca] });
  }
});

client.on("messageCreate", (msg) => {
  if (jermaRegex.test(msg.content)) {
    fs.readdir("./pics", (err, files) => {
      if (err) throw err;
      const file = files[Math.floor(Math.random() * files.length)];
      const attachment = new AttachmentBuilder(`./pics/${file}`);
      msg.reply({ files: [attachment] });
    });
  }
});

//event listener for slash commands
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
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
