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
const { kill } = require("process");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    // Add other intents as needed
  ],
  partials: ["MESSGE", "CHANNEL", "REACTION"],
  messageCacheMaxSize: 100,
});
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
        `[WARNING] The command at ${filePath} is missing "data" or "execute" property`
      );
    }
  }
}

const killCount = (function () {
  let megKillCount = undefined;
  if (fs.existsSync("killCount.json")) {
    megKillCount = Number(
      JSON.parse(fs.readFileSync("killCount.json", "utf-8"))
    );
  } else {
    megKillCount = 0;
  }

  function addKill(number) {
    megKillCount += number;
    fs.writeFileSync("killCount.json", JSON.stringify(megKillCount), "utf-8");
  }

  function killTally() {
    return megKillCount;
  }

  function clearTally() {
    megKillCount = 0;
    fs.writeFileSync("killCount.json", JSON.stringify(megKillCount), "utf-8");
  }

  return { addKill, killTally, clearTally };
})();

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

const minnesotaFacts = [
  `The name "Minnesota" comes from Dakota Indigenous words meaning "sky-tinted waters" or "sky-blue waters."`,
  "Minnesota has 11,842 lakes!",
  "The Minnesota state bird is the Common Loon.",
  "The state fish is the Walleye",
  `We all know Prince and Bob Dylan, but Minnesota is home to Judy Garland, Robert Bly, and George "Pinky" Nelson!`,
  "Minnesota is known for its tourism, and it's agriculture industries!",
];
const fact = minnesotaFacts[Math.floor(Math.random() * minnesotaFacts.length)];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (msg) => {
  if (minnesotaRegex.test(msg.content)) {
    msg.reply({ files: [minnesota] });
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
  if (jermaRegex.test(msg.content)) {
    fs.readdir("./pics", (err, files) => {
      if (err) throw err;
      const file = files[Math.floor(Math.random() * files.length)];
      const attachment = new AttachmentBuilder(`./pics/${file}`);
      msg.reply({ files: [attachment] });
    });
  }
});

//event listener for chat messages, responds with meme if possible
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

//event listner for the modal sumbit
client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isModalSubmit()) return;

  const deathNumber = Number(
    interaction.fields.fields.get("deathNumber").value
  );
  const deathDescription = interaction.fields.fields.get(
    "deathDescription".value
  );
  console.log(deathNumber);
  console.log(typeof deathNumber);
  console.log(killCount.killTally());
  killCount.addKill(deathNumber);
  console.log(killCount.killTally());

  await interaction.reply({
    content: `her hunger grows deeper.....`,
    ephemeral: true,
  });
});

//this line must be at the very end
client.login(process.env.CLIENT_TOKEN); //signs the bot in with token
